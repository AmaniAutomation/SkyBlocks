import React from "react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate

const About = () => {
  const navigate = useNavigate(); // 2. Initialize navigate

  const handleExplore = () => {
    navigate("/projects"); // 3. Define the path to your projects page
  };

  return (
    <section style={styles.section}>
      <div className="about-container" style={styles.mainContainer}>

        {/* LEFT IMAGE */}
        <div style={styles.imageSide}>
          <div style={styles.imageWrapper}>
            <img
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop"
              alt="Our Team Working"
              style={styles.aboutImage}
            />
            <div style={styles.imageAccent} />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div style={styles.contentSide}>
          {/* BADGE */}
          <div style={styles.badge}>
            <div style={styles.badgeLine} />
            <span style={styles.badgeText}>WHO WE ARE</span>
          </div>

          {/* HEADING */}
          <h2 style={styles.mainHeading}>
            Your Partner in <br />
            <span style={styles.headingHighlight}>
              Modern Automation.
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p style={styles.description}>
            At <strong>AMANI</strong>, we specialize in robotics,
            drones, and intelligent automation systems built to
            solve real-world challenges efficiently.
          </p>

          <p style={styles.description}>
            We create reliable and easy-to-use technologies for
            students, innovators, and industries looking to
            automate and grow with confidence.
          </p>

          {/* STATS */}
          <div style={styles.statsRow}>
            <div style={styles.statBox}>
              <h3 style={styles.statNumber}>10+</h3>
              <p style={styles.statLabel}>Years Experience</p>
            </div>

            <div style={styles.statBox}>
              <h3 style={styles.statNumber}>50+</h3>
              <p style={styles.statLabel}>Projects Completed</p>
            </div>
          </div>

          {/* BUTTON */}
          <button 
            className="about-btn" 
            style={styles.button}
            onClick={handleExplore} // 4. Add the click handler
          >
            Explore Projects
          </button>
        </div>
      </div>

      <style>
        {`
          * {
            box-sizing: border-box;
          }

          .about-btn {
            transition: all 0.3s ease;
          }

          .about-btn:hover {
            background-color: #1e4ba3 !important;
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(17, 48, 109, 0.2);
          }

          @media (max-width: 1024px) {
            .about-container {
              flex-direction: column;
              gap: 50px !important;
            }
          }

          @media (max-width: 768px) {
            .about-container {
              gap: 40px !important;
            }
          }
        `}
      </style>
    </section>
  );
};

const styles = {
  section: {
    width: "100%",
    overflow: "hidden",
    padding: "80px 5%",
    backgroundColor: "#FFFFFF",
    boxSizing: "border-box",
    fontFamily: "'Inter', sans-serif",
  },
  mainContainer: {
    width: "100%",
    maxWidth: "1300px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "70px",
  },
  imageSide: {
    flex: 1,
    width: "100%",
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
  },
  aboutImage: {
    width: "100%",
    height: "auto",
    display: "block",
    objectFit: "cover",
    borderRadius: "18px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
  },
  imageAccent: {
    position: "absolute",
    top: "-15px",
    left: "-15px",
    width: "90px",
    height: "90px",
    borderTop: "5px solid #11306D",
    borderLeft: "5px solid #11306D",
    zIndex: -1,
  },
  contentSide: {
    flex: 1,
    width: "100%",
  },
  badge: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "18px",
  },
  badgeLine: {
    width: "35px",
    height: "2px",
    backgroundColor: "#11306D",
  },
  badgeText: {
    fontSize: "13px",
    fontWeight: "700",
    letterSpacing: "2px",
    color: "#11306D",
  },
  mainHeading: {
    fontSize: "clamp(30px, 5vw, 52px)",
    lineHeight: "1.2",
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: "24px",
  },
  headingHighlight: {
    color: "#11306D",
  },
  description: {
    fontSize: "clamp(15px, 2vw, 17px)",
    lineHeight: "1.8",
    color: "#64748B",
    marginBottom: "18px",
  },
  statsRow: {
    display: "flex",
    gap: "40px",
    marginTop: "28px",
    paddingTop: "24px",
    borderTop: "1px solid #E2E8F0",
    marginBottom: "35px",
  },
  statBox: {
    display: "flex",
    flexDirection: "column",
  },
  statNumber: {
    fontSize: "30px",
    fontWeight: "800",
    color: "#11306D",
    margin: 0,
  },
  statLabel: {
    marginTop: "6px",
    fontSize: "14px",
    color: "#94A3B8",
  },
  button: {
    padding: "15px 32px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#11306D",
    color: "#FFFFFF",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 6px 18px rgba(17, 48, 109, 0.15)",
  },
};

export default About;