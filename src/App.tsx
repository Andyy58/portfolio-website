import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavbarProvider } from "./components/layout/NavbarContext";
import Home from "./pages/Home";

function App() {
  return (
    <NavbarProvider>
      <Router>
        <div className="fixed inset-0 z-[-2] w-full h-full bg-bg-primary bg-dot-grid" />

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </NavbarProvider>
  );
}

export default App;
