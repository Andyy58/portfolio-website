import { useNavbar } from "./NavbarContext";
import ResumeIcon from "../../assets/resume.svg?react";

export function Navbar() {
  const { isNavVisible } = useNavbar();

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-500 ease-in-out 
        ${isNavVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
        bg-bg-primary/20 backdrop-blur-md border-b border-text-muted/10
      `}
    >
      <div className="flex justify-between items-center max-w-6xl mx-auto px-6 py-4">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-lg md:text-2xl font-bold tracking-tight text-text-primary hover:text-accent-blue transition-colors duration-300 focus:outline-none cursor-pointer"
        >
          Andy Yang
        </button>
        <div className="flex gap-4 items-center">
          <span className="text-xs md:text-sm font-medium text-text-muted bg-text-muted/10 px-4 py-1.5 rounded-full border border-text-muted/10 shadow-inner hidden sm:block">
            Computer Science @ UWaterloo
          </span>
          <div className="w-[108px] flex justify-start">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center text-sm font-medium px-4 py-1.5 rounded-full bg-bg-secondary text-text-primary hover:text-accent-blue border border-text-muted/10 transition-all duration-500 ease-out shadow-sm hover:shadow-md focus:outline-none"
              aria-label="View Resume"
            >
              <ResumeIcon className="w-3 h-3 shrink-0 transition-transform duration-300 group-hover:scale-110" />
              <span className="flex overflow-hidden transition-all duration-500 group-hover:ml-2">
                {"Resume".split("").map((letter, index) => (
                  <span
                    key={index}
                    className="inline-block max-w-0 opacity-0 group-hover:max-w-[20px] group-hover:opacity-100 transition-all duration-300 ease-in-out overflow-hidden"
                    style={{ transitionDelay: `${index * 20}ms` }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
