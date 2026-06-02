import React, { useState, useEffect, useCallback } from "react";

/**
 * IMPORT & PROCESS IMAGES
 */
const imageModules = import.meta.glob(
  "/src/assets/images/17_files/*.{png,PNG,jpg,JPG,jpeg,JPEG}",
  { eager: true }
);

const sortedImages = Object.values(imageModules)
  .map((mod) => mod.default)
  .filter((path) => {
    const fileName = path.split("/").pop();
    const match = fileName.match(/^(\d+)\./);

    return match ? parseInt(match[1], 10) <= 19 : false;
  })
  .sort((a, b) => {
    const getNum = (path) =>
      parseInt(
        path
          .split("/")
          .pop()
          .match(/^(\d+)\./)[1],
        10
      );

    return getNum(a) - getNum(b);
  });

/**
 * TOTAL MEDIA ARRAY
 */
const allMedia = [
  ...sortedImages.map((src) => ({
    type: "image",
    src,
  })),

  /**
   * VIDEO 1 - YOUTUBE
   */
  {
    type: "video",
    src: "https://www.youtube.com/embed/zE5HL3v1B3A",
    thumb:
      "https://img.youtube.com/vi/zE5HL3v1B3A/hqdefault.jpg",
    isYoutube: true,
  },

  /**
   * VIDEO 2 - WEBSITE VIDEO
   */
  {
    type: "video",
    src:
      "https://video.wixstatic.com/video/59f45f_d3f60c079ed945e198241aa307e9928e/480p/mp4/file.mp4",
    isYoutube: false,
  },
];

