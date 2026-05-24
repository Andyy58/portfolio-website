export interface Experience {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  logo: string;
  logo_props?: string;
  bullets?: string[] | null;
}

export const experiences: Experience[] = [
  {
    id: "exp-bitgo",
    role: "Software Engineer",
    company: "BitGo",
    startDate: "May 2026",
    endDate: "Present",
    logo: "/bitgo-logo.webp",
    logo_props: "p-2",
  },
  {
    id: "exp-tencent",
    role: "Backend Engineer",
    company: "Tencent - WeChat Search",
    startDate: "April 2025",
    endDate: "December 2025",
    logo: "/tencent-logo-0.webp",
  },
  {
    id: "exp-guowang",
    role: "Software Engineer",
    company: "SGCC China",
    startDate: "Janurary 2025",
    endDate: "April 2025",
    logo: "/sgcc-logo.webp",
  },
  {
    id: "exp-chaseauto",
    role: "Full-Stack Engineer",
    company: "Chase Auto",
    startDate: "May 2024",
    endDate: "September 2024",
    logo: "/chase-auto-logo.webp",
  },
];
