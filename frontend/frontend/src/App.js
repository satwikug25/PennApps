// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';  // Your page components
import About from './pages/About';  // Example page
import Contact from './pages/Contact';  // Example page

function App() {
  return (
    <Router>
    
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
     
    </Router>
  );
}

export default App;
