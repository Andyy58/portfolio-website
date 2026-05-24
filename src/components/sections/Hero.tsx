import { useEffect, useRef } from "react";
import { useNavbar } from "../layout/NavbarContext";

export default function Hero() {
  const headerRef = useRef<HTMLDivElement>(null);

  const { setIsNavVisible } = useNavbar();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNavVisible(!entry.isIntersecting);
      },
      { threshold: 0.5 },
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  });
  return (
    <section
      id="hero-section"
      className="flex flex-col justify-center min-h-screen w-full"
    >
      <div className="header text-center" ref={headerRef}>
        <h1 className="text-6xl md:text-7xl lg:text-8xl tracking-tight font-bold text-text-primary mb-4">
          Andy Yang
        </h1>
        <p className="text-sm md:text-md lg:text-lg text-text-muted tracking-wide">
          Computer Science @ UWaterloo
        </p>
      </div>
    </section>
  );
}
