import { useEffect, useRef } from "react";
import "./ui-cursor-experiment.css";

export default function ElasticText({ children }: { children: string }) {
  const rootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const enabled = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const letters = Array.from(root.querySelectorAll<HTMLElement>(".elastic-letter"));
    const states = letters.map((letter) => ({
      glyph: letter.firstElementChild as HTMLElement,
      x: 0, y: 0, vx: 0, vy: 0,
    }));
    let anchors: { x: number; y: number }[] = [];
    let radius = 70;
    let strength = 12;
    let frame = 0;
    let lastTime = 0;
    let pointer: { x: number; y: number } | null = null;

    const measure = () => {
      const fontSize = parseFloat(getComputedStyle(root).fontSize);
      radius = Math.max(42, Math.min(100, fontSize * 1.4));
      strength = Math.max(7, Math.min(18, fontSize * 0.22));
      // The outer letter boxes never move: proximity always uses the original spot.
      anchors = letters.map((letter) => {
        const rect = letter.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      });
    };

    const animate = (time: number) => {
      const elapsed = lastTime ? Math.min(time - lastTime, 32) : 16.67;
      lastTime = time;
      const step = elapsed / 16.67;
      let moving = false;
      states.forEach((state, index) => {
        const anchor = anchors[index];
        const dx = pointer ? anchor.x - pointer.x : 0;
        const dy = pointer ? anchor.y - pointer.y : 0;
        const distance = Math.hypot(dx, dy);
        const proximity = pointer ? Math.max(0, 1 - distance / radius) : 0;
        // Smooth falloff at the boundary, with a gentle spring on arrival and return.
        const force = proximity * proximity * (3 - 2 * proximity) * strength;
        const targetX = distance > 0.01 ? dx / distance * force : 0;
        const targetY = distance > 0.01 ? dy / distance * force : -force;
        state.vx = (state.vx + (targetX - state.x) * 0.055 * step) * Math.pow(0.82, step);
        state.vy = (state.vy + (targetY - state.y) * 0.055 * step) * Math.pow(0.82, step);
        state.x += state.vx * step;
        state.y += state.vy * step;
        const unsettled = Math.abs(targetX - state.x) + Math.abs(targetY - state.y)
          + Math.abs(state.vx) + Math.abs(state.vy) > 0.015;
        if (!unsettled && !force) {
          state.x = state.y = state.vx = state.vy = 0;
          state.glyph.style.transform = "";
        } else {
          state.glyph.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) rotate(${state.x * 0.22}deg)`;
        }
        moving = unsettled || moving;
      });
      if (moving) frame = requestAnimationFrame(animate);
      else { frame = 0; lastTime = 0; }
    };
    const wake = () => {
      if (!frame && !document.hidden) frame = requestAnimationFrame(animate);
    };
    const move = (event: PointerEvent) => {
      if (!enabled.matches || event.pointerType !== "mouse") return;
      pointer = { x: event.clientX, y: event.clientY };
      // Card tilt and deck navigation can move a heading without resizing it.
      const rect = root.getBoundingClientRect();
      const nearby = pointer.x > rect.left - radius && pointer.x < rect.right + radius
        && pointer.y > rect.top - radius && pointer.y < rect.bottom + radius;
      if (nearby) measure();
      else pointer = null;
      wake();
    };
    const leave = () => { pointer = null; wake(); };
    const layoutChange = () => { measure(); leave(); };
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      pointer = null;
      states.forEach((state) => {
        state.x = state.y = state.vx = state.vy = 0;
        state.glyph.style.transform = "";
      });
    };
    const visibilityChange = () => { reset(); measure(); };
    measure();
    const observer = new ResizeObserver(layoutChange);
    observer.observe(root);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", layoutChange, { passive: true });
    window.addEventListener("resize", layoutChange);
    window.addEventListener("blur", leave);
    window.addEventListener("keydown", leave);
    document.documentElement.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", visibilityChange);
    enabled.addEventListener("change", reset);
    document.fonts.addEventListener("loadingdone", layoutChange);
    return () => {
      reset();
      observer.disconnect();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", layoutChange);
      window.removeEventListener("resize", layoutChange);
      window.removeEventListener("blur", leave);
      window.removeEventListener("keydown", leave);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", visibilityChange);
      enabled.removeEventListener("change", reset);
      document.fonts.removeEventListener("loadingdone", layoutChange);
    };
  }, [children]);

  return (
    <span ref={rootRef} className="elastic-text">
      <span className="sr-only">{children}</span>
      <span aria-hidden="true">
        {children.split(/(\s+)/).map((word, wordIndex) =>
          /\s/.test(word) ? word : (
            <span className="elastic-word" key={wordIndex}>
              {Array.from(word).map((letter, index) => (
                <span className="elastic-letter" key={index}>
                  <span className="elastic-glyph">{letter}</span>
                </span>
              ))}
            </span>
          ),
        )}
      </span>
    </span>
  );
}
