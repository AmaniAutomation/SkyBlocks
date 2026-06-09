import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

const NAVBAR_HEIGHT = 80;

function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState("");
  const [otp, setOtp] = useState("");
  
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", password: "", confirmPassword: "",
    accountType: "", agreePrivacy: false, agreeNews: false, agreeGuidelines: false
  });

  const [errors, setErrors] = useState({ firstName: "", lastName: "", email: "" });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    let interval;
    if (step === 3 && timer > 0) {
      interval = setInterval(() => { setTimer((prev) => prev - 1); }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    if (name === "firstName" || name === "lastName") {
      const nameRegex = /^[a-zA-Z\s]*$/;
      if (!nameRegex.test(value)) {
        setErrors(prev => ({ ...prev, [name]: "Only letters allowed" }));
        return; 
      } else {
        setErrors(prev => ({ ...prev, [name]: "" }));
      }
    }

    if (name === "email") {
      setErrors(prev => ({ ...prev, email: value.includes("@") ? "" : "Invalid email" }));
    }

    setFormData(prev => ({ ...prev, [name]: val }));
    setWarning(""); 
  };

  const isStep1Valid = formData.firstName && formData.lastName && !errors.firstName && !errors.lastName && formData.email.includes("@") && formData.password === formData.confirmPassword && formData.password.length >= 6;
  const isStep2Valid = formData.accountType !== "" && formData.agreePrivacy && formData.agreeNews && formData.agreeGuidelines;

  const handleNextStep1 = async () => {
    setLoading(true);
    setWarning("");
    
    const { error } = await supabase.auth.signUp({
      email: formData.email.trim(),
      password: formData.password,
    });

    if (error) {
      if (error.message.toLowerCase().includes("already registered") || error.status === 400) {
        setWarning("Already registered. Please Sign In.");
      } else {
        setStep(2); 
      }
    } else {
      setStep(2);
    }
    setLoading(false);
  };

  const handleRequestOtp = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: formData.email.trim(),
      options: {
        shouldCreateUser: false, 
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          account_type: formData.accountType,
        },
      },
    });

    if (error) setWarning(error.message);
    else { setTimer(60); setCanResend(false); setStep(3); }
    setLoading(false);
  };

  const handleVerifyAndDashboard = async () => {
    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({
      email: formData.email.trim(),
      token: otp,
      type: "email",
    });

    if (error) setWarning("Invalid OTP code.");
    else navigate("/dashboard");
    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.blurOne} /><div style={styles.blurTwo} />
      <button style={styles.backHome} onClick={() => navigate("/")}>← Back to Home</button>

      <div className="auth-card-container" style={styles.container}>
        <div className="signup-white-side" style={styles.formPanel}>
          <div style={styles.scrollArea}>
            <div style={styles.formContentWrapper}>
                <div style={styles.stepInd}>Step {step} of 3</div>
                
                {step === 1 && (
                  <div className="fade">
                    <h2 style={styles.title}>General Info</h2>
                    <div style={styles.nameRow}>
                      <div style={styles.inputGroupHalf}>
                        <label style={styles.label}>First Name</label>
                        <input name="firstName" style={styles.input} placeholder="John" value={formData.firstName} onChange={handleChange}/>
                        {errors.firstName && <span style={styles.errorTextSmall}>{errors.firstName}</span>}
                      </div>
                      <div style={styles.inputGroupHalf}>
                        <label style={styles.label}>Last Name</label>
                        <input name="lastName" style={styles.input} placeholder="Doe" value={formData.lastName} onChange={handleChange}/>
                        {errors.lastName && <span style={styles.errorTextSmall}>{errors.lastName}</span>}
                      </div>
                    </div>
                    
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Email Address</label>
                      <input name="email" type="email" style={styles.input} placeholder="name@email.com" value={formData.email} onChange={handleChange}/>
                      
                      {warning && <p style={styles.warningEmail}>{warning}</p>}
                      {errors.email && !warning && <span style={styles.errorTextSmall}>{errors.email}</span>}
                    </div>

                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Password</label>
                      <div style={styles.passWrapper}>
                        <input name="password" type={showPass ? "text" : "password"} style={styles.input} placeholder="••••••••" value={formData.password} onChange={handleChange}/>
                        <span style={styles.eyeIcon} onClick={() => setShowPass(!showPass)}>👁</span>
                      </div>
                    </div>

                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Confirm Password</label>
                      <div style={styles.passWrapper}>
                        <input name="confirmPassword" type={showConfirmPass ? "text" : "password"} style={styles.input} placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange}/>
                        <span style={styles.eyeIcon} onClick={() => setShowConfirmPass(!showConfirmPass)}>👁</span>
                      </div>
                      {formData.confirmPassword && (
                        <p style={formData.password === formData.confirmPassword ? styles.successText : styles.errorTextSmall}>
                          {formData.password === formData.confirmPassword ? "✓ Password matched" : "✖ Password not matched"}
                        </p>
                      )}
                    </div>
                    <button 
                      className="primary-btn" 
                      style={!isStep1Valid || loading ? styles.disabledBtn : styles.primaryBtn} 
                      onClick={handleNextStep1} 
                      disabled={!isStep1Valid || loading}
                    >
                      {loading ? "Checking..." : "Next"}
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div className="fade">
                    <h2 style={styles.title}>Account Details</h2>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Account Type</label>
                      <select name="accountType" style={styles.input} value={formData.accountType} onChange={handleChange}>
                        <option value="">Select Type</option>
                        <option value="individual">Individual</option>
                        <option value="business">Business</option>
                      </select>
                    </div>

                    <div style={styles.checkboxArea}>
                      <label style={styles.checkLabel}><input name="agreePrivacy" type="checkbox" onChange={handleChange} /> I accept the Privacy Policy</label>
                      <label style={styles.checkLabel}><input name="agreeNews" type="checkbox" onChange={handleChange} /> Accept letters and mails</label>
                      <label style={styles.checkLabel}><input name="agreeGuidelines" type="checkbox" onChange={handleChange} /> I agree to the Guidelines</label>
                    </div>
                    <div style={{ display: "flex", gap: "15px" }}>
                      <button className="back-btn" onClick={() => setStep(1)} style={styles.backBtnStyle}>Back</button>
                      <button className="primary-btn" style={!isStep2Valid || loading ? styles.disabledBtn : { ...styles.primaryBtn, flex: 2 }} onClick={handleRequestOtp} disabled={!isStep2Valid || loading}>
                        {loading ? "Sending..." : "Get OTP"}
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="fade" style={{textAlign: "center"}}>
                    <h2 style={styles.title}>Verify OTP</h2>
                    <p style={styles.subText}>OTP sent to <b>{formData.email}</b></p>
                    <input maxLength="6" style={{...styles.input, textAlign: 'center', fontSize: '28px', letterSpacing: '12px', height: '65px', marginBottom: '10px'}} placeholder="000000" value={otp} onChange={(e) => setOtp(e.target.value)} />
                    <div style={{ marginBottom: "20px" }}>
                      {timer > 0 ? (
                        <p style={{ fontSize: "13px", color: "#64748B" }}>Resend in <span style={{ fontWeight: "700", color: "#11306D" }}>0:{timer < 10 ? `0${timer}` : timer}</span></p>
                      ) : (
                        <p style={{ fontSize: "14px", color: "#11306D", fontWeight: "700", cursor: "pointer", textDecoration: "underline" }} onClick={handleRequestOtp}>Resend OTP</p>
                      )}
                    </div>
                    <button className="primary-btn" style={styles.primaryBtn} onClick={handleVerifyAndDashboard} disabled={loading}>Verify & Enter Dashboard</button>
                  </div>
                )}

                <p style={styles.footerText}>Already have an account? <Link to="/login" style={styles.toggleLink}>Sign In</Link></p>
            </div>
          </div>
        </div>

        <div className="signup-blue-side" style={styles.infoPanel}>
          <div style={styles.infoContent}>
            <div style={styles.badge}>AMANI AUTOMATION</div>
            <h1 style={styles.heading}>Build The Future <br />With Smart Innovation.</h1>
            <p style={styles.desc}>Join our ecosystem of advanced robotics and intelligent automation platforms.</p>
          </div>
        </div>
      </div>
      
      <style>{`
        .signup-white-side { animation: slideFromRight 0.8s cubic-bezier(0.7, 0, 0.3, 1) forwards; }
        .signup-blue-side { animation: slideFromLeft 0.8s cubic-bezier(0.7, 0, 0.3, 1) forwards; }
        @keyframes slideFromRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes slideFromLeft { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        .primary-btn:hover:not(:disabled) { background-color: #1e4ba3 !important; transform: translateY(-2px); color: white !important; }
        .back-btn:hover { background-color: #f8fafc !important; border-color: #11306D !important; }
      `}</style>
    </div>
  );
}

