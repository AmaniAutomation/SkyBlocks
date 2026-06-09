import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

const NAVBAR_HEIGHT = 80;

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password,
    });

    if (error) {
      // Check if the user is not found/not registered
      if (error.message.includes("Invalid login credentials")) {
        setErrorMsg("Account not found. It looks like you're not registered yet. Please Sign Up first.");
      } else if (error.message.includes("Email not confirmed")) {
        setErrorMsg("Email not verified. Please check your inbox for the confirmation link.");
      } else {
        setErrorMsg(error.message);
      }
    } else {
      // Direct navigation to Dashboard upon success
      navigate("/dashboard");
    }

    setLoading(false);
  };

  const handleSocialLogin = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: { redirectTo: window.location.origin + "/dashboard" }
    });
    if (error) setErrorMsg(error.message);
  };

  return (
    <div style={styles.page}>
      <div style={styles.blurOne} /><div style={styles.blurTwo} />

      <button style={styles.backHome} onClick={() => navigate("/")}>
        ← Back to Home
      </button>

      <div className="auth-card-container" style={styles.container}>
        
        {/* LEFT BLUE PANEL */}
        <div className="login-blue-side" style={styles.infoPanel}>
          <div style={styles.infoContent}>
            <div style={styles.badge}>
              <span style={styles.badgeLine} />
              <span style={styles.badgeText}>AMANI AUTOMATION</span>
            </div>

            <h1 style={styles.heading}>
              Access Your <br />
              <span style={styles.headingHighlight}>Innovation Hub.</span>
            </h1>

            <p style={styles.description}>
              Continue to your robotics, automation, drone systems, and engineering workspace.
            </p>

            <div style={styles.featureContainer}>
              <div style={styles.featureBox}>Smart Robotics</div>
              <div style={styles.featureBox}>Drone Systems</div>
              <div style={styles.featureBox}>Automation</div>
            </div>
          </div>
        </div>

        {/* RIGHT WHITE PANEL */}
        <div className="login-white-side" style={styles.formPanel}>
          <div style={styles.formWrapper}>
            <div className="form-content-fade">
              <h2 style={styles.title}>Sign In</h2>
              <p style={styles.subText}>Welcome back! Please enter your details.</p>

              <div style={styles.socialGroup}>
                <button className="social-btn" style={styles.socialButton} onClick={() => handleSocialLogin('google')}>
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="" style={styles.socialIcon} />
                  Continue with Google
                </button>

                <button className="social-btn" style={styles.socialButton} onClick={() => handleSocialLogin('github')}>
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="" style={styles.socialIcon} />
                  Continue with GitHub
                </button>
              </div>

              <div style={styles.divider}>
                <div style={styles.line}></div>
                <span style={styles.dividerText}>OR</span>
                <div style={styles.line}></div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address</label>
                <input
                  type="email"
                  style={styles.input}
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <div style={styles.passWrapper}>
                  <input
                    type={showPass ? "text" : "password"}
                    style={styles.input}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span style={styles.eyeIcon} onClick={() => setShowPass(!showPass)}>
                    {showPass ? "👁️" : "👁️‍🗨️"}
                  </span>
                </div>
              </div>

              {/* DYNAMIC ERROR MESSAGE */}
              {errorMsg && (
                <div style={styles.errorContainer}>
                   <p style={styles.warningText}>{errorMsg}</p>
                </div>
              )}

              <button className="primary-btn" style={styles.primaryBtn} onClick={handleLogin} disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </button>

              <p style={styles.footerText}>
                Don't have an account? <Link to="/signup" style={styles.toggleLink}>Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .auth-card-container { display: flex; flex-direction: row; }
        .login-blue-side { animation: slideFromRight 0.8s cubic-bezier(0.7, 0, 0.3, 1) forwards; }
        .login-white-side { animation: slideFromLeft 0.8s cubic-bezier(0.7, 0, 0.3, 1) forwards; }
        @keyframes slideFromRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); } }
        @keyframes slideFromLeft { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        .form-content-fade { animation: fadeIn 1s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .primary-btn { transition: all 0.3s ease; border: none; cursor: pointer; }
        .primary-btn:hover { background-color: #1e4ba3 !important; transform: translateY(-2px); box-shadow: 0 10px 20px rgba(17,48,109,0.2); color: white !important; }
        .social-btn { transition: all 0.3s ease; border: 1.5px solid #E2E8F0; background: white; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 12px; }
        .social-btn:hover { background-color: #f8fafc !important; border-color: #11306D !important; transform: translateY(-1px); }
        input:focus { border-color: #11306D !important; outline: none; box-shadow: 0 0 0 4px rgba(17, 48, 109, 0.08); background: white !important; }
      `}</style>
    </div>
  );
}

const styles = {
  page: { width: "100%", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#F8FAFC", paddingBottom: "100px", position: "relative", overflow: "hidden", fontFamily: "'Inter', sans-serif" },
  container: { width: "1080px", height: "720px", backgroundColor: "#fff", borderRadius: "32px", display: "flex", overflow: "hidden", boxShadow: "0 40px 100px -20px rgba(0,0,0,0.15)", border: "1px solid #E2E8F0", position: "relative", marginTop: "-60px" },
  backHome: { position: "absolute", top: "40px", left: "40px", background: "none", border: "none", color: "#11306D", fontWeight: "700", cursor: "pointer", fontSize: "14px" },
  infoPanel: { width: "50%", height: "100%", background: "linear-gradient(135deg, #0F172A 0%, #11306D 100%)", color: "#FFFFFF", display: "flex", alignItems: "center", padding: "60px", zIndex: 10 },
  infoContent: { width: "100%" },
  badge: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" },
  badgeLine: { width: "30px", height: "2px", backgroundColor: "#3B82F6" },
  badgeText: { fontSize: "11px", fontWeight: "800", letterSpacing: "2px", color: "white" },
  heading: { fontSize: "42px", fontWeight: "900", lineHeight: "1.1", marginBottom: "20px" },
  headingHighlight: { fontWeight: "300", opacity: 0.8 },
  description: { fontSize: "16px", lineHeight: "1.7", color: "rgba(255,255,255,0.82)", marginBottom: "35px" },
  featureContainer: { display: "flex", gap: "12px", flexWrap: "wrap" },
  featureBox: { padding: "10px 18px", borderRadius: "12px", backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", fontSize: "13px", fontWeight: "600" },
  formPanel: { width: "50%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px", backgroundColor: "#FFFFFF" },
  formWrapper: { width: "100%", maxWidth: "380px" },
  title: { fontSize: "34px", fontWeight: "900", color: "#0F172A", marginBottom: "10px" },
  subText: { color: "#64748B", marginBottom: "35px", fontSize: "14px" },
  socialGroup: { display: "flex", flexDirection: "column", gap: "12px", marginBottom: "25px" },
  socialButton: { width: "100%", padding: "14px", borderRadius: "12px", fontSize: "14px", fontWeight: "600", color: "#334155" },
  socialIcon: { width: "20px", height: "20px", objectFit: "contain" },
  divider: { display: "flex", alignItems: "center", gap: "15px", marginBottom: "25px" },
  line: { flex: 1, height: "1.5px", background: "#E2E8F0" },
  dividerText: { fontSize: "12px", color: "#94A3B8", fontWeight: "700" },
  inputGroup: { marginBottom: "18px" },
  label: { display: "block", marginBottom: "8px", fontSize: "13px", fontWeight: "700", color: "#334155" },
  input: { width: "100%", padding: "14px", borderRadius: "12px", border: "1.5px solid #E2E8F0", backgroundColor: "#F8FAFC", fontSize: "15px", transition: "0.2s" },
  passWrapper: { position: "relative", display: "flex", alignItems: "center", width: "100%" },
  eyeIcon: { position: "absolute", right: "15px", cursor: "pointer", fontSize: "18px", opacity: 0.6, userSelect: 'none' },
  primaryBtn: { width: "100%", padding: "16px", background: "#11306D", color: "#FFFFFF", borderRadius: "12px", fontWeight: "800", fontSize: "16px" },
  
  errorContainer: { backgroundColor: "rgba(217, 48, 37, 0.05)", padding: "12px", borderRadius: "8px", marginBottom: "15px", borderLeft: "4px solid #D93025" },
  warningText: { color: "#D93025", fontSize: "12px", fontWeight: "600", textAlign: 'left', lineHeight: "1.4" },
  
  footerText: { marginTop: "25px", textAlign: "center", color: "#64748B", fontSize: "13px" },
  toggleLink: { color: "#11306D", fontWeight: "800", cursor: "pointer", textDecoration: "none", borderBottom: "2px solid #11306D" },
  blurOne: { position: "absolute", top: "-100px", left: "-100px", width: "500px", height: "500px", background: "rgba(17,48,109,0.05)", borderRadius: "50%", filter: "blur(100px)" },
  blurTwo: { position: "absolute", bottom: "-100px", right: "-100px", width: "400px", height: "400px", background: "rgba(59,130,246,0.05)", borderRadius: "50%", filter: "blur(100px)" },
};

export default Login;