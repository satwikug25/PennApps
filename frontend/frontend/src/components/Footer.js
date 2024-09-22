// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; 2024 FastWireTransfer. All rights reserved.</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#3f51b5',
    color: 'white',
    textAlign: 'center',
    padding: '1rem 0',
  },
};

export default Footer;
