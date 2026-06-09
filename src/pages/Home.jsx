import Hero from "../sections/Hero";
import About from "../sections/About";
import Certifications from "../sections/Certifications";

function Home() {
  return (
    <div
      style={{
        backgroundColor: "#020617",
        minHeight: "100vh",
        overflowX: "hidden",
        margin: 0,
        padding: 0,
        fontFamily: "sans-serif",
      }}
    >
      <Hero />

      <About />

      <Certifications />
    </div>
  );
}

export default Home;