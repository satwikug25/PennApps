// src/pages/Home.js
import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Benefits from '../components/Benefits';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Hero />
      <Features />
      <Benefits />
      <Footer />
    </div>
  );
};

export default Home;
