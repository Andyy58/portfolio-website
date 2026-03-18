/**
 * Artifacts data
 ** @property {string} id - Node id
 * @property {string} type - 'company-logo' | 'skill-icon'
 * @property {string} assetPath - Path to SVG/PNG
 * @property {string} sourceTriggerId - HTML id of element that spawns the artifact
 * @property {string} targetBlueprintId - HTML id of the destination slot in grid
 */


// TODO: refactor interface, maybe be a union of shape and logo/icon interfaces
export interface Artifact {
  id: string;
  type: "company-logo" | "skill-icon" | "base-shape";
  colorTheme?: string;
  initialPos?: string;
  assetPath?: string;
  sourceTriggerId?: string;
  targetBlueprintId?: string;
  shape?: string;
  label?: string;
}

export const artifacts: Artifact[] = [
  // Base shapes
{
    id: "shape-circle",
    type: "base-shape",
    shape: "circle",
    initialPos: "top-[15%] left-[15%]", 
    colorTheme: "text-accent-violet/30" 
  },
  {
    id: "shape-triangle",
    type: "base-shape",
    shape: "triangle",
    initialPos: "top-[70%] left-[12%]",
    colorTheme: "text-accent-cyan/35" 
  },
  {
    id: "shape-square",
    type: "base-shape",
    shape: "square",
    initialPos: "top-[25%] right-[18%]",
    colorTheme: "text-accent-green/35" 
  },
  {
    id: "shape-hexagon",
    type: "base-shape",
    shape: "hexagon",
    initialPos: "top-[65%] right-[12%] rotate-12", 
    colorTheme: "text-accent-blue/35" 
  },
  {
    id: "shape-diamond",
    type: "base-shape",
    shape: "diamond",
    initialPos: "bottom-[15%] right-[25%] -rotate-6", 
    colorTheme: "text-accent-yellow/40" 
  },
  {
    id: "shape-cross",
    type: "base-shape",
    shape: "cross",
    initialPos: "top-[40%] left-[22%] rotate-45", 
    colorTheme: "text-accent-red/30" 
  },

  {
    id: "artifact-tencent-logo",
    type: "company-logo",
    assetPath: "/assets/logos/tencent.svg",
    sourceTriggerId: "exp-tencent",
    targetBlueprintId: "blueprint-slot-tencent",
    label: "Tencent",
  },
  {
    id: "artifact-guowang-logo",
    type: "company-logo",
    assetPath: "/assets/logos/guowang.svg",
    sourceTriggerId: "exp-guowang",
    targetBlueprintId: "blueprint-slot-guowang",
    label: "Guowang",
  },
  {
    id: "artifact-chaseauto-logo",
    type: "company-logo",
    assetPath: "/assets/logos/chaseauto.svg",
    sourceTriggerId: "exp-chaseauto",
    targetBlueprintId: "blueprint-slot-chaseauto",
    label: "Chase Auto",
  },

  // -- Project skills --
  // Portfolio website
  {
    id: "artifact-portfolio-react",
    type: "skill-icon",
    assetPath: "/assets/skills/react.svg",
    sourceTriggerId: "proj-portfolio",
    targetBlueprintId: "blueprint-slot-react",
    label: "React",
  },
  {
    id: "artifact-portfolio-typescript",
    type: "skill-icon",
    sourceTriggerId: "proj-portfolio",
    targetBlueprintId: "blueprint-slot-typescript",
    assetPath: "/assets/skills/typescript.svg",
    label: "TypeScript",
  },
  {
    id: "artifact-portfolio-gsap",
    type: "skill-icon",
    sourceTriggerId: "proj-portfolio",
    targetBlueprintId: "blueprint-slot-gsap",
    assetPath: "/assets/skills/gsap.svg",
    label: "GSAP",
  },
  {
    id: "artifact-portfolio-tailwindcss",
    type: "skill-icon",
    sourceTriggerId: "proj-portfolio",
    targetBlueprintId: "blueprint-slot-tailwindcss",
    assetPath: "/assets/skills/tailwindcss.svg",
    label: "TailwindCSS",
  },

  // Fridge scanner
  {
    id: "artifact-fridgescanner-yolo",
    type: "skill-icon",
    sourceTriggerId: "proj-fridgescanner",
    targetBlueprintId: "blueprint-slot-yolo",
    assetPath: "/assets/skills/yolo.svg",
    label: "YOLO",
  },

  // SiGnL
  {
    id: "artifact-signl-opencv",
    type: "skill-icon",
    sourceTriggerId: "prof-signl",
    targetBlueprintId: "blueprint-slot-opencv",
    assetPath: "/assets/skills/opencv.svg",
    label: "OpenCV",
  },
  {
    id: "artifact-signl-python",
    type: "skill-icon",
    sourceTriggerId: "prof-signl",
    targetBlueprintId: "blueprint-slot-python",
    assetPath: "/assets/skills/python.svg",
    label: "Python",
  },
];
