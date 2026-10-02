import { useEffect, useRef, type ReactNode } from "react";

// The wrapper reserves the original layout position while its content springs away.
export default function ElasticItem({ children, className }: {
  children: ReactNode;
  className?: string;
}) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const anchor = anchorRef.current;
    const content = contentRef.current;
    if (!anchor || !content) return;
    const enabled = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const state = { x: 0, y: 0, vx: 0, vy: 0, targetX: 0, targetY: 0 };
    let frame = 0;
    let lastTime = 0;
    const animate = (time: number) => {
      const step = (lastTime ? Math.min(time - lastTime, 32) : 16.67) / 16.67;
      lastTime = time;
      state.vx = (state.vx + (state.targetX - state.x) * 0.055 * step) * Math.pow(0.82, step);
      state.vy = (state.vy + (state.targetY - state.y) * 0.055 * step) * Math.pow(0.82, step);
      state.x += state.vx * step;
      state.y += state.vy * step;
      const moving = Math.abs(state.targetX - state.x) + Math.abs(state.targetY - state.y)
        + Math.abs(state.vx) + Math.abs(state.vy) > 0.015;
      content.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) rotate(${state.x * 0.18}deg)`;
      if (moving) frame = requestAnimationFrame(animate);
      else {
        frame = 0;
        lastTime = 0;
        if (!state.targetX && !state.targetY) {
          state.x = state.y = state.vx = state.vy = 0;
          content.style.transform = "";
        }
      }
    };
    const wake = () => {
      if (!frame && !document.hidden) frame = requestAnimationFrame(animate);
    };
    const leave = () => { state.targetX = state.targetY = 0; wake(); };
    const move = (event: PointerEvent) => {
      if (!enabled.matches || event.pointerType !== "mouse") return;
      const rect = anchor.getBoundingClientRect();
      const dx = rect.left + rect.width / 2 - event.clientX;
      const dy = rect.top + rect.height / 2 - event.clientY;
      const distance = Math.hypot(dx, dy);
      const proximity = Math.max(0, 1 - distance / 110);
      const force = proximity * proximity * (3 - 2 * proximity) * 8;
      state.targetX = distance > 0.01 ? dx / distance * force : 0;
      state.targetY = distance > 0.01 ? dy / distance * force : -force;
      wake();
    };
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      Object.assign(state, { x: 0, y: 0, vx: 0, vy: 0, targetX: 0, targetY: 0 });
      content.style.transform = "";
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", leave, { passive: true });
    window.addEventListener("resize", leave);
    window.addEventListener("blur", leave);
    window.addEventListener("keydown", leave);
    document.documentElement.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", reset);
    enabled.addEventListener("change", reset);
    return () => {
      reset();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", leave);
      window.removeEventListener("resize", leave);
      window.removeEventListener("blur", leave);
      window.removeEventListener("keydown", leave);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", reset);
      enabled.removeEventListener("change", reset);
    };
  }, []);

  return <div ref={anchorRef} className={className}><div ref={contentRef}>{children}</div></div>;
}
