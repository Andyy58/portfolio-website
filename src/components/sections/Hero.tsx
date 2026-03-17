export default function Hero() {
  return (
    <section
      id="hero-section"
      className="flex flex-col justify-center min-h-screen w-full"
    >
      <div className="text-center">
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
