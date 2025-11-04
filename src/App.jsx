import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import NavBar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import About from "./components/common/About";
import Tours from "./components/pages/Tours";
import TourDetail from "./components/pages/TourDetail";
import Gallery from "./components/pages/Gallery";
import NotFound from "./components/pages/NotFound";
import ScrollToTop from "./components/common/ScrollToTop";

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
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/tours" element={<Tours />} />
              <Route path="/tours/:tourSlug" element={<TourDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ScrollToTop
              threshold={500}
              right={30}
              bottom={30}
              size={40}
              bgColor="#edff66"
              shadow={true}
            />
          </main>
          <Footer />
        </div>
      </Router>
    </main>
  );
}

export default App;