const styles = {
  page: { width: "100%", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#F8FAFC", paddingBottom: "100px", position: "relative", overflow: "hidden", fontFamily: "'Inter', sans-serif" },
  container: { width: "1080px", height: "720px", backgroundColor: "#fff", borderRadius: "32px", display: "flex", overflow: "hidden", boxShadow: "0 40px 100px -20px rgba(0,0,0,0.15)", border: "1px solid #E2E8F0", position: "relative", marginTop: "-60px" },
  backHome: { position: "absolute", top: "40px", left: "40px", background: "none", border: "none", color: "#11306D", fontWeight: "700", cursor: "pointer", fontSize: "14px" },
  formPanel: { width: "55%", height: "100%", backgroundColor: "#FFFFFF", display: "flex", flexDirection: "column", zIndex: 10 },
  scrollArea: { width: "100%", height: "100%", overflowY: "auto", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 0" },
  formContentWrapper: { width: "100%", maxWidth: "450px", margin: "0 auto", padding: "0 20px" },
  infoPanel: { width: "45%", height: "100%", background: "linear-gradient(135deg, #0F172A 0%, #11306D 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF", padding: "50px", zIndex: 5 },
  infoContent: { width: "100%" },
  badge: { fontSize: "11px", fontWeight: "800", letterSpacing: "2px", marginBottom: "20px", color: "#3B82F6" },
  heading: { fontSize: "40px", fontWeight: "900", lineHeight: "1.1", marginBottom: "24px", color: "white" },
  desc: { opacity: 0.8, lineHeight: "1.7", marginBottom: "30px", fontSize: "16px", color: "white" },
  label: { display: "block", marginBottom: "8px", fontSize: "13px", fontWeight: "700", color: "#334155", width: "100%" },
  input: { width: "100%", padding: "14px", borderRadius: "12px", border: "1.5px solid #E2E8F0", backgroundColor: "#F8FAFC", fontSize: "14px", outline: "none" },
  nameRow: { display: "flex", gap: "25px", marginBottom: "22px" },
  inputGroupHalf: { flex: 1, display: "flex", flexDirection: "column" },
  inputGroup: { marginBottom: "18px", position: "relative", width: "100%" },
  passWrapper: { position: "relative", display: "flex", alignItems: "center", width: "100%" },
  eyeIcon: { position: "absolute", right: "15px", cursor: "pointer", fontSize: "18px", zIndex: 10, userSelect: "none" },
  errorTextSmall: { color: "#D93025", fontSize: "11px", fontWeight: "600", marginTop: "4px" },
  warningEmail: { color: "#D93025", fontSize: "11px", fontWeight: "700", marginTop: "4px", borderLeft: '3px solid #D93025', paddingLeft: '8px' },
  successText: { color: "#1e8e3e", fontSize: "11px", fontWeight: "600", marginTop: "4px" },
  checkboxArea: { marginBottom: "20px", display: "flex", flexDirection: "column", gap: "10px" },
  checkLabel: { fontSize: "12px", color: "#64748B", display: "flex", gap: "10px", alignItems: "center", cursor: "pointer" },
  primaryBtn: { width: "100%", padding: "16px", background: "#11306D", color: "#FFFFFF", borderRadius: "12px", fontWeight: "800", fontSize: "16px", border: "none", cursor: 'pointer' },
  disabledBtn: { width: "100%", padding: "16px", background: "#11306D", color: "#FFFFFF", borderRadius: "12px", fontWeight: "800", fontSize: "16px", border: "none", opacity: 0.4, cursor: 'not-allowed' },
  backBtnStyle: { flex: 1, padding: "14px", border: "1.5px solid #E2E8F0", background: "none", borderRadius: "12px", color: "#64748B", fontWeight: "700", cursor: 'pointer' },
  footerText: { marginTop: "20px", textAlign: "center", color: "#64748B", fontSize: "13px" },
  toggleLink: { color: "#11306D", fontWeight: "800", cursor: "pointer", textDecoration: "none", borderBottom: '2px solid #11306D' },
  stepInd: { fontSize: "11px", fontWeight: "800", color: "#11306D", letterSpacing: "1px", marginBottom: "8px" },
  title: { fontSize: "32px", fontWeight: "900", color: "#0F172A", marginBottom: "15px" },
  subText: { fontSize: "15px", color: "#64748B", marginBottom: "20px" },
  blurOne: { position: "absolute", top: "-100px", left: "-100px", width: "400px", height: "400px", background: "rgba(17,48,109,0.05)", borderRadius: "50%", filter: "blur(100px)" },
  blurTwo: { position: "absolute", bottom: "-100px", right: "-100px", width: "400px", height: "400px", background: "rgba(59,130,246,0.05)", borderRadius: "50%", filter: "blur(100px)" },
};

export default Signup;