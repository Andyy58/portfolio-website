export interface Experience {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  bullets?: string[] | null;
}

export const experiences: Experience[] = [
  {
    id: "exp-tencent",
    role: "Backend Engineer",
    company: "Tencent - WeChat Search",
    startDate: "April 2025",
    endDate: "December 2025",
  },
  {
    id: "exp-guowang",
    role: "Software Engineer",
    company: "SGCC China",
    startDate: "Janurary 2025",
    endDate: "April 2025",
  },
  {
    id: "exp-chaseauto",
    role: "Full-Stack Engineer",
    company: "Chase Auto",
    startDate: "May 2024",
    endDate: "September 2024",
  },
];
