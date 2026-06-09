import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import logo from "../assets/logo.png";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";
  if (isAuthPage) return null;

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Products", path: "/products" },
    { name: "Gallery", path: "/gallery" },
  ];

  const renderAvatarContent = (isLarge = false) => {
    const avatarUrl = user?.user_metadata?.avatar_url;
    const initial = user?.email?.charAt(0).toUpperCase();

    if (avatarUrl) {
      return <img src={avatarUrl} style={styles.avatarImage} alt="Profile" />;
    }
    return initial;
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.limitContainer}>
        <Link to="/" style={styles.logoContainer}>
          <img src={logo} alt="Amani Logo" style={styles.logo} />
        </Link>

        <ul style={styles.navLinks}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name} style={styles.navLi}>
                <Link
                  to={item.path}
                  className={`nav-item-link ${isActive ? "active" : ""}`}
                  style={{ ...styles.link, color: isActive ? "#11306D" : "#64748B" }}
                >
                  {item.name}
                  <div className="underline-bar" />
                </Link>
              </li>
            );
          })}
        </ul>

        <div style={styles.buttonGroup}>
          {!user ? (
            <>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <button className="nav-btn-secondary" style={styles.loginBtn}>Log In</button>
              </Link>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <button className="nav-btn-primary" style={styles.signupBtn}>Sign Up</button>
              </Link>
            </>
          ) : (
            <div
              ref={profileRef}
              style={{ position: "relative", marginLeft: "8px", padding: "5px 0" }}
            >
              <div
                className="dashboard-avatar"
                style={styles.avatar}
                onClick={() => setShowProfileMenu((prev) => !prev)}
              >
                {renderAvatarContent()}
              </div>

              {showProfileMenu && (
                <div style={styles.profileDropdown}>
                  <div style={styles.profileHeader}>
                    <div style={styles.largeAvatar}>
                      {renderAvatarContent(true)}
                    </div>
                    <h3 style={styles.profileName}>{user.user_metadata?.first_name || user.email.split("@")[0]}</h3>
                    <p style={styles.profileEmail}>{user.email}</p>
                    
                    <button
                      style={styles.manageBtn}
                      onClick={() => {
                        navigate("/dashboard", { state: { activeTab: "Manage Account" } });
                        setShowProfileMenu(false);
                      }}
                    >
                      Manage AMANI Account
                    </button>
                  </div>

                  <div style={styles.menuDivider} />

                  <button
                    style={styles.menuItem}
                    onClick={() => {
                      navigate("/dashboard");
                      setShowProfileMenu(false);
                    }}
                  >
                    🏠 My Dashboard
                  </button>

                  <button 
                    style={styles.menuItem}
                    onClick={() => {
                      navigate("/dashboard", { state: { activeTab: "My Orders" } });
                      setShowProfileMenu(false);
                    }}
                  >
                    📦 My Orders
                  </button>

                  <button
                    style={{ ...styles.menuItem, color: "#D93025", fontWeight: "600" }}
                    onClick={async () => {
                      await supabase.auth.signOut();
                      window.location.reload();
                    }}
                  >
                    → Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .nav-item-link { position: relative; text-decoration: none; transition: color 0.3s ease; padding: 8px 0; font-weight: 500; }
        .underline-bar { position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background-color: #11306D; opacity: 0; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); border-radius: 10px; }
        .nav-item-link:hover .underline-bar { width: 100%; opacity: 0.3; }
        .nav-item-link.active .underline-bar { width: 100%; opacity: 1; height: 3.5px; }
        .nav-item-link:hover { color: #11306D !important; }
        .nav-btn-secondary:hover { background: #f8fafc !important; transform: translateY(-1px); }
        .nav-btn-primary:hover { background: #1e4ba3 !important; transform: translateY(-1px); box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
        .dashboard-avatar { transition: filter 0.2s ease; cursor: pointer; overflow: hidden; }
        .dashboard-avatar:hover { filter: brightness(1.1); }
        button { transition: all 0.2s ease !important; cursor: pointer; }
      `}</style>
    </nav>
  );
}

const styles = {
  nav: { width: "100%", height: "80px", backgroundColor: "#FFFFFF", display: "flex", justifyContent: "center", alignItems: "center", position: "fixed", top: 0, left: 0, zIndex: 1000, boxShadow: "0 2px 15px rgba(0,0,0,0.05)", boxSizing: "border-box", fontFamily: "'Inter', sans-serif" },
  limitContainer: { width: "100%", maxWidth: "1300px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 5%" },
  logoContainer: { display: "flex", alignItems: "center", textDecoration: "none" },
  logo: { height: "45px" },
  navLinks: { display: "flex", gap: "40px", listStyle: "none", margin: 0, padding: 0 },
  navLi: { display: "flex", alignItems: "center" },
  link: { fontSize: "15px" },
  buttonGroup: { display: "flex", gap: "15px", alignItems: "center" },
  loginBtn: { padding: "10px 24px", border: "1px solid #11306D", background: "none", color: "#11306D", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "600" },
  signupBtn: { padding: "10px 24px", border: "none", background: "#11306D", color: "#fff", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "600" },
  avatar: { width: "36px", height: "36px", backgroundColor: "#00897b", color: "#FFFFFF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: "500", cursor: "pointer", boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.05)", overflow: "hidden" },
  avatarImage: { width: "100%", height: "100%", objectFit: "cover" },
  profileDropdown: { position: "absolute", top: "50px", right: 0, width: "320px", background: "#fff", borderRadius: "24px", boxShadow: "0 12px 40px rgba(0,0,0,0.15)", padding: "24px", zIndex: 9999 },
  profileHeader: { display: "flex", flexDirection: "column", alignItems: "center" },
  largeAvatar: { width: "70px", height: "70px", borderRadius: "50%", background: "#00897b", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", fontWeight: "600", marginBottom: "14px", overflow: "hidden" },
  profileName: { margin: 0, fontSize: "20px", fontWeight: "700", color: "#1F2937" },
  profileEmail: { marginTop: "5px", color: "#64748B", fontSize: "14px" },
  manageBtn: { marginTop: "16px", width: "100%", padding: "10px", borderRadius: "999px", border: "1px solid #CBD5E1", background: "#fff", cursor: "pointer", fontWeight: "600", fontSize: "13px", color: "#11306D" },
  menuDivider: { height: "1px", background: "#E2E8F0", margin: "15px 0" },
  menuItem: { width: "100%", padding: "10px", border: "none", background: "transparent", textAlign: "left", cursor: "pointer", fontSize: "14px", color: "#475569" },
};

export default Navbar;