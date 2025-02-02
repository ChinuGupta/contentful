import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HeroSection from "./Components/Herosection";
import Navbar from "./Components/Navbar";
import Blog from "./Components/Blog";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
