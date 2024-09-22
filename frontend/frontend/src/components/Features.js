// src/components/Features.js
import React from 'react';

const Features = () => {
  return (
    <section style={styles.features}>
      <h2 style={styles.title}>Key Features</h2>
      <div style={styles.featureList}>
        <div style={styles.featureItem}>
          <h3>Blockchain Network</h3>
          <p>Secure, transparent, and immutable transaction logging, replacing outdated systems like SWIFT.</p>
        </div>
        <div style={styles.featureItem}>
          <h3>AI/ML Fraud Detection</h3>
          <p>Real-time fraud detection and compliance checks powered by AI and machine learning models.</p>
        </div>
        <div style={styles.featureItem}>
          <h3>Real-Time Payments</h3>
          <p>Lightning-fast transactions with minimal fees using decentralized financial technology.</p>
        </div>
      </div>
    </section>
  );
};

const styles = {
  features: {
    padding: '4rem 2rem',
    backgroundColor: '#f4f4f4',
  },
  title: {
    textAlign: 'center',
    fontSize: '2.5rem',
    marginBottom: '2rem',
  },
  featureList: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  featureItem: {
    maxWidth: '30%',
    background: 'white',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
};

export default Features;
