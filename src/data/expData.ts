export interface Experience {
  id: string;
  role: string;
  company: string;
  timeframe: string; // Change to date/time later
  bullets?: string[] | null;
}

export const experiences: Experience[] = [
  {
    id: "exp-tencent",
    role: "Backend Engineer",
    company: "Tencent",
    timeframe: "2022-06-01",
  },
  {
    id: "exp-guowang",
    role: "Software Engineer",
    company: "State Grid Big Data Center",
    timeframe: "2022-06-01",
  },
  {
    id: "exp-chaseauto",
    role: "Full-Stack Engineer",
    company: "Chase Auto",
    timeframe: "2022-06-01",
  },
];
