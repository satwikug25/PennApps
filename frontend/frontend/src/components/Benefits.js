// src/components/Benefits.js
import React from 'react';

const Benefits = () => {
  return (
    <section style={styles.benefits}>
      <h2 style={styles.title}>Why Choose Us?</h2>
      <div style={styles.benefitList}>
        <div style={styles.benefitItem}>
          <h3>Speed</h3>
          <p>Reduce international wire transfer times from days to seconds.</p>
        </div>
        <div style={styles.benefitItem}>
          <h3>Security</h3>
          <p>Blockchain-backed, AI-powered fraud detection ensures top-level security.</p>
        </div>
        <div style={styles.benefitItem}>
          <h3>Transparency</h3>
          <p>Clear, transparent, and immutable transaction records stored on the blockchain.</p>
        </div>
      </div>
    </section>
  );
};

const styles = {
  benefits: {
    padding: '4rem 2rem',
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    fontSize: '2.5rem',
    marginBottom: '2rem',
  },
  benefitList: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  benefitItem: {
    maxWidth: '30%',
    background: '#f4f4f4',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
};

export default Benefits;

