import React, { useState } from "react";

function Projects() {

  const [selectedProject, setSelectedProject] =
    useState(null);

  const projects = [

    {
      number: "01",

      title: "Electronic Speed Controllers",

      shortDesc:
        "Efficient ESC systems engineered for stable drone motion control.",

      fullDesc:
        "Experience the pinnacle of efficient control with the Electronic Speed Controller from Amani Automation Pvt. Tailored for high-performance applications, this controller offers precise velocity management, enhancing the lifespan and efficiency of your machinery. Committed to empowering India with cutting-edge automation solutions, our controllers ensure seamless integration with your existing systems. Backed by our expertise, your business will benefit from significant operational improvements and reduced energy consumption. Choose Amani Automation Pvt for reliable technology that propels your operations forward.",

      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop",
    },

    {
      number: "02",

      title: "Flight Controllers",

      shortDesc:
        "Advanced flight systems designed for intelligent drone navigation.",

      fullDesc:
        "Explore unparalleled precision with our Customized Flight Controller at Amani Automation Pvt. Engineered for excellence, this state-of-the-art solution integrates seamlessly into your systems, enhancing operational efficiency and delivering top-tier performance. Empowering India with cutting-edge automation solutions, we ensure each Flight Controller is tailored to meet your unique requirements. Experience the pinnacle of innovation and reliability, backed by our commitment to driving technological advancement.",

      image:
        "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1400&auto=format&fit=crop",
    },

    {
      number: "03",

      title: "Battery Management Systems",

      shortDesc:
        "Reliable battery monitoring and power optimization solutions.",

      fullDesc:
        "Experience unmatched energy efficiency with Amani Automation Pvt’s customized Battery Management System (BMS). Our state-of-the-art BMS ensures optimal performance and longevity of your battery assets, tailored specifically to your needs. By integrating our advanced automation solutions, you're not just investing in technology – you're empowering India’s sustainable future. Trust Amani Automation Pvt to provide you with reliable, innovative, and customized solutions for all your energy management requirements.",

      image:
        "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=1400&auto=format&fit=crop",
    },

    {
      number: "04",

      title: "Customized Camera Modules",

      shortDesc:
        "Smart vision systems for mapping, surveillance, and AI applications.",

      fullDesc:
        "We specialize in customized camera modules tailored to your exact specifications, ensuring optimal performance for your unique applications. Our OEM service brings your camera designs to life, while our ODM service offers ready-to-sell solutions with custom branding. From sensor integration to firmware modifications, we adapt features like brightness, contrast, and color balance to meet your needs. Whether for industrial, medical, or innovative new applications, we provide hardware and software modifications to enhance functionality. If you have a unique requirement, contact us to explore more customization options!",

      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1400&auto=format&fit=crop",
    },
  ];

  return (

    <section style={styles.section}>

      <div style={styles.container}>

        {!selectedProject && (

          <div style={styles.headerArea}>

            <div style={styles.badge}>

              <span style={styles.badgeLine} />

              <span style={styles.badgeText}>
                OUR PROJECTS
              </span>

            </div>

            <h1 style={styles.mainHeading}>
              Engineering Innovation Into{" "}

              <span style={styles.headingHighlight}>
                Intelligent Solutions.
              </span>

            </h1>

            <p style={styles.subText}>
              Explore our advanced engineering projects in
              automation, drones, embedded systems, and
              robotics technologies.
            </p>

          </div>
        )}

        {!selectedProject && (

          <div
            className="projects-grid"
            style={styles.projectsGrid}
          >

            {projects.map((project, index) => (

              <div
                key={index}
                className="project-card"
                style={styles.card}
              >

                <div style={styles.imageWrapper}>

                  <img
                    src={project.image}
                    alt={project.title}
                    style={styles.cardImage}
                    className="card-image"
                  />

                </div>

                <div
                  className="cardContent"
                  style={styles.cardContent}
                >

                  <div>

                    <span style={styles.projectNumber}>
                      {project.number}
                    </span>

                    <h2 style={styles.cardTitle}>
                      {project.title}
                    </h2>

                    <p style={styles.cardDescription}>
                      {project.shortDesc}
                    </p>

                  </div>

                  <button
                    style={styles.readBtn}
                    onClick={() =>
                      setSelectedProject(project)
                    }
                  >
                    Read More
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

        {selectedProject && (

          <div
            className="details-container"
            style={styles.detailsContainer}
          >

            <div style={styles.detailsLeft}>

              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                style={styles.detailsImage}
              />

            </div>

            <div style={styles.detailsRight}>

              <span style={styles.detailsNumber}>
                {selectedProject.number}
              </span>

              <h1 style={styles.detailsTitle}>
                {selectedProject.title}
              </h1>

              <p style={styles.detailsDescription}>
                {selectedProject.fullDesc}
              </p>

              <button
                style={styles.backBtn}
                onClick={() =>
                  setSelectedProject(null)
                }
              >
                ← Back to Projects
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

          .projects-grid{
            display:grid;
            grid-template-columns:repeat(2,1fr);
            gap:22px;
          }

          .project-card{
            transition:0.35s ease;
          }

          .project-card:hover{
            transform:translateY(-6px);
            box-shadow:0 18px 40px rgba(17,48,109,0.08);
          }

          .project-card:hover .card-image{
            transform:scale(1.06);
          }

          @media(max-width:950px){

            .projects-grid{
              grid-template-columns:1fr;
            }

            .project-card{
              flex-direction:column !important;
              height:auto !important;
              text-align:center;
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
    padding: "120px 4% 50px",
    fontFamily: "'Inter', sans-serif",
  },

  container: {
    maxWidth: "1450px",
    margin: "0 auto",
  },

  headerArea: {
    textAlign: "center",
    marginBottom: "32px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  badge: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "14px",
  },

  badgeLine: {
    width: "24px",
    height: "2px",
    backgroundColor: "#11306D",
  },

  badgeText: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#11306D",
    letterSpacing: "3px",
  },

  mainHeading: {
    fontSize: "clamp(38px,4vw,58px)",
    fontWeight: "800",
    color: "#0F172A",
    lineHeight: "1.2",
    margin: 0,
  },

  headingHighlight: {
    color: "#11306D",
    fontWeight: "300",
  },

  subText: {
    marginTop: "18px",
    maxWidth: "750px",
    fontSize: "16px",
    lineHeight: "1.8",
    color: "#64748B",
  },

  projectsGrid: {
    width: "100%",
  },

  card: {
    width: "100%",
    height: "270px",
    backgroundColor: "#FFFFFF",
    borderRadius: "24px",
    display: "flex",
    alignItems: "center",
    gap: "26px",
    padding: "22px",
    overflow: "hidden",
    border: "1px solid #E2E8F0",
    boxShadow: "0 6px 18px rgba(15,23,42,0.05)",
  },

  imageWrapper: {
    minWidth: "210px",
    width: "210px",
    height: "210px",
    borderRadius: "22px",
    overflow: "hidden",
    flexShrink: 0,
  },

  cardImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "0.45s ease",
  },

  cardContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    padding: "6px 0",
    gap: "8px",
  },

  projectNumber: {
    fontSize: "22px",
    color: "#11306D",
    fontWeight: "600",
  },

  cardTitle: {
    fontSize: "31px",
    color: "#0F172A",
    fontWeight: "700",
    lineHeight: "1.25",
    margin: "10px 0 12px",
  },

  cardDescription: {
    fontSize: "15px",
    color: "#64748B",
    lineHeight: "1.8",
    maxWidth: "95%",
    margin: 0,
  },

  readBtn: {
    width: "160px",
    padding: "13px 20px",
    backgroundColor: "#11306D",
    border: "none",
    borderRadius: "12px",
    color: "#FFFFFF",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "auto",
  },

  detailsContainer: {
    width: "100%",
    minHeight: "78vh",
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
    borderRadius: "30px",
    objectFit: "cover",
    boxShadow: "0 12px 35px rgba(15,23,42,0.08)",
  },

  detailsRight: {
    width: "100%",
  },

  detailsNumber: {
    fontSize: "22px",
    color: "#11306D",
    fontWeight: "600",
  },

  detailsTitle: {
    fontSize: "clamp(38px,4vw,60px)",
    color: "#11306D",
    fontWeight: "800",
    lineHeight: "1.15",
    marginTop: "14px",
    marginBottom: "24px",
  },

  detailsDescription: {
    fontSize: "17px",
    color: "#475569",
    lineHeight: "2",
    marginBottom: "35px",
  },

  backBtn: {
    padding: "14px 28px",
    backgroundColor: "#11306D",
    border: "none",
    borderRadius: "12px",
    color: "#FFFFFF",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },

};

export default Projects;