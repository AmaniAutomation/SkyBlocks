import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { supabase } from "../supabase"; // 1. Ensure you import your supabase client

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // 2. Updated dynamic navigation logic
  const handleExplore = async () => {
    // Check if a user is currently authenticated
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // If user exists, go to Dashboard
      navigate("/dashboard");
    } else {
      // If no user, go to Login
      navigate("/login");
    }
  };

  return (
    <section style={styles.section}>
      <div style={styles.mainContainer}>
      
        <div
          style={{
            ...styles.contentSide,
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? "translateY(0)" : "translateY(25px)",
            transition: "all 0.9s ease",
          }}
        >

          <h1 style={styles.mainTitle}>
            Modern Solutions for <br />
            Industrial Automation.
          </h1>

          <p style={styles.description}>
            We build advanced robotics, drone systems, automation platforms, and
            intelligent software solutions designed to improve efficiency,
            scalability, and innovation for modern industries.
          </p>

          <div style={styles.ctaGroup}>
            <button
              onClick={handleExplore} 
              style={styles.primaryBtn}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#11306D";
                e.currentTarget.style.color = "#FFFFFF";
                e.currentTarget.style.border = "2px solid #FFFFFF";
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 18px 35px rgba(0,0,0,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#FFFFFF";
                e.currentTarget.style.color = "#11306D";
                e.currentTarget.style.border = "2px solid #FFFFFF";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
              }}
            >
              Explore More
            </button>
          </div>

          <div style={styles.serviceList}>
            <span style={styles.serviceItem}>Robotics</span>
            <span style={styles.serviceDivider}>•</span>
            <span style={styles.serviceItem}>Drones</span>
            <span style={styles.serviceDivider}>•</span>
            <span style={styles.serviceItem}>Software</span>
            <span style={styles.serviceDivider}>•</span>
            <span style={styles.serviceItem}>Electronics</span>
          </div>
        </div>

        <div
          style={{
            ...styles.visualSide,
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? "translateX(0)" : "translateX(40px)",
            transition: "all 1s ease 0.2s",
          }}
        >
          <div style={styles.imageCard}>
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200"
              alt="Automation"
              style={styles.heroImage}
            />
          </div>
        </div>
      </div>

      <div style={styles.curveWrapper}>
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          style={styles.curveSvg}
        >
          <path
            fill="#FFFFFF"
            d="M0,20 C480,80 960,80 1440,20 L1440,100 L0,100 Z"
          />
        </svg>
      </div>
    </section>
  );
};

const styles = {
  section: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#11306D",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 7% 100px 7%", 
    boxSizing: "border-box",
    fontFamily: "'Inter', sans-serif",
    position: "relative",
    overflowY: "auto", 
  },
  mainContainer: {
    width: "100%",
    maxWidth: "1300px",
    display: "flex",
    alignItems: "center", 
    justifyContent: "space-between",
    gap: "55px",
    zIndex: 5,
    flexWrap: "wrap", 
  },
  contentSide: {
    flex: 1,
    minWidth: "320px", 
  },
  mainTitle: {
    fontSize: "clamp(34px, 4vw, 56px)",
    color: "#FFFFFF",
    fontWeight: "720",
    lineHeight: "1.12",
    marginBottom: "24px",
    letterSpacing: "-1.6px",
    maxWidth: "620px",
  },
  description: {
    fontSize: "17px",
    color: "rgba(255,255,255,0.82)",
    lineHeight: "1.95",
    marginBottom: "38px",
    maxWidth: "560px",
    fontWeight: "350",
  },
  ctaGroup: {
    display: "flex",
    marginBottom: "34px",
  },
  primaryBtn: {
    padding: "15px 38px",
    backgroundColor: "#FFFFFF",
    color: "#11306D",
    border: "2px solid #FFFFFF",
    borderRadius: "50px",
    fontSize: "15px",
    fontWeight: "650",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    outline: "none",
  },
  serviceList: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "40px", 
  },
  serviceItem: {
    color: "#FFFFFF",
    fontSize: "14px",
    opacity: 0.75,
    fontWeight: "500",
  },
  serviceDivider: {
    color: "#FFFFFF",
    opacity: 0.3,
  },
  visualSide: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    minWidth: "320px",
  },
  imageCard: {
    width: "100%",
    maxWidth: "500px",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 25px 55px rgba(0,0,0,0.32)",
  },
  heroImage: {
    width: "100%",
    height: "auto", 
    maxHeight: "520px",
    objectFit: "cover",
    display: "block",
  },
  curveWrapper: {
    position: "absolute",
    bottom: -1, 
    left: 0,
    width: "100%",
    lineHeight: 0,
    pointerEvents: "none", 
  },
  curveSvg: {
    width: "100%",
    height: "65px",
  },
};

export default Hero;