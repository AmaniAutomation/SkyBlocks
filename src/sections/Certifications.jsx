import React, { useState, useEffect, useCallback } from "react";

import c1 from "../assets/images/c1.png";
import c2 from "../assets/images/c2.png";
import c3 from "../assets/images/c3.png";
import s1 from "../assets/images/s1.png";
import s2 from "../assets/images/s2.png";
import s3 from "../assets/images/s3.png";

const Certifications = () => {
  const recognitions = [c1, c2, c3];
  const supporters = [s1, s2, s3];

  const mentors = [
    { name: "Expert Advisor", role: "Technical Guidance", org: "IIT Hyderabad" },
    { name: "Strategy Lead", role: "Business Growth", org: "Innovation Hub" },
    { name: "Research Mentor", role: "Robotics Systems", org: "Technology Center" },
  ];

  const [lightbox, setLightbox] = useState({ open: false, index: 0, list: [] });

  const openLightbox = (index, list) => {
    setLightbox({ open: true, index, list });
  };

  const closeLightbox = useCallback(() => {
    setLightbox((prev) => ({ ...prev, open: false }));
  }, []);

  const nextImage = useCallback(() => {
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index + 1) % prev.list.length,
    }));
  }, []);

  const prevImage = useCallback(() => {
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index - 1 + prev.list.length) % prev.list.length,
    }));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightbox.open) return;

      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        nextImage();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        prevImage();
      } else if (e.key === "Escape") {
        closeLightbox();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox.open, nextImage, prevImage, closeLightbox]);

  return (
    <section style={styles.section}>
      <div style={styles.mainContainer}>

        <div style={styles.subSection}>
          <div style={styles.headerArea}>
            <div style={styles.badge}>
              <span style={styles.badgeLine} />
              <span style={styles.badgeText}>CERTIFICATIONS</span>
            </div>
            <h2 style={styles.mainHeading}>
              Official <span style={styles.headingHighlight}>Recognitions.</span>
            </h2>
          </div>

          <div style={styles.bigGrid}>
            {recognitions.map((img, i) => (
              <div key={i} style={styles.largeCard} onClick={() => openLightbox(i, recognitions)} className="hover-card">
                <div style={styles.imageWrapper}>
                  <img src={img} alt="Recognition" style={styles.largeImg} />
                </div>
                <div style={styles.expandHint}>Click to expand</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ ...styles.subSection, marginTop: "120px" }}>
          <div style={styles.headerArea}>
            <div style={styles.badge}>
              <span style={styles.badgeLine} />
              <span style={styles.badgeText}>ECOSYSTEM</span>
            </div>
            <h2 style={styles.mainHeading}>
              Supporters & <span style={styles.headingHighlight}>Mentors.</span>
            </h2>
          </div>

          <div style={styles.bigGrid}>
            {supporters.map((img, i) => (
              <div key={i} style={styles.largeCard} onClick={() => openLightbox(i, supporters)} className="hover-card">
                <div style={styles.imageWrapper}>
                  <img src={img} alt="Supporter" style={styles.largeImg} />
                </div>
                <div style={styles.expandHint}>Click to expand</div>
              </div>
            ))}
          </div>

          <div style={styles.mentorGrid}>
            {mentors.map((m, i) => (
              <div key={i} style={styles.mentorInfoCard}>
                <h3 style={styles.mentorName}>{m.name}</h3>
                <p style={styles.mentorRole}>{m.role}</p>
                <p style={styles.mentorOrg}>{m.org}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {lightbox.open && (
        <div style={styles.lightboxOverlay} onClick={closeLightbox}>
          <button style={styles.closeBtn} onClick={closeLightbox}>✕</button>
          
          <button 
            style={{...styles.navBtn, left: "40px"}} 
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
          >
             <svg width="30" height="60" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>

          <div style={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.list[lightbox.index]} alt="Fullscreen view" style={styles.fullScreenImg} />
            <div style={styles.counter}>{lightbox.index + 1} / {lightbox.list.length}</div>
          </div>

          <button 
            style={{...styles.navBtn, right: "40px"}} 
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
          >
             <svg width="30" height="60" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      )}

      <style>
        {`
          .hover-card {
            transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
            cursor: pointer;
          }
          .hover-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 30px 60px rgba(17, 48, 109, 0.15);
            border-color: #11306D !important;
          }
          .hover-card:hover div:last-child { opacity: 1; }
        `}
      </style>
    </section>
  );
};

const styles = {
  section: {
    width: "100%", padding: "100px 5%", backgroundColor: "#F8FAFC", fontFamily: "'Inter', sans-serif",
  },
  mainContainer: { maxWidth: "1250px", margin: "0 auto" },
  headerArea: { textAlign: "center", marginBottom: "60px", display: "flex", flexDirection: "column", alignItems: "center" },
  badge: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" },
  badgeLine: { width: "30px", height: "2px", backgroundColor: "#11306D" },
  badgeText: { fontSize: "11px", fontWeight: "800", color: "#11306D", letterSpacing: "3px" },
  mainHeading: { fontSize: "clamp(32px, 5vw, 52px)", color: "#0F172A", fontWeight: "900", margin: 0 },
  headingHighlight: { color: "#11306D", fontWeight: "300" },

  bigGrid: {
    display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "30px", width: "100%",
  },
  largeCard: {
    backgroundColor: "#FFFFFF", borderRadius: "28px", border: "1px solid #E2E8F0",
    height: "380px", display: "flex", flexDirection: "column", position: "relative",
    padding: "30px", overflow: "hidden"
  },
  imageWrapper: {
    width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"
  },
  largeImg: {
    maxWidth: "100%", maxHeight: "100%", objectFit: "contain",
  },
  expandHint: {
    textAlign: "center", fontSize: "12px", color: "#11306D", fontWeight: "700",
    marginTop: "15px", opacity: 0, transition: "0.3s"
  },

  mentorGrid: {
    display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "25px", marginTop: "40px"
  },
  mentorInfoCard: {
    padding: "20px", textAlign: "center", borderTop: "1px solid #E2E8F0"
  },
  mentorName: { fontSize: "18px", fontWeight: "800", color: "#0F172A", marginBottom: "5px" },
  mentorRole: { fontSize: "14px", fontWeight: "600", color: "#11306D" },
  mentorOrg: { fontSize: "12px", color: "#64748B" },

  lightboxOverlay: {
    position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
    backgroundColor: "rgba(15, 23, 42, 0.98)", zIndex: 9999,
    display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(15px)"
  },
  lightboxContent: {
    position: "relative", width: "80%", height: "80%", display: "flex",
    flexDirection: "column", alignItems: "center", justifyContent: "center"
  },
  fullScreenImg: { maxWidth: "100%", maxHeight: "90%", objectFit: "contain" },
  counter: { color: "#fff", marginTop: "20px", fontSize: "14px", letterSpacing: "2px" },
  closeBtn: {
    position: "absolute", top: "40px", right: "40px", background: "none", border: "none",
    color: "#fff", fontSize: "30px", cursor: "pointer"
  },
  navBtn: {
    position: "absolute", background: "none", border: "none", cursor: "pointer", padding: "20px", zIndex: 10000
  }
};

export default Certifications;