import { type Artifact, artifacts } from "../../data/artifactsData";

const WireframeShape = ({ shape }: Pick<Artifact, "shape">) => {
  // --- The Core Styling ---
  // w-12/h-12: Standard size for these background elements.
  // stroke-current / fill-transparent: Essential for the wireframe look.
  // text-accent-blue/40: Sets the stroke color to your electric blue, slightly faint.
  // drop-shadow-[0_0_12px_var(--color-accent-glow)]: Applies the spread glow effect we defined in CSS.

  const baseClasses =
    "w-12 h-12 md:w-16 md:h-16 stroke-current fill-transparent drop-shadow-[0_0_12px_var(--color-accent-glow)]";

  // We keep the strokeWidth consistent (1.5) for that precise, technical feel.
  switch (shape) {
    case "circle":
      return (
        <svg className={baseClasses} viewBox="0 0 100 100" strokeWidth="1.5">
          <circle cx="50" cy="50" r="48" />
        </svg>
      );
    case "square":
      return (
        <svg className={baseClasses} viewBox="0 0 100 100" strokeWidth="1.5">
          <rect x="2" y="2" width="96" height="96" rx="4" />
        </svg>
      );
    case "triangle":
      return (
        <svg className={baseClasses} viewBox="0 0 100 100" strokeWidth="1.5">
          <polygon points="50,5 95,95 5,95" strokeLinejoin="round" />
        </svg>
      );
    case "hexagon": 
      return (
        <svg className={baseClasses} viewBox="0 0 100 100" strokeWidth="1.5">
          <polygon
            points="50,5 95,28 95,72 50,95 5,72 5,28"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "diamond":
      return (
        <svg className={baseClasses} viewBox="0 0 100 100" strokeWidth="1.5">
          <polygon points="50,5 95,50 50,95 5,50" strokeLinejoin="round" />
        </svg>
      );
    case "cross":
      return (
        <svg className={baseClasses} viewBox="0 0 100 100" strokeWidth="1.5">
          <line x1="50" y1="15" x2="50" y2="85" strokeLinecap="round" />
          <line x1="15" y1="50" x2="85" y2="50" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
};

export default function ScatterCanvas() {
  return (
    /* Z-Index: -1 (Between the dot grid and the scroll content) 
       pointer-events-none: Critical so clicks/scrolls pass through to foreground content.
    */
    <div className="fixed inset-0 w-full h-full z-[-1] pointer-events-none overflow-hidden">
      {artifacts.map((artifact) => {
        // 1. Render the static anchor shapes (Base Geometry)
        if (artifact.type === "base-shape") {
          return (
            <div
              key={artifact.id}
              id={artifact.id}
              className={`absolute ${artifact.initialPos} ${artifact.colorTheme}`}
            >
              <WireframeShape shape={artifact.shape} />
            </div>
          );
        }

        // 2. Prepare the hidden DOM nodes for the dynamic artifacts (Logos & Skills)
        // Hidden at opacity-0, waiting for GSAP to grab them later.
        return (
          <div
            key={artifact.id}
            id={artifact.id}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0"
          >
            {/* Render the specific visual asset if path exists */}
            {artifact.assetPath ? (
              <img
                src={artifact.assetPath}
                alt={`${artifact.id} visual`}
                className="w-12 h-12 md:w-16 md:h-16 object-contain"
              />
            ) : (
              /* A technical wireframe placeholder box for artifacts missing visual assets */
              <div className="w-12 h-12 md:w-16 md:h-16 border border-text-muted/50 bg-bg-secondary/20 rounded-md backdrop-blur-sm" />
            )}
          </div>
        );
      })}
    </div>
  );
}
