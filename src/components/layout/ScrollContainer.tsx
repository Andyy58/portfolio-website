import Hero from "../sections/Hero";
import Experience from "../sections/Experience";
import ProjectsDeck from "../sections/Projects";
import About from "../sections/About";
import Footer from "../sections/Footer";

export default function ScrollContainer() {
  return (
    <div className="z-10 w-full flex flex-col">
      <Hero />
      <Experience />
      <ProjectsDeck />
      <About />
      <Footer />
    </div>
  );
}
