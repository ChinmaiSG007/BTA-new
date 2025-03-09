import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import NavBar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import About from "./components/common/About";

function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Router>
        <div className="flex flex-col min-h-screen">
          <NavBar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </main>
  );
}

export default App;
