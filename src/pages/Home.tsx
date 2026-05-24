import ScrollContainer from "../components/layout/ScrollContainer";
import ScatterCanvas from "../components/layout/ScatterCanavs";
import { Navbar } from "../components/layout/Navbar";

export default function Home() {
  return (
    <main className="w-full">
      <ScatterCanvas />
      <ScrollContainer />
      <Navbar />
    </main>
  );
}