function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const openLightbox = (index) =>
    setSelectedIndex(index);

  const closeLightbox = () =>
    setSelectedIndex(null);

  const showNext = useCallback(() => {
    setSelectedIndex(
      (prev) => (prev + 1) % allMedia.length
    );
  }, []);

  const showPrev = useCallback(() => {
    setSelectedIndex(
      (prev) =>
        (prev - 1 + allMedia.length) %
        allMedia.length
    );
  }, []);

  /**
   * KEYBOARD NAVIGATION
   */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;

      if (
        e.key === "ArrowRight" ||
        e.key === "ArrowUp"
      ) {
        showNext();
      } else if (
        e.key === "ArrowLeft" ||
        e.key === "ArrowDown"
      ) {
        showPrev();
      } else if (e.key === "Escape") {
        closeLightbox();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [selectedIndex, showNext, showPrev]);

  return (
    <section style={styles.section}>
      {/* BACKGROUND GLOWS */}
      <div style={styles.bgGlow1} />
      <div style={styles.bgGlow2} />

      <div style={styles.mainContainer}>
        {/* HEADER */}
        <div style={styles.headerArea}>
          <div style={styles.badge}>
            <span style={styles.badgeLine} />

            <span style={styles.badgeText}>
              AMANI INNOVATION HUB
            </span>
          </div>

          <h1 style={styles.mainHeading}>
            Moments of{" "}
            <span
              style={styles.headingHighlight}
            >
              Innovation.
            </span>
          </h1>

          <p style={styles.subText}>
            Technical archive of
            exhibitions, drone summits,
            robotics showcases, and
            innovation events from
            AMANI Automation.
          </p>
        </div>

        {/* MEDIA GRID */}
        <div
          className="gallery-grid"
          style={styles.galleryGrid}
        >
          {allMedia.map((item, index) => (
            <div
              key={index}
              className="gallery-card"
              style={styles.galleryCard}
              onClick={() =>
                openLightbox(index)
              }
            >
              <div style={styles.imageWrapper}>
                {/* IMAGE */}
                {item.type === "image" && (
                  <img
                    src={item.src}
                    alt={`Media ${index + 1}`}
                    style={styles.galleryImage}
                    loading="lazy"
                  />
                )}

                {/* YOUTUBE VIDEO */}
                {item.type === "video" &&
                  item.isYoutube && (
                    <img
                      src={item.thumb}
                      alt="Video Thumbnail"
                      style={styles.galleryImage}
                    />
                  )}

                {/* DIRECT VIDEO */}
                {item.type === "video" &&
                  !item.isYoutube && (
                    <video
                      muted
                      playsInline
                      style={styles.galleryImage}
                    >
                      <source
                        src={item.src}
                        type="video/mp4"
                      />
                    </video>
                  )}

                {/* OVERLAY */}
                <div
                  className="overlay"
                  style={styles.overlay}
                >
                  <div
                    style={styles.overlayContent}
                  >
                    <span
                      style={
                        styles.overlayCategory
                      }
                    >
                      {item.type === "image"
                        ? "TECHNICAL VIEW"
                        : "VIDEO SHOWCASE"}
                    </span>

                    <h3
                      style={styles.overlayTitle}
                    >
                      Item {index + 1}
                    </h3>

                    <span
                      style={styles.clickHint}
                    >
                      Click to open
                    </span>
                  </div>
                </div>

                {/* PLAY ICON */}
                {item.type === "video" && (
                  <div style={styles.playIcon}>
                    ▶
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      {selectedIndex !== null && (
        <div
          style={styles.lightboxOverlay}
          onClick={closeLightbox}
        >
          {/* CLOSE */}
          <button
            style={styles.closeBtn}
            onClick={closeLightbox}
          >
            ✕
          </button>

          {/* LEFT */}
          <button
            style={styles.navBtnLeft}
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
          >
            <svg
              width="30"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          {/* CONTENT */}
          <div
            style={styles.lightboxContent}
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            {/* IMAGE */}
            {allMedia[selectedIndex].type ===
            "image" ? (
              <img
                src={
                  allMedia[selectedIndex].src
                }
                style={styles.fullMedia}
                alt="Full View"
              />
            ) : allMedia[selectedIndex]
                .isYoutube ? (
              /* YOUTUBE */
              <iframe
                src={`${allMedia[selectedIndex].src}?autoplay=1`}
                style={styles.fullVideo}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            ) : (
              /* DIRECT VIDEO */
              <video
                src={
                  allMedia[selectedIndex].src
                }
                controls
                autoPlay
                style={styles.fullMedia}
              />
            )}

            <div style={styles.lightboxInfo}>
              {selectedIndex + 1} of{" "}
              {allMedia.length}
            </div>
          </div>

          {/* RIGHT */}
          <button
            style={styles.navBtnRight}
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
          >
            <svg
              width="30"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      )}

      <style>
        {`
          * {
            box-sizing: border-box;
          }

          .gallery-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 25px;
          }

          .gallery-card {
            position: relative;
            height: 350px;
            border-radius: 24px;
            overflow: hidden;
            background-color: #fff;
            border: 1px solid #E2E8F0;
            transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
            cursor: pointer;
            padding: 15px;
          }

          .gallery-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px -10px rgba(17, 48, 109, 0.15);
          }

          .gallery-card:hover .overlay {
            opacity: 1;
          }

          @media (max-width: 1100px) {
            .gallery-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (max-width: 700px) {
            .gallery-grid {
              grid-template-columns: 1fr;
            }

            .gallery-card {
              height: 300px;
            }
          }
        `}
      </style>
    </section>
  );
}

const styles = {
  section: {
    width: "100%",
    minHeight: "100vh",
    padding: "150px 5% 100px",
    backgroundColor: "#F8FAFC",
    fontFamily: "'Inter', sans-serif",
    position: "relative",
    overflow: "hidden",
  },

  mainContainer: {
    width: "100%",
    maxWidth: "1300px",
    margin: "0 auto",
    position: "relative",
    zIndex: 5,
  },

  headerArea: {
    textAlign: "center",
    marginBottom: "70px",
  },

  badge: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "16px",
  },

  badgeLine: {
    width: "30px",
    height: "2px",
    backgroundColor: "#11306D",
  },

  badgeText: {
    fontSize: "11px",
    fontWeight: "800",
    color: "#11306D",
    letterSpacing: "3px",
  },

  mainHeading: {
    fontSize: "clamp(32px, 5vw, 56px)",
    fontWeight: "900",
    color: "#0F172A",
    margin: 0,
    letterSpacing: "-1.5px",
  },

  headingHighlight: {
    color: "#11306D",
    fontWeight: "300",
  },

  subText: {
    marginTop: "20px",
    color: "#64748B",
    fontSize: "17px",
    lineHeight: "1.7",
  },

  galleryGrid: {
    width: "100%",
  },

  galleryCard: {
    backgroundColor: "#FFFFFF",
  },

  imageWrapper: {
  width: "100%",
  height: "100%",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  backgroundColor: "#FFFFFF",
  borderRadius: "16px",
},

  galleryImage: {
  width: "100%",
  height: "100%",
  objectFit: "contain",
  backgroundColor: "#FFFFFF",
  borderRadius: "12px",
  padding: "6px",
},

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "rgba(15, 23, 42, 0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
    transition: "opacity 0.3s ease",
    textAlign: "center",
  },

  overlayContent: {
    color: "#fff",
  },

  overlayCategory: {
    fontSize: "9px",
    fontWeight: "800",
    color: "#3B82F6",
    letterSpacing: "2px",
  },

  overlayTitle: {
    fontSize: "18px",
    fontWeight: "700",
    margin: "8px 0",
  },

  clickHint: {
    fontSize: "11px",
    opacity: 0.8,
  },

  playIcon: {
    position: "absolute",
    width: "55px",
    height: "55px",
    background:
      "rgba(17, 48, 109, 0.9)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "22px",
    pointerEvents: "none",
    backdropFilter: "blur(10px)",
  },

  lightboxOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor:
      "rgba(15, 23, 42, 0.98)",
    zIndex: 2000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(15px)",
    cursor: "zoom-out",
  },

  lightboxContent: {
    position: "relative",
    maxWidth: "90%",
    maxHeight: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "default",
  },

  fullMedia: {
    maxWidth: "100%",
    maxHeight: "75vh",
    objectFit: "contain",
    borderRadius: "8px",
    boxShadow:
      "0 30px 100px rgba(0,0,0,0.5)",
  },

  fullVideo: {
    width: "80vw",
    height: "45vw",
    maxWidth: "1100px",
    maxHeight: "620px",
    borderRadius: "8px",
  },

  lightboxInfo: {
    color: "#fff",
    marginTop: "20px",
    fontSize: "14px",
    opacity: 0.8,
    letterSpacing: "2px",
  },

  closeBtn: {
    position: "absolute",
    top: "40px",
    right: "40px",
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "28px",
    cursor: "pointer",
    zIndex: 2001,
  },

  navBtnLeft: {
    position: "absolute",
    left: "5%",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "20px",
    zIndex: 2001,
  },

  navBtnRight: {
    position: "absolute",
    right: "5%",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "20px",
    zIndex: 2001,
  },

  bgGlow1: {
    position: "absolute",
    top: "-10%",
    right: "-5%",
    width: "500px",
    height: "500px",
    background:
      "radial-gradient(circle, rgba(17, 48, 109, 0.04) 0%, transparent 70%)",
  },

  bgGlow2: {
    position: "absolute",
    bottom: "10%",
    left: "-5%",
    width: "400px",
    height: "400px",
    background:
      "radial-gradient(circle, rgba(59, 130, 246, 0.03) 0%, transparent 70%)",
  },
};

export default Gallery;