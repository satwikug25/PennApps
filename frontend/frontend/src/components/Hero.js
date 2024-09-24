import React, { useEffect } from 'react';
import blockwireLogo from './blockwire.png';
import pennlogo from './pennlogo.png'; // PennApps logo
import bannermlh from './bannermlh.png'; // MLH Banner


const Hero = () => {
  useEffect(() => {
      const canvas = document.getElementById('matrixCanvas');
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const columns = Math.floor(canvas.width / 20); // matrix effect columns
      const drops = Array(columns).fill(1);

      const drawMatrix = () => {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = '#007BFF';
          ctx.font = '15px monospace';

          for (let i = 0; i < drops.length; i++) {
              const text = String.fromCharCode(Math.floor(33 + Math.random() * 94));
              ctx.fillText(text, i * 20, drops[i] * 20);

              if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                  drops[i] = 0;
              }
              drops[i]++;
          }
      };

      const matrixInterval = setInterval(drawMatrix, 33);

      return () => clearInterval(matrixInterval);
  }, []);

  const handleLogin = () => {
      window.location.href = "https://369213104.propelauthtest.com";  // Redirect to PropelAuth
  };

  return (
      <section style={styles.hero}>
          {/* Canvas for Matrix Effect */}
          <canvas id="matrixCanvas" style={styles.matrixCanvas}></canvas>
          
          {/* MLH Banner in the top-left corner */}
          <div style={styles.bannerContainer}>
              <img src={bannermlh} alt="MLH Official 2025 Season" style={styles.mlhBanner} />
          </div>
          
          {/* Center Content */}
          <div style={styles.content}>
              <div style={styles.logoContainer}>
                  <img src={pennlogo} alt="PennApps Logo" style={styles.logo} />
                  <h1 style={styles.vs}>x</h1> {/* The 'x' between logos */}
                  <img src={blockwireLogo} alt="BlockWire Logo" style={styles.logo} />
              </div>

              <h2 style={styles.title}>BlockWire: Revolutionizing International Wire Transfers</h2>
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
      backgroundColor: '#ffffff', // White background
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      padding: '2rem',
  },
  matrixCanvas: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      zIndex: 0, // Behind all content
  },
  bannerContainer: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      zIndex: 2, // Above the matrix effect
  },
  mlhBanner: {
      width: '100px', // Resize MLH banner for top-left corner
  },
  content: {
      textAlign: 'center',
      color: '#333',
      zIndex: 2, // Above the matrix effect
      maxWidth: '900px', // Max width to prevent stretching
      padding: '2rem',
      backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white for contrast
      borderRadius: '12px', // Slightly rounded corners
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
  },
  logoContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '2rem',
  },
  logo: {
      width: '130px', // Smaller logo size for cleaner look
      margin: '0 1.5rem', // Spacing between logos
      transition: 'transform 0.3s ease',  // Smooth hover animation
  },
  vs: {
      fontSize: '2rem',
      margin: '0 1rem',
      fontWeight: 'bold',
      color: '#FF4081',  // Bright accent color for the "x"
  },
  title: {
      fontSize: '2.8rem',
      marginBottom: '1.2rem',
      fontFamily: "'Poppins', sans-serif",  // Modern Poppins font
      fontWeight: '600',
  },
  subtitle: {
      fontSize: '1.1rem',
      marginBottom: '2rem',
      color: '#555', // Softer gray text
      fontFamily: "'Montserrat', sans-serif",  // Sleek Montserrat font
      lineHeight: '1.5',
  },
  button: {
      backgroundColor: '#007BFF',  // Strong blue button
      color: 'white',
      border: 'none',
      padding: '1rem 3rem',
      fontSize: '1.2rem',
      cursor: 'pointer',
      borderRadius: '50px',  // Rounded button
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',  // Hover effect
  },
  buttonHover: {
      backgroundColor: '#0056b3',
      transform: 'translateY(-3px)',  // Slight lift on hover
      boxShadow: '0 8px 25px rgba(0, 123, 255, 0.3)',
  },
};

export default Hero;