import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Page Imports
import Home from "../pages/Home";
import Services from "../pages/Services";
import Projects from "../pages/Projects";
import Products from "../pages/Products";
import Gallery from "../pages/Gallery";
import Login from "../pages/Login";
import Signup from "../pages/Signup"; 
import Dashboard from "../pages/Dashboard";

function AppRoutes() {
  const { pathname } = useLocation();

  // SCROLL TO TOP FIX
  // This ensures that when you navigate (e.g., from Home to Signup), 
  // you don't start at the bottom of the page.
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", 
    });
  }, [pathname]);

  return (
    <Routes>
      {/* Main Navigation Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/products" element={<Products />} />
      <Route path="/gallery" element={<Gallery />} />
      
      {/* Authentication Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* User Dashboard Route */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* 
         CRITICAL FIX: The '*' route must be the LAST route. 
         This redirects any invalid URL back to the Home page.
      */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default AppRoutes;