// src/components/Hero.js
import React from 'react';


const Hero = () => {
    const handleLogin = () => {
        window.location.href = "https://369213104.propelauthtest.com";  // Redirect to PropelAuth
      };


  return (
    <section style={styles.hero}>
      <div style={styles.content}>
        <h1 style={styles.title}>Revolutionizing International Wire Transfers</h1>
        <p style={styles.subtitle}>
          Harnessing the power of blockchain, AI/ML, and real-time payments to drastically reduce the time required for international transfers.
        </p>
        <button onClick={handleLogin} style={styles.button}>
        Login / Signup
      </button>
      </div>
    </section>
  );
};

const styles = {
  hero: {
    height: '100vh',
    background: 'linear-gradient(120deg, #4e54c8, #8f94fb)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  content: {
    textAlign: 'center',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
  },
  button: {
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    padding: '0.8rem 2rem',
    fontSize: '1rem',
    cursor: 'pointer',
    borderRadius: '5px',
  },
};

export default Hero;
