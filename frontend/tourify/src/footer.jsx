import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaPinterest } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.left}>
        <p style={styles.p}><span style={styles.span}>&copy;</span> 2024 Tourify, Digital House. | All rights reserved.</p>
      </div>
      <div style={styles.right}>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>
          <FaInstagram />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>
          <FaYoutube />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>
          <FaFacebook />
        </a>
        <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>
          <FaPinterest />
        </a>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: '#E5E7EB',
    color: '#4B5563',
    padding: '1rem 2rem',
    fontSize: '0.9rem',
  },
  span: {
    color: '#FE8C00',
  },
  p: {
    margin: 0,
  },
  left: {
    flex: 1,
  },
  right: {
    display: 'flex',
    gap: '1rem',
  },
  icon: {
    color: '#FE8C00',
    fontSize: '1.5rem',
    textDecoration: 'none',
  },
};

export default Footer;
