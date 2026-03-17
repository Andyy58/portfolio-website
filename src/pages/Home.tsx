import ScrollContainer from "../components/layout/ScrollContainer";
import ScatterCanvas from "../components/layout/ScatterCanavs";

export default function Home() {
  return (
    <main className="w-full">
      <ScatterCanvas />
      <ScrollContainer />
    </main>
  );
}