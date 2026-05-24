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
    id: "asl-trans",
    title: "Real-Time ASL Translator",
    tagline: "Real-Time ASL Translator",
    description:
      "A real-time, continuous sign language translation system utilizing a MediaPipe-based skeletal extraction pipeline and PyTorch LSTMs for fast, offline inference, integrated with a local T5 Transformer for accurate ASL-to-English grammar correction.",
    techStack: ["Python", "Pytorch", "OpenCV", "MediaPipe"],
    githubUrl: "https://github.com/Andyy58/ASL-translator",
    liveUrl: null,
    imageUrl: null,
    featured: true,
  },
  {
    id: "proj-portfolio",
    title: "Portfolio website",
    tagline: "Personal portfolio website",
    description:
      "My personal corner of the web and digital sandbox, built to showcase my engineering projects and past work experience. Always evolving, and forever under construction.",
    techStack: ["React", "TypeScript", "TailwindCSS"],
    githubUrl: "https://github.com/Andyy58/portfolio-website",
    liveUrl: "#",
    imageUrl: null,
    featured: false,
  },
  {
    id: "proj-signl",
    title: "SiGnL",
    tagline: "SiGnL",
    description:
      "Static ASL Alphabet translation app built for Hack the North 2022 utilizing a fine-tuned YOLO object detection model and TensorFlow for real-time gesture classification, complete with integrated text-to-speech (TTS) accessibility.",
    techStack: ["Python", "TensorFlow", "OpenCV"],
    githubUrl: "https://github.com/Andyy58/SiGnL",
    liveUrl: null,
    imageUrl: null,
    featured: false,
  },
];
