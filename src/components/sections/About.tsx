import React from "react";
import ResumeIcon from "../../assets/resume.svg?react";

// --- SUB-COMPONENTS ---
// A clean, technical button style for the social links
const SocialLink: React.FC<{
  href: string;
  label: string;
  icon: React.ReactNode;
}> = ({ href, label, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center sm:justify-start gap-2 px-5 py-3 rounded-lg border border-text-muted/20 bg-bg-primary/50 hover:border-accent-blue/50 hover:bg-accent-blue/5 transition-all group"
  >
    <span className="text-text-muted group-hover:text-accent-blue transition-colors w-5 h-5">
      {icon}
    </span>
    <span className="text-xs font-mono text-text-muted group-hover:text-text-primary uppercase tracking-widest transition-colors">
      {label}
    </span>
  </a>
);

// Basic SVG Icons for the links
const GithubIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
    />
  </svg>
);

// const MailIcon = () => (
//   <svg
//     width="20"
//     height="20"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     viewBox="0 0 24 24"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//     />
//   </svg>
// );

// --- MAIN SECTION ---
export default function About() {
  return (
    <section
      id="about-section"
      className="relative w-full py-12 flex flex-col justify-center items-center z-10"
    >
      <div className="w-full max-w-5xl mx-auto px-6 mb-12 flex justify-center md:justify-start">
        <h2 className="text-sm font-mono tracking-widest text-text-muted uppercase">
          03. / About me
        </h2>
      </div>

      {/* THE CORE CHASSIS 
        id="about-card" is the critical anchor for Phase 4. GSAP will read the width/height 
        of this exact element to calculate the perimeter for the floating artifacts.
      */}
      <div
        id="about-card"
        className="relative w-full max-w-5xl bg-bg-secondary/0 backdrop-blur-xs border border-text-muted/20 rounded-3xl p-8 md:p-12 lg:p-16 shadow-[0_2rem_4rem_-1rem_rgba(0,0,0,0.1)] flex flex-col md:flex-row gap-12 lg:gap-16"
      >
        {/* Left Column: Headshot */}
        <div className="w-full md:w-1/3 flex flex-col items-center md:items-start shrink-0">
          <div className="w-70 h-60 md:w-full md:aspect-square rounded-2xl overflow-hidden bg-text-muted/10 border border-text-muted/20 shrink-0 relative group">
            {/* Placeholder for your actual headshot. 
              Drop your image in public/assets/ and update the src. 
            */}
            <img
              src="/headshot.webp"
              alt="Andy Yang"
              className="w-full h-full object-cover transition-all duration-500"
              // The onError hides the broken image icon if you haven't added the file yet
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />

            {/* Fallback wireframe if image is missing */}
            <div className="absolute inset-0 flex flex-col items-center justify-center -z-10 text-text-muted/30 font-mono text-xs text-center p-4">
              [ VISUAL ASSET MISSING ] <br />{" "}
              <span className="mt-2 text-[10px]">Insert Headshot</span>
            </div>
          </div>
        </div>

        {/* Right Column: Bio & Links */}
        <div className="w-full md:w-2/3 flex flex-col justify-center">
          <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-text-primary mb-6 text-center md:text-left">
            Andy Yang.
          </h3>

          <div className="space-y-3.5 text-base md:text-lg text-text-muted leading-relaxed text-center md:text-left">
            <p>
              Hi, and welcome to my personal little corner of the internet! I'm
              a 4th-year Computer Science student at the University of Waterloo.
              I am broadly interested in all areas of development, with past
              experience in both frontend and backend, and currently focusing my
              exploration on AI and ML. I am also actively looking for Fall 2026
              internships and full-time New Grad roles starting in Summer 2027!
            </p>
            <p>
              When I'm away from my IDE, I spend my time gaming, listening to
              music, or playing the piano. I also love hitting the badminton
              court and going for late-night walks :D
            </p>
            <p>
              Have fun exploring my site! Just like me, this website is always
              growing, evolving, and forever under construction. What you see
              today might not be what you see next time, as new features are
              always in the works. If you'd like to chat, feel free to reach out
              and connect with me on LinkedIn!
            </p>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row flex-wrap gap-4 justify-center md:justify-start">
            <SocialLink
              href="https://github.com/Andyy58"
              label="GitHub"
              icon={<GithubIcon />}
            />
            <SocialLink
              href="https://www.linkedin.com/in/andyy58/"
              label="LinkedIn"
              icon={<LinkedInIcon />}
            />
            <SocialLink
              href="/resume.pdf"
              label="Resume"
              icon={<ResumeIcon className="w-5 h-5" />}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
