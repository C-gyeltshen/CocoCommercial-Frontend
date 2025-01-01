import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.about}>
          <img src="/cocologo.png" alt="Logo" style={styles.logo} />
          <h3 style={styles.heading}>About us:</h3>
          <ul style={styles.list}>
            <li>Objectives</li>
            <li>Who We Serve</li>
          </ul>
        </div>
        <div style={styles.contact}>
          <h3 style={styles.heading}>Contact:</h3>
          <p style={styles.email}>Email: unknown@mail.com</p>
          <div style={styles.icons}>
            <FaFacebook style={styles.icon} />
            <FaTwitter style={styles.icon} />
            <FaLinkedin style={styles.icon} />
          </div>
        </div>
      </div>
      <div style={styles.bottom}>
        <p style={styles.copyright}>© 2024 GakyidMarket. All rights reserved.</p>
        <div style={styles.links}>
          <a href="/privacy-policy" style={styles.link}>Privacy Policy</a> |
          <a href="/terms-and-conditions" style={styles.link}>Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
};

// Styles for the Footer Component
const styles: Record<string, React.CSSProperties> = {
  footer: {
    background: "#f0f0f0",
    padding: "20px 0",
    borderTop: "1px solid #ccc",
    fontFamily: "Arial, sans-serif",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  },
  about: {
    flex: 1,
    textAlign: "left",
  },
  contact: {
    flex: 1,
    textAlign: "right",
  },
  logo: {
    maxWidth: "80px",
    marginBottom: "10px",
  },
  heading: {
    marginBottom: "10px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    fontSize: "14px",
    color: "#333",
  },
  email: {
    fontSize: "14px",
    color: "#333",
    marginBottom: "10px",
  },
  icons: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  icon: {
    fontSize: "18px",
    color: "#3b5998",
    cursor: "pointer",
  },
  bottom: {
    textAlign: "center",
    marginTop: "20px",
    borderTop: "1px solid #ccc",
    paddingTop: "10px",
  },
  copyright: {
    fontSize: "12px",
    color: "#666",
    marginBottom: "5px",
  },
  links: {
    fontSize: "12px",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    margin: "0 5px",
  },
};

export default Footer;
