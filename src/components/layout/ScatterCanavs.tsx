import { useEffect, useRef } from "react";
import { type Artifact, artifacts } from "../../data/artifactsData";

// Different depths keep the geometry from moving like a single flat layer.
const shapeMotion = [
  { depth: 0.55 },
  { depth: 1.1 },
  { depth: 0.8 },
  { depth: 1.25 },
  { depth: 0.65 },
  { depth: 0.95 },
];

const WireframeShape = ({ shape }: Pick<Artifact, "shape">) => {
  // --- The Core Styling ---
  // w-12/h-12: Standard size for these background elements.
  // stroke-current / fill-transparent: Essential for the wireframe look.
  // text-accent-blue/40: Sets the stroke color to your electric blue, slightly faint.
  // drop-shadow-[0_0_12px_var(--color-accent-glow)]: Applies the spread glow effect we defined in CSS.

  const baseClasses =
    "w-12 h-12 md:w-16 md:h-16 stroke-current fill-transparent drop-shadow-[0_0_12px_var(--color-accent-glow)]";

  // We keep the strokeWidth consistent (1.5) for that precise, technical feel.
  switch (shape) {
    case "circle":
      return (
        <svg className={baseClasses} viewBox="0 0 100 100" strokeWidth="1.5">
          <circle cx="50" cy="50" r="48" />
        </svg>
      );
    case "square":
      return (
        <svg className={baseClasses} viewBox="0 0 100 100" strokeWidth="1.5">
          <rect x="2" y="2" width="96" height="96" rx="4" />
        </svg>
      );
    case "triangle":
      return (
        <svg className={baseClasses} viewBox="0 0 100 100" strokeWidth="1.5">
          <polygon points="50,5 95,95 5,95" strokeLinejoin="round" />
        </svg>
      );
    case "hexagon": 
      return (
        <svg className={baseClasses} viewBox="0 0 100 100" strokeWidth="1.5">
          <polygon
            points="50,5 95,28 95,72 50,95 5,72 5,28"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "diamond":
      return (
        <svg className={baseClasses} viewBox="0 0 100 100" strokeWidth="1.5">
          <polygon points="50,5 95,50 50,95 5,50" strokeLinejoin="round" />
        </svg>
      );
    case "cross":
      return (
        <svg className={baseClasses} viewBox="0 0 100 100" strokeWidth="1.5">
          <line x1="50" y1="15" x2="50" y2="85" strokeLinecap="round" />
          <line x1="15" y1="50" x2="85" y2="50" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
};

export default function ScatterCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const shapes = Array.from(
      canvas.querySelectorAll<HTMLElement>("[data-parallax-shape]"),
    );
    const dotsCanvas = dotsRef.current;
    const context = dotsCanvas?.getContext("2d");
    const cursor = cursorRef.current;
    if (!dotsCanvas || !context || !cursor) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const pointer = { x: 0, y: 0, active: false };
    const spring = () => ({ x: 0, y: 0, vx: 0, vy: 0 });
    const shapeSprings = shapes.map(spring);
    const scrollSpring = spring();
    let anchors: { x: number; y: number }[] = [];
    let dots: ({ baseX: number; baseY: number } & ReturnType<typeof spring>)[] = [];
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dotColor = "";
    let frame = 0;
    let previousTime = 0;
    let previousScroll = window.scrollY;
    let maxScroll = 1;

    const measure = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      maxScroll = Math.max(1, document.documentElement.scrollHeight - height);
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      dotsCanvas.width = Math.round(width * ratio);
      dotsCanvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      dotColor = getComputedStyle(document.documentElement).getPropertyValue("--dot-color");
      anchors = shapes.map((shape) => {
        const rect = shape.parentElement!.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      });
      dots = [];
      for (let x = (width / 2) % 36 - 36; x < width + 36; x += 36) {
        for (let y = (height / 2) % 36 - 36; y < height + 72; y += 36) {
          dots.push({ baseX: x, baseY: y, ...spring() });
        }
      }
    };

    // An underdamped spring lets each item overshoot home, then settle.
    const repel = (state: ReturnType<typeof spring>, x: number, y: number,
      strength: number, step: number) => {
      const dx = x - pointer.x;
      const dy = y - pointer.y;
      const distance = Math.hypot(dx, dy);
      const reach = 155;
      const force = pointer.active && !reducedMotion.matches
        ? Math.pow(Math.max(0, 1 - distance / reach), 2) * strength
        : 0;
      const targetX = distance > 0.01 ? dx / distance * force : force;
      const targetY = distance > 0.01 ? dy / distance * force : 0;
      state.vx = (state.vx + (targetX - state.x) * 0.085 * step) * Math.pow(0.8, step);
      state.vy = (state.vy + (targetY - state.y) * 0.085 * step) * Math.pow(0.8, step);
      state.x += state.vx * step;
      state.y += state.vy * step;
      return Math.abs(targetX - state.x) + Math.abs(targetY - state.y)
        + Math.abs(state.vx) + Math.abs(state.vy) > 0.04;
    };

    const animate = (time: number) => {
      const elapsed = previousTime ? Math.min(time - previousTime, 32) : 16.67;
      previousTime = time;
      const scroll = Math.max(0, Math.min(window.scrollY, maxScroll));
      const velocity = reducedMotion.matches ? 0
        : Math.max(-2.5, Math.min(2.5, (scroll - previousScroll) / elapsed));
      previousScroll = scroll;
      const step = elapsed / 16.67;
      // Scroll stretches the background temporarily; its resting anchors stay fixed.
      // A softer spring gives this motion a slower return than cursor repulsion.
      const vertical = -velocity * 2.4;
      scrollSpring.vy = (scrollSpring.vy + (vertical - scrollSpring.y) * 0.018 * step)
        * Math.pow(0.85, step);
      scrollSpring.y += scrollSpring.vy * step;
      const compact = width < 768 ? 0.55 : 1;
      let moving = Math.abs(scrollSpring.y) + Math.abs(scrollSpring.vy) > 0.02;

      shapes.forEach((shape, index) => {
        const { depth } = shapeMotion[index % shapeMotion.length];
        const anchor = anchors[index];
        const y = scrollSpring.y * depth * compact;
        const state = shapeSprings[index];
        // Keep cursor forces anchored to the resting position so scrolling
        // cannot change the horizontal repulsion from a stationary cursor.
        moving = repel(state, anchor.x, anchor.y, 45, step) || moving;
        shape.style.transform = `translate3d(${state.x}px, ${y + state.y}px, 0)`;
      });

      context.clearRect(0, 0, width, height);
      context.fillStyle = dotColor;
      context.beginPath();
      for (const dot of dots) {
        const x = dot.baseX;
        const y = dot.baseY + scrollSpring.y * 0.3 * compact;
        moving = repel(dot, x, dot.baseY, 25.5, step) || moving;
        context.moveTo(x + dot.x + 1, y + dot.y);
        context.arc(x + dot.x, y + dot.y, 1, 0, Math.PI * 2);
      }
      context.fill();
      if (moving) frame = requestAnimationFrame(animate);
      else { frame = 0; previousTime = 0; }
    };

    const wake = () => {
      if (!document.hidden && !frame) frame = requestAnimationFrame(animate);
    };
    const clearPointer = () => {
      pointer.active = false;
      cursor.style.opacity = "0";
      document.documentElement.classList.remove("circle-cursor-active");
      wake();
    };
    const pointerMove = (event: PointerEvent) => {
      if (!finePointer.matches || event.pointerType !== "mouse") return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
      cursor.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0)`;
      cursor.style.opacity = "1";
      cursor.classList.toggle("is-interactive", event.target instanceof Element
        && !!event.target.closest("a, button, input, textarea, select, [role='button']"));
      document.documentElement.classList.add("circle-cursor-active");
      wake();
    };
    const resize = () => { measure(); wake(); };
    const motionChange = () => {
      shapeSprings.forEach((state) => Object.assign(state, spring()));
      Object.assign(scrollSpring, spring());
      previousScroll = window.scrollY;
      measure();
      clearPointer();
    };
    const visibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
        previousTime = 0;
        previousScroll = window.scrollY;
        Object.assign(scrollSpring, spring());
        clearPointer();
      } else wake();
    };
    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
    measure();
    wake();
    const observer = new ResizeObserver(resize);
    observer.observe(document.documentElement);
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", pointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", clearPointer);
    window.addEventListener("blur", clearPointer);
    window.addEventListener("keydown", clearPointer);
    reducedMotion.addEventListener("change", motionChange);
    finePointer.addEventListener("change", motionChange);
    colorScheme.addEventListener("change", resize);
    document.addEventListener("visibilitychange", visibilityChange);

    return () => {
      clearPointer();
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", pointerMove);
      document.documentElement.removeEventListener("pointerleave", clearPointer);
      window.removeEventListener("blur", clearPointer);
      window.removeEventListener("keydown", clearPointer);
      reducedMotion.removeEventListener("change", motionChange);
      finePointer.removeEventListener("change", motionChange);
      colorScheme.removeEventListener("change", resize);
      document.removeEventListener("visibilitychange", visibilityChange);
    };
  }, []);

  return (
    /* Z-Index: -1 (Between the dot grid and the scroll content) 
       pointer-events-none: Critical so clicks/scrolls pass through to foreground content.
    */
    <>
    <div
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full z-[-1] pointer-events-none overflow-hidden bg-bg-primary"
    >
      <canvas ref={dotsRef} className="absolute inset-0 w-full h-full" />
      {artifacts.map((artifact) => {
        // 1. Render the static anchor shapes (Base Geometry)
        if (artifact.type === "base-shape") {
          return (
            <div
              key={artifact.id}
              id={artifact.id}
              className={`absolute ${artifact.initialPos} ${artifact.colorTheme}`}
            >
              <div data-parallax-shape>
                <WireframeShape shape={artifact.shape} />
              </div>
            </div>
          );
        }

        // 2. Prepare the hidden DOM nodes for the dynamic artifacts (Logos & Skills)
        // Hidden at opacity-0, waiting for GSAP to grab them later.
        return (
          <div
            key={artifact.id}
            id={artifact.id}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0"
          >
            {/* Render the specific visual asset if path exists */}
            {artifact.assetPath ? (
              <img
                src={artifact.assetPath}
                alt={`${artifact.id} visual`}
                className="w-12 h-12 md:w-16 md:h-16 object-contain"
              />
            ) : (
              /* A technical wireframe placeholder box for artifacts missing visual assets */
              <div className="w-12 h-12 md:w-16 md:h-16 border border-text-muted/50 bg-bg-secondary/20 rounded-md backdrop-blur-sm" />
            )}
          </div>
        );
      })}
    </div>
    <div ref={cursorRef} aria-hidden="true" className="circle-cursor"><span /></div>
    </>
  );
}
