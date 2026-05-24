import { useState } from "react";
import { projects, type Project } from "../../data/projectsData";
import { techIcons } from "../../data/techIcons";

// --- 1. THE FANNED DECK MATH ---
const getCardProps = (
  index: number,
  activeIndex: number,
  totalCards: number,
) => {
  const diff = (index - activeIndex + totalCards) % totalCards;

  // Center (Active Card)
  if (diff === 0) {
    return {
      style: {
        transform: "translate(-50%, -50%) rotate(0deg) scale(1)",
        zIndex: 30,
      },
      className: "opacity-100 pointer-events-auto cursor-default",
      isHidden: false,
    };
  }

  // Left Card (Previous)
  if (diff === totalCards - 1) {
    return {
      style: {
        transform:
          "translate(calc(-50% - 105%), -50%) rotate(-4deg) scale(0.95)",
        zIndex: 10,
      },
      className:
        "opacity-60 hover:opacity-100 pointer-events-auto cursor-pointer",
      isHidden: false,
    };
  }

  // Right Card 1 (Next)
  if (diff === 1) {
    return {
      style: {
        transform:
          "translate(calc(-50% + 105%), -50%) rotate(4deg) scale(0.95)",
        zIndex: 20,
      },
      className:
        "opacity-60 hover:opacity-100 pointer-events-auto cursor-pointer",
      isHidden: false,
    };
  }

  // Right Card 2 (Stacking under Right 1)
  // Replaced 10px with 0.75rem for the slight vertical drop
  if (diff === 2) {
    return {
      style: {
        transform:
          "translate(calc(-50% + 115%), calc(-50% + 0.75rem)) rotate(6deg) scale(0.9)",
        zIndex: 10,
      },
      className: "opacity-40 pointer-events-none",
      isHidden: true,
    };
  }

  // Hidden/Buried Cards
  return {
    style: {
      transform:
        "translate(calc(-50% + 115%), calc(-50% + 0.75rem)) rotate(6deg) scale(0.9)",
      zIndex: 0,
    },
    className: "opacity-0 pointer-events-none",
    isHidden: true,
  };
};

// --- 2. THE MINIMALIST CARD UI ---
const ProjectCard = ({
  project,
  inlineStyle,
  className,
  onClick,
  isHidden,
}: {
  project: Project;
  inlineStyle: React.CSSProperties;
  className: string;
  onClick: () => void;
  isHidden: boolean;
}) => (
  <div
    id={project.id}
    className={`project-card absolute top-1/2 left-1/2 w-[18rem] sm:w-[20rem] h-96 sm:h-104 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${className}`}
    style={inlineStyle}
    onClick={onClick}
  >
    <div className="h-full flex flex-col p-6 sm:p-8 rounded-2xl bg-bg-secondary/60 backdrop-blur-xl border border-text-muted/10 shadow-[0_1rem_2rem_-0.5rem_rgba(0,0,0,0.1)]">
      {!isHidden && (
        <div className="flex flex-col h-full animate-in fade-in duration-500">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-text-primary">
              {project.title}
            </h3>
            <p className="text-sm text-text-muted mt-3 leading-[1.9]">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-auto">
            {project.techStack.map((tech) => {
              const Icon = techIcons[tech];

              return (
                <span
                  key={tech}
                  className="px-2 py-1 border border-text-muted/20 rounded-md text-xs font-mono text-text-muted flex gap-1.5 items-center"
                >
                  {tech}
                  {Icon && <Icon className="size-4" />}
                </span>
              );
            })}
          </div>

          <div className="items-center flex w-full justify-around gap-6 pt-3 mt-5 border-t border-dashed border-text-muted/10 font-mono text-sm">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                className="cursor-pointer flex items-center gap-1.5 text-text-muted hover:text-text-primary transition-colors duration-300 group relative"
              >
                {(() => {
                  const GitHubLight = techIcons["GitHubLight"];
                  const GitHubDark = techIcons["GitHubDark"];
                  return (
                    <span className="flex items-center">
                      {GitHubLight && (
                        <GitHubLight className="size-4 dark:hidden" />
                      )}
                      {GitHubDark && (
                        <GitHubDark className="size-4 hidden dark:block" />
                      )}
                    </span>
                  );
                })()}
                <span>GitHub</span>
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 opacity-50 group-hover:opacity-100">
                  ↗
                </span>
                {/* Animated underline */}
                <div className="absolute -bottom-1 left-0 w-0 h-px bg-text-primary transition-all duration-300 group-hover:w-full"></div>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                className="cursor-pointer flex items-center gap-1.5 text-text-muted hover:text-text-primary transition-colors duration-300 group relative"
              >
                <span>View Live</span>
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 opacity-50 group-hover:opacity-100">
                  ↗
                </span>
                {/* Animated underline */}
                <div className="absolute -bottom-1 left-0 w-0 h-px bg-text-primary transition-all duration-300 group-hover:w-full"></div>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  </div>
);

// --- 3. MAIN SECTION ---
export default function ProjectsDeck() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextCard = () => setActiveIndex((prev) => (prev + 1) % projects.length);
  const prevCard = () =>
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);

  return (
    <section
      id="projects-section"
      className="relative w-full min-h-screen py-32 flex flex-col items-center"
    >
      {/* Reverted Section Header with Navigation Controls */}
      <div className="w-full max-w-5xl mx-auto px-6 mb-16 md:mb-24 flex justify-between items-end z-10">
        <h2 className="text-sm font-mono tracking-widest text-text-muted uppercase">
          02. / Featured Projects
        </h2>

        <div className="flex gap-x-4">
          <button
            onClick={prevCard}
            className="px-2 text-text-muted hover:text-accent-blue transition-colors font-mono text-sm uppercase tracking-widest cursor-pointer"
          >
            &larr; Prev
          </button>
          <button
            onClick={nextCard}
            className="px-2 text-text-muted hover:text-accent-blue transition-colors font-mono text-sm uppercase tracking-widest cursor-pointer"
          >
            Next &rarr;
          </button>
        </div>
      </div>

      {/* The Deck Canvas */}
      <div className="relative w-full max-w-5xl h-112 sm:h-128">
        {projects.map((project, index) => {
          const props = getCardProps(index, activeIndex, projects.length);
          return (
            <ProjectCard
              key={project.id}
              project={project}
              inlineStyle={props.style}
              className={props.className}
              isHidden={props.isHidden}
              onClick={() => setActiveIndex(index)}
            />
          );
        })}
      </div>
      <a
        href="https://github.com/Andyy58"
        target="_blank"
        className="text-sm font-semibold text-text-muted hover:text-text-primary border-b border-transparent hover:border-text-primary transition-colors pb-1"
      >
        View More ↗
      </a>
    </section>
  );
}
