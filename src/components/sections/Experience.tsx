import { experiences } from "../../data/expData";

const LogoPlaceholder = () => (
  <div className="w-10 h-10 rounded-lg bg-text-muted/20 shrink-0" />
);

export default function Experience() {
  const experienceCards = [...experiences].reverse().map((item, index) => {
    const isEven = index % 2 === 0;

    // Even cards sit on the left half; odd cards on the right half.
    // The logo is always on the outer edge (away from the timeline).
    // justify-end / justify-start keeps the [logo + text] group
    // compact and close to the timeline center.
    return (
      <div
        key={item.id}
        id={item.id}
        className="relative flex flex-col md:flex-row items-center w-full mb-45 last:mb-0"
      >
        {/* Timeline dot */}
        <div className="absolute left-2 md:left-1/2 w-3 h-3 rounded-full bg-accent-blue shadow-[0_0_12px_var(--color-accent-blue)] ring-4 ring-bg-primary -translate-x-1/2 z-10" />

        {/* Card — half-width on desktop, full-width on mobile */}
        <div
          className={`w-full pl-12 md:w-1/2 md:pl-0 flex items-center gap-3 ${
            isEven
              ? "md:pr-16 md:justify-end"         // left half, group near timeline
              : "md:pl-16 md:ml-auto md:justify-start" // right half, group near timeline
          }`}
        >
          {/* Logo — outer edge, hidden on mobile */}
          <div className={`hidden md:block shrink-0 ${isEven ? "order-first" : "order-last"}`}>
            <LogoPlaceholder />
          </div>

          {/* Text — timeline side of the group */}
          <div
            className={`flex flex-col ${
              isEven ? "items-end text-right" : "items-start text-left"
            }`}
          >
            <h3 className="text-lg md:text-xl font-bold text-text-primary tracking-tight">
              {item.role}
            </h3>
            <div className="flex flex-col gap-1 text-sm">
              <span className="text-accent-blue tracking-tight font-semibold">
                {item.company.replaceAll("-", "•")}
              </span>
              <span className="text-text-muted/70 tracking-tight text-xs font-mono">
                {item.startDate.toUpperCase()} - {item.endDate.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  });

  const timelineArrow = (
    <div
      className="absolute top-0 bottom-0 left-2 md:left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
      style={{ width: "12px" }}
    >
      <div
        className="flex-1 w-px"
        style={{ background: "var(--text-muted)", opacity: 0.3 }}
      />
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: "5px solid transparent",
          borderRight: "5px solid transparent",
          borderTop: "9px solid var(--text-muted)",
          opacity: 0.4,
        }}
      />
    </div>
  );

  return (
    <section
      id="exp-section"
      className="relative w-full py-12 flex flex-col items-center"
    >
      {/* Section Header */}
      <div className="w-full max-w-5xl mx-auto px-6 mb-16 md:mb-24 flex justify-start items-end z-10">
        <h2 className="text-sm font-mono tracking-widest text-text-muted uppercase">
          01. / Experience
        </h2>
      </div>

      {/* Content Container */}
      <div className="w-full max-w-4xl mx-auto px-6 flex flex-col">

      {/* Timeline Container */}
      <div className="relative w-full">
        {timelineArrow}
        {experienceCards}
      </div>

      <div className="border-l border-text-muted/20 ml-3 md:ml-4"></div>
      </div>
    </section>
  );
}
