export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string | null;
  imageUrl: string | null;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "proj-portfolio",
    title: "Portfolio website",
    tagline: "Personal portfolio website",
    description: "Personal portfolio website",
    techStack: ["React", "TypeScript", "GSAP", "TailwindCSS"],
    githubUrl: "https://github.com/Andyy58/portfolio-website",
    liveUrl: null,
    imageUrl: null,
    featured: true,
  },
  {
    id: "proj-fridgescanner",
    title: "Fridge scanner",
    tagline: "Fridge scanner",
    description: "Fridge scanner",
    techStack: ["React", "TypeScript", "YOLO"],
    githubUrl: "https://github.com/Andyy58/fridge-scanner",
    liveUrl: null,
    imageUrl: null,
    featured: false,
  },
  {
    id: "proj-signl",
    title: "SiGnL",
    tagline: "SiGnL",
    description: "SiGnL",
    techStack: ["React", "TypeScript", "OpenCV", "Python"],
    githubUrl: "https://github.com/Andyy58/SiGnL",
    liveUrl: null,
    imageUrl: null,
    featured: false,
  },
    {
    id: "proj-test",
    title: "test",
    tagline: "test",
    description: "test",
    techStack: ["test", "test", "test", "test"],
    githubUrl: "test",
    liveUrl: null,
    imageUrl: null,
    featured: false,
  },
];
