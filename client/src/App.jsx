import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div
      style={{
        backgroundColor: "#f8fbff",
        minHeight: "100vh",
        overflowX: "hidden",
        margin: 0,
        padding: 0,
        fontFamily: "sans-serif",
      }}
    >
      <Navbar />

      <AppRoutes />

      <Footer />
    </div>
  );
}

export default App;