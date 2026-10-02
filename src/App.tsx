import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavbarProvider } from "./components/layout/NavbarContext";
import Home from "./pages/Home";

function App() {
  return (
    <NavbarProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </NavbarProvider>
  );
}

export default App;
