import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleJoinClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.limitContainer}>
        
        <div style={styles.column}>
          <h1 style={styles.brandName}>AMANI</h1>
          <p style={styles.tagline}>
            Leading the future of drone <br /> 
            automation and industrial robotics.
          </p>
          <div style={styles.socialLinks}>
            <a
              href="https://www.instagram.com/amani_automation/profilecard/?igsh=b3VidXdxZmZibGZt"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.socialIcon}
              title="Instagram"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.282.11-.705.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/></svg>
            </a>
            <a
              href="https://www.linkedin.com/in/amani-a-5b2852318/"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.socialIcon}
              title="LinkedIn"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/></svg>
            </a>
            <a
              href="https://www.youtube.com/@AmaniAutomation"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.socialIcon}
              title="YouTube"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.05-.075 1.959l-.008.104-.022.26-.01.104c-.048.519-.119 1.023-.22 1.402a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.637 99.637 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/></svg>
            </a>
          </div>
        </div>

        <div style={styles.column}>
          <h3 style={styles.heading}>Company</h3>
          <ul style={styles.linkList}>
            <li><Link to="/" style={styles.link}>Home</Link></li>
            <li><Link to="/services" style={styles.link}>Services</Link></li>
            <li><Link to="/projects" style={styles.link}>Projects</Link></li>
            <li><Link to="/products" style={styles.link}>Products</Link></li>
          </ul>
        </div>

        <div style={styles.column}>
          <h3 style={styles.heading}>Contact Us</h3>
          <p style={styles.contactText}>
            <strong>Call:</strong>{" "}
            <a href="tel:+919515612513" style={styles.contactLink}>+91 95156 12513</a>
          </p>
          <p style={styles.contactText}>
            <strong>Email:</strong>{" "}
            <a href="mailto:info@amaniautomation.com" style={styles.contactLink}>info@amaniautomation.com</a>
          </p>
          <p style={styles.contactText}>
            <strong>Visit:</strong>{" "}
            <a 
              href="https://maps.google.com/?q=Kistareddypet,Patancheru,Hyderabad,Telangana,502319" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={styles.contactLink}
            >
              Kistareddypet, Patancheru,<br />Hyderabad, Telangana, 502319
            </a>
          </p>
        </div>

        <div style={styles.column}>
          <h3 style={styles.heading}>Get Started</h3>
          <p style={styles.contactText}>New to AMANI? Join us to create your business account.</p>
          <button className="footer-join-btn" style={styles.joinBtn} onClick={handleJoinClick}>
            Join AMANI
          </button>
        </div>

      </div>

      <div style={styles.bottomBar}>
        <div style={styles.limitContainer}>
          <p style={styles.copyright}>
            © {currentYear} Amani Automation Pvt Ltd. All rights reserved.
          </p>
          <div style={styles.legalLinks}>
            <span style={styles.legalLink}>Privacy Policy</span>
            <span style={styles.legalLink}>Terms of Service</span>
          </div>
        </div>
      </div>

      <style>
        {`
          .footer-join-btn {
            transition: all 0.3s ease;
          }
          .footer-join-btn:hover {
            background-color: #FFFFFF !important;
            color: #11306D !important;
            transform: translateY(-2px);
          }
        `}
      </style>
    </footer>
  );
}

const styles = {
  footer: {
    width: "100%",
    backgroundColor: "#11306D",     
    padding: "80px 0 0 0",
    color: "#FFFFFF",
    fontFamily: "'Inter', sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  limitContainer: {
    width: "100%",
    maxWidth: "1300px",
    padding: "0 5%",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "40px",
    boxSizing: "border-box",
  },
  column: {
    flex: "1",
    minWidth: "250px",
  },
  brandName: {
    fontSize: "32px",
    fontWeight: "800",
    letterSpacing: "-1px",
    margin: "0 0 15px 0",
    color: "#FFFFFF",
  },
  tagline: {
    fontSize: "15px",
    color: "rgba(255, 255, 255, 0.7)",
    lineHeight: "1.6",
    margin: "0 0 25px 0",
  },
  socialLinks: {
    display: "flex",
    gap: "15px",
  },
  socialIcon: {
    color: "#FFFFFF",
    opacity: 0.8,
    transition: "0.3s",
    textDecoration: "none",
  },
  heading: {
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "25px",
    position: "relative",
  },
  linkList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  link: {
    display: "block",
    color: "rgba(255, 255, 255, 0.7)",
    textDecoration: "none",
    fontSize: "15px",
    marginBottom: "12px",
    transition: "0.3s",
  },
  contactText: {
    fontSize: "15px",
    color: "rgba(255, 255, 255, 0.7)",
    lineHeight: "1.6",
    marginBottom: "15px",
  },
  contactLink: {
    color: "rgba(255, 255, 255, 0.7)",
    textDecoration: "none",
    transition: "0.3s",
  },
  joinBtn: {
    padding: "12px 25px",
    backgroundColor: "transparent",
    border: "2px solid #FFFFFF",
    color: "#FFFFFF",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "10px",
    outline: "none",
  },
  bottomBar: {
    width: "100%",
    marginTop: "60px",
    padding: "30px 0",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    display: "flex",
    justifyContent: "center",
  },
  copyright: {
    fontSize: "14px",
    color: "rgba(255, 255, 255, 0.5)",
    margin: 0,
  },
  legalLinks: {
    display: "flex",
    gap: "25px",
  },
  legalLink: {
    fontSize: "14px",
    color: "rgba(255, 255, 255, 0.5)",
    cursor: "pointer",
  }
};

export default Footer;