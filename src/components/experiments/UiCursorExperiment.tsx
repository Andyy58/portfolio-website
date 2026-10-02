import { useEffect } from "react";
import "./ui-cursor-experiment.css";

// Remove this component from Home to disable the card hover experiment.
const targets = [
  { selector: ".project-card > div, #about-card", kind: "card" },
];

export default function UiCursorExperiment() {
  useEffect(() => {
    const enabled = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const elements = targets.flatMap(({ selector, kind }) =>
      Array.from(document.querySelectorAll<HTMLElement>(selector)).map((element) => {
        element.classList.add("cursor-reactive");
        element.dataset.cursorKind = kind;
        return element;
      }),
    );
    let active: HTMLElement | null = null;
    let bounds: DOMRect | null = null;
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (active) {
        active.removeAttribute("data-cursor-engaged");
        ["--ui-x", "--ui-y", "--ui-rx", "--ui-ry"].forEach((name) =>
          active!.style.removeProperty(name),
        );
      }
      active = null;
      bounds = null;
    };

    const update = () => {
      frame = 0;
      if (!active || !bounds) return;
      const x = Math.max(-1, Math.min(1, (pointerX - bounds.left) / bounds.width * 2 - 1));
      const y = Math.max(-1, Math.min(1, (pointerY - bounds.top) / bounds.height * 2 - 1));
      active.style.setProperty("--ui-x", `${x}px`);
      active.style.setProperty("--ui-y", `${y - 2}px`);
      active.style.setProperty("--ui-rx", `${-y * 1.2}deg`);
      active.style.setProperty("--ui-ry", `${x * 1.2}deg`);
      active.style.setProperty("--ui-light-x", `${(x + 1) * 50}%`);
      active.style.setProperty("--ui-light-y", `${(y + 1) * 50}%`);
    };

    const move = (event: PointerEvent) => {
      if (!enabled.matches || event.pointerType !== "mouse") { reset(); return; }
      const target = event.target instanceof Element
        ? event.target.closest<HTMLElement>(".cursor-reactive") : null;
      if (target !== active) {
        reset();
        active = target;
        if (active) {
          bounds = active.getBoundingClientRect();
          active.dataset.cursorEngaged = "true";
        }
      }
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (active && !frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", reset, { passive: true });
    window.addEventListener("resize", reset);
    window.addEventListener("blur", reset);
    window.addEventListener("keydown", reset);
    document.documentElement.addEventListener("pointerleave", reset);
    enabled.addEventListener("change", reset);
    return () => {
      reset();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", reset);
      window.removeEventListener("resize", reset);
      window.removeEventListener("blur", reset);
      window.removeEventListener("keydown", reset);
      document.documentElement.removeEventListener("pointerleave", reset);
      enabled.removeEventListener("change", reset);
      elements.forEach((element) => {
        element.classList.remove("cursor-reactive");
        element.removeAttribute("data-cursor-kind");
        element.style.removeProperty("--ui-light-x");
        element.style.removeProperty("--ui-light-y");
      });
    };
  }, []);

  return null;
}
