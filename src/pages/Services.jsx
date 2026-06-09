import React, { useState } from "react";

function Services() {

  const [selectedService, setSelectedService] =
    useState(null);

  const services = [

    {
      number: "01",

      title: "Software Solutions",

      fullDesc:
        "Our software engineering solutions focus on building scalable, intelligent, and automation-driven platforms tailored for industrial, enterprise, and research applications. We specialize in dashboard systems, AI integrations, workflow systems, and cloud-connected technologies.",

      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop",
    },

    {
      number: "02",

      title: "Embedded Systems Solutions",

      fullDesc:
        "We develop advanced embedded systems using microcontrollers, sensors, and IoT architectures for real-time automation and robotics applications with reliable hardware-software integration.",

      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop",
    },

    {
      number: "03",

      title: "CAD Simulations",

      fullDesc:
        "Our CAD simulation services include precision 3D modeling, structural analysis, engineering visualization, and simulation workflows for industrial prototypes and manufacturing systems.",

      image:
        "https://images.unsplash.com/photo-1535378917042-10a22c95931a?q=80&w=1400&auto=format&fit=crop",
    },

    {
      number: "04",

      title: "Robotic Solutions",

      fullDesc:
        "We build intelligent robotic systems for industrial automation, education, and research innovation using AI, autonomous navigation, embedded systems, and modern control architectures.",

      image:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1400&auto=format&fit=crop",
    },
  ];

  return (
    <section style={styles.section}>

      <div style={styles.mainContainer}>

        {!selectedService && (

          <div style={styles.headerArea}>

            <h1 style={styles.mainHeading}>
              Our Services
            </h1>

          </div>
        )}

        {!selectedService && (

          <div
            className="services-grid"
            style={styles.servicesGrid}
          >

            {services.map((service, index) => (

              <div
                key={index}
                className="service-card"
                style={styles.card}
              >

                <div style={styles.imageWrapper}>

                  <img
                    src={service.image}
                    alt={service.title}
                    style={styles.cardImage}
                    className="card-image"
                  />

                </div>

                <div style={styles.cardContent}>

                  <div style={styles.topContent}>

                    <span style={styles.serviceNumber}>
                      {service.number}
                    </span>

                    <h2 style={styles.cardTitle}>
                      {service.title}
                    </h2>

                    <p style={styles.cardDescription}>
                      {service.fullDesc.substring(0, 110)}...
                    </p>

                  </div>

                  <button
                    style={styles.readBtn}
                    onClick={() =>
                      setSelectedService(service)
                    }
                  >
                    Read More
                  </button>

                </div>

              </div>
            ))}
          </div>
        )}

        {selectedService && (

          <div
            className="details-container"
            style={styles.detailsContainer}
          >

            <div style={styles.detailsLeft}>

              <img
                src={selectedService.image}
                alt={selectedService.title}
                style={styles.detailsImage}
              />

            </div>

            <div style={styles.detailsRight}>

              <span style={styles.detailsNumber}>
                {selectedService.number}
              </span>

              <h1 style={styles.detailsTitle}>
                {selectedService.title}
              </h1>

              <p style={styles.detailsDescription}>
                {selectedService.fullDesc}
              </p>

              <button
                style={styles.backBtn}
                onClick={() =>
                  setSelectedService(null)
                }
              >
                ← Back to Services
              </button>

            </div>

          </div>
        )}
      </div>

      <style>
        {`
          *{
            box-sizing:border-box;
          }

          .services-grid{
            display:grid;
            grid-template-columns:repeat(2,1fr);
            gap:18px;
          }

          .service-card{
            transition:0.35s ease;
          }

          .service-card:hover{
            transform:translateY(-5px);
            box-shadow:0 15px 35px rgba(17,48,109,0.08);
          }

          .service-card:hover .card-image{
            transform:scale(1.05);
          }

          @media(max-width:950px){

            .services-grid{
              grid-template-columns:1fr;
            }

            .service-card{
              flex-direction:column !important;
              align-items:center !important;
              text-align:center;
              height:auto !important;
            }

            .cardContent{
              align-items:center !important;
            }

            .details-container{
              grid-template-columns:1fr !important;
              gap:35px !important;
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
    backgroundColor: "#F8FBFF",
    padding: "100px 4% 40px",
    fontFamily: "'Inter', sans-serif",
  },

  mainContainer: {
    maxWidth: "1450px",
    margin: "0 auto",
  },

  headerArea: {
    textAlign: "center",
    marginBottom: "24px",
  },

  mainHeading: {
    fontSize: "clamp(38px,4vw,60px)",
    fontWeight: "800",
    color: "#11306D",
    margin: 0,
  },

  /* GRID */

  servicesGrid: {
    width: "100%",
  },

  card: {
    width: "100%",
    height: "250px",
    backgroundColor: "#FFFFFF",
    borderRadius: "22px",
    display: "flex",
    alignItems: "center",
    padding: "22px",
    gap: "26px",
    overflow: "hidden",
    border: "1px solid #E2E8F0",
    boxShadow: "0 6px 18px rgba(15,23,42,0.04)",
  },

  imageWrapper: {
    minWidth: "190px",
    width: "190px",
    height: "190px",
    borderRadius: "50%",
    overflow: "hidden",
    flexShrink: 0,
  },

  cardImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "0.5s ease",
  },

  cardContent: {
    flex: 1,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  topContent: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  serviceNumber: {
    color: "#11306D",
    fontSize: "22px",
    fontWeight: "600",
  },

  cardTitle: {
    color: "#1E293B",
    fontSize: "26px",
    fontWeight: "600",
    lineHeight: "1.35",
    margin: 0,
  },

  cardDescription: {
    color: "#64748B",
    fontSize: "15px",
    lineHeight: "1.7",
    marginTop: "4px",
    marginBottom: "22px",
    maxWidth: "95%",
  },

  readBtn: {
    width: "170px",
    padding: "13px 22px",
    backgroundColor: "#11306D",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
    color: "#FFFFFF",
  },


  detailsContainer: {
    width: "100%",
    minHeight: "75vh",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "60px",
    alignItems: "center",
  },

  detailsLeft: {
    width: "100%",
  },

  detailsImage: {
    width: "100%",
    borderRadius: "28px",
    objectFit: "cover",
    boxShadow: "0 12px 35px rgba(15,23,42,0.08)",
  },

  detailsRight: {
    width: "100%",
  },

  detailsNumber: {
    fontSize: "22px",
    color: "#11306D",
    fontWeight: "500",
  },

  detailsTitle: {
    fontSize: "clamp(38px,4vw,58px)",
    color: "#11306D",
    fontWeight: "700",
    lineHeight: "1.1",
    marginTop: "15px",
    marginBottom: "25px",
  },

  detailsDescription: {
    color: "#475569",
    fontSize: "17px",
    lineHeight: "2",
    marginBottom: "35px",
  },

  backBtn: {
    padding: "14px 30px",
    backgroundColor: "#11306D",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
    color: "#FFFFFF",
  },
};

export default Services;