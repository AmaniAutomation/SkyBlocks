import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../supabase";
import BlockCoding from "../components/BlockCoding";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);
  const photoMenuRef = useRef(null);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Tutorials");
  const [manageSubTab, setManageSubTab] = useState("Home");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Security & Password States
  const [currentPasswordCheck, setCurrentPasswordCheck] = useState("");
  const [isPassVerified, setIsPassVerified] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");

  // UI State for the Confirmation Message
  const [linkSentMode, setLinkSentMode] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showPhotoMenu, setShowPhotoMenu] = useState(false);

  useEffect(() => {
    fetchUser();

    // ✅ DETECT EMAIL BUTTON CLICK:
    // When the user clicks "Confirm" in their mail, Supabase redirects them here.
    // This listener detects that they came from a recovery email and unlocks the form.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        setActiveTab("Manage Account");
        setManageSubTab("Security");
        setIsPassVerified(true); // Direct unlock
        setLinkSentMode(false);
      }
    });

    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
      if (location.state.activeTab === "Manage Account") {
        setManageSubTab("Home");
      }
    }

    const handleOutsideClick = (event) => {
      if (photoMenuRef.current && !photoMenuRef.current.contains(event.target)) {
        setShowPhotoMenu(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    
    return () => {
      subscription.unsubscribe();
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [location.state]);

  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) navigate("/login");
    else {
      setUser(user);
      setFirstName(user.user_metadata?.first_name || "");
      setLastName(user.user_metadata?.last_name || "");
      setAvatarUrl(user.user_metadata?.avatar_url || null);
    }
    setLoading(false);
  };

  const handleBack = () => {
    if (activeTab === "Manage Account") {
      if (manageSubTab !== "Home") {
        setManageSubTab("Home");
        setIsPassVerified(false);
        setLinkSentMode(false);
      } else {
        setActiveTab("Tutorials");
      }
    }
  };

  const handleVerifyCurrentPassword = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPasswordCheck,
    });
    if (error) alert("Incorrect current password.");
    else setIsPassVerified(true);
    setLoading(false);
  };

  // ✅ SEND EMAIL: This triggers the email that contains the "Confirm" button
  const sendResetLink = async () => {
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(
      user.email,
      {
        // This MUST point to your dashboard URL
        redirectTo: `${window.location.origin}/dashboard`
      }
    );

    setLoading(false);
    if (error) {
      alert(error.message);
    } else {
      setLinkSentMode(true); // Display "Confirmation mail is sent..." screen
    }
  };

  const handleUpdatePassword = async () => {
    if (newPass !== confirmNewPass) return alert("Passwords do not match");
    if (newPass.length < 6) return alert("Min 6 characters required");
    
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPass });
    setLoading(false);

    if (error) alert(error.message);
    else {
      alert("Password updated successfully.");
      setIsPassVerified(false);
      setNewPass("");
      setConfirmNewPass("");
      setCurrentPasswordCheck("");
    }
  };

  const handleSaveDetails = async () => {
    const { error } = await supabase.auth.updateUser({
      data: { first_name: firstName, last_name: lastName }
    });
    if (error) alert(error.message);
    else { setIsEditing(false); alert("Changes saved."); }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      setLoading(true);
      const filePath = `${user.id}-${Date.now()}`;
      await supabase.storage.from('avatars').upload(filePath, file);
      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);
      await supabase.auth.updateUser({ data: { avatar_url: publicUrl } });
      setAvatarUrl(publicUrl);
    } catch (err) { alert(err.message); }
    finally { setLoading(false); }
  };

  const handleRemovePhoto = async () => {
    const { error } = await supabase.auth.updateUser({ data: { avatar_url: null } });
    if (error) alert(error.message);
    else setAvatarUrl(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const userInitial = user?.email?.charAt(0).toUpperCase() || "P";

  if (loading && !user) return <div style={styles.loader}>Loading...</div>;

  return (
    <div style={styles.dashboardWrapper}>
      <div style={styles.menuTrigger} onMouseEnter={() => setIsSidebarOpen(true)}>
        <div style={styles.hamburger}>
          <div style={styles.bar}></div><div style={styles.bar}></div><div style={styles.bar}></div>
        </div>
      </div>

      <aside style={{...styles.sidebar, transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)"}} onMouseEnter={() => setIsSidebarOpen(true)} onMouseLeave={() => setIsSidebarOpen(false)}>
        <div style={styles.sidebarHeader}><div style={styles.logoCircle}>A</div><span style={styles.logoText}>AMANI</span></div>
        <nav style={styles.navMenu}>
          {["Tutorials", "Missions", "Block Coding", "My Orders"].map((item) => (
            <div key={item} onClick={() => { setActiveTab(item); setIsSidebarOpen(false); }} className="dashboard-nav-item" style={{...styles.navItem, ...(activeTab === item ? styles.navActive : {})}}>
               <span style={{marginRight: '12px'}}>{item === "Block Coding" ? "🧩" : item === "Missions" ? "🚀" : item === "My Orders" ? "📦" : "📚"}</span> {item}
            </div>
          ))}
        </nav>
        <div style={styles.moreSection}>
          <div style={styles.moreTrigger} onMouseEnter={() => setShowMoreMenu(true)} onMouseLeave={() => setShowMoreMenu(false)}>
            <span>👤 Account</span>
            {showMoreMenu && (
              <div style={styles.dropdownMenu}>
                <div style={styles.dropdownItem} onClick={() => { setActiveTab("Manage Account"); setManageSubTab("Home"); setIsSidebarOpen(false); setShowMoreMenu(false); }}>👤 Manage Account</div>
                <div style={{...styles.dropdownItem, color: '#ef4444'}} onClick={handleLogout}>Logout</div>
              </div>
            )}
          </div>
        </div>
      </aside>

      <main style={styles.mainContent}>
        {activeTab !== "Manage Account" && <h1 style={styles.welcomeText}>{activeTab}</h1>}

        {activeTab === "Manage Account" ? (
          <div style={styles.googleLayout}>
            <div style={styles.backBtnRow}><button style={styles.gBackBtn} onClick={handleBack}>← Back</button></div>
            <div style={styles.googleSidebar}>
               <div onClick={() => setManageSubTab("Home")} style={{...styles.gNavItem, ...(manageSubTab === "Home" ? styles.gNavActive : {})}}>🏠 Home</div>
               <div onClick={() => setManageSubTab("Personal")} style={{...styles.gNavItem, ...(manageSubTab === "Personal" ? styles.gNavActive : {})}}>👤 Personal info</div>
               <div onClick={() => setManageSubTab("Security")} style={{...styles.gNavItem, ...(manageSubTab === "Security" ? styles.gNavActive : {})}}>🔒 Security & sign-in</div>
            </div>

            <div style={styles.googleContent}>
              {manageSubTab === "Home" && (
                <div className="fade-in" style={{textAlign: 'center'}}>
                  <div style={styles.avatarWrapper} ref={photoMenuRef}>
                    <div style={styles.largeAvatar}>{avatarUrl ? <img src={avatarUrl} style={styles.avatarImg} alt="Profile" /> : userInitial}</div>
                    <div style={styles.cameraBtn} onClick={() => setShowPhotoMenu(!showPhotoMenu)}>📷</div>
                    {showPhotoMenu && (
                      <div style={styles.photoPopup}>
                        <div style={styles.photoOption} onClick={() => fileInputRef.current.click()}>📁 Choose picture</div>
                        <div style={{...styles.photoOption, color: '#d93025'}} onClick={handleRemovePhoto}>🗑 Remove photo</div>
                        <input type="file" ref={fileInputRef} style={{display:'none'}} onChange={handleFileChange} />
                      </div>
                    )}
                  </div>
                  <h1 style={styles.gHiText}>Hi, {firstName || user?.email?.split('@')[0]}!</h1>
                  <p style={styles.gEmailSub}>{user?.email}</p>
                </div>
              )}

              {manageSubTab === "Personal" && (
                <div className="fade-in">
                  <h2 style={styles.gSectionTitle}>Personal info</h2>
                  <div style={styles.gCard}>
                    <div style={styles.gFieldRow}><span style={styles.gLabel}>First Name</span><input style={styles.gInput} value={firstName} onChange={(e)=>setFirstName(e.target.value)} disabled={!isEditing} /></div>
                    <div style={styles.gFieldRow}><span style={styles.gLabel}>Last Name</span><input style={styles.gInput} value={lastName} onChange={(e)=>setLastName(e.target.value)} disabled={!isEditing} /></div>
                    <div style={styles.gFieldRow}><span style={styles.gLabel}>Email</span><span style={styles.gValueStatic}>{user?.email}</span></div>
                    <div style={styles.cardActions}>
                      {!isEditing ? <button style={styles.gActionBtn} onClick={()=>setIsEditing(true)}>Edit Details</button> : <button style={styles.gActionBtnSave} onClick={handleSaveDetails}>Save Changes</button>}
                    </div>
                  </div>
                </div>
              )}

              {manageSubTab === "Security" && (
                <div className="fade-in">
                  <h2 style={styles.gSectionTitle}>Security</h2>
                  <div style={styles.gCard}>
                    {/* View 1: Default */}
                    {!isPassVerified && !linkSentMode && (
                      <div>
                        <p style={{marginBottom: '20px', color: '#5f6368'}}>Confirm password to access security.</p>
                        <div style={styles.field}><input type="password" style={styles.fieldInput} value={currentPasswordCheck} onChange={(e)=>setCurrentPasswordCheck(e.target.value)} placeholder="Current Password" /></div>
                        <button style={styles.actionBtn} onClick={handleVerifyCurrentPassword}>Verify</button>
                        <p style={{marginTop: '20px'}}><span style={styles.forgotLink} onClick={sendResetLink}>Forgot Password?</span></p>
                      </div>
                    )}

                    {/* View 2: Message after clicking Forgot Password */}
                    {linkSentMode && !isPassVerified && (
                      <div className="fade-in" style={{textAlign: 'center'}}>
                        <h3 style={{color: '#11306D', marginBottom: '15px'}}>Confirmation link sent</h3>
                        <p style={{color: '#5f6368', fontSize: '14px', lineHeight: '1.6'}}>
                          Confirmation mail is sent to the registered mail: <br/><b>{user.email}</b>. <br/><br/>
                          Please confirm it to change the password.
                        </p>
                        <button style={{...styles.gBackBtn, marginTop: '20px'}} onClick={() => setLinkSentMode(false)}>Cancel</button>
                      </div>
                    )}

                    {/* View 3: Password Update (Unlocked by mail button click) */}
                    {isPassVerified && (
                      <div className="fade-in">
                        <h3 style={{marginBottom: '20px', color: '#11306D'}}>Update Password</h3>
                        <div style={styles.field}><input type="password" style={styles.fieldInput} placeholder="New Password" value={newPass} onChange={(e)=>setNewPass(e.target.value)} /></div>
                        <div style={styles.field}><input type="password" style={styles.fieldInput} placeholder="Confirm New Password" value={confirmNewPass} onChange={(e)=>setConfirmNewPass(e.target.value)} /></div>
                        <button style={styles.actionBtn} onClick={handleUpdatePassword}>Save Password</button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="fade-in" style={{padding: '40px'}}>
             <div style={styles.contentCard}>
               {activeTab === "Block Coding" ? <BlockCoding /> : activeTab === "My Orders" ? <p>No orders yet...</p> : <p>Loading {activeTab}...</p>}
             </div>
          </div>
        )}
      </main>

      <style>{`
        .dashboard-nav-item:hover { background-color: #F1F5F9 !important; color: #11306D !important; padding-left: 25px !important; }
        .fade-in { animation: fadeIn 0.4s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

const styles = {
  dashboardWrapper: { display: "flex", minHeight: "100vh", backgroundColor: "#F8FAFC", fontFamily: "'Inter', sans-serif" },
  sidebar: { position: "fixed", left: 0, top: 0, height: "100vh", width: "260px", backgroundColor: "#FFFFFF", padding: "40px 20px", display: "flex", flexDirection: "column", zIndex: 1050, borderRight: "1px solid #E2E8F0", transition: '0.3s' },
  sidebarHeader: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "40px" },
  logoCircle: { width: "30px", height: "30px", backgroundColor: "#11306D", color: "#fff", borderRadius: "6px", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold" },
  logoText: { fontSize: "18px", fontWeight: "800", color: "#11306D" },
  navMenu: { flex: 1 },
  navItem: { display: "flex", alignItems: "center", padding: "12px 15px", borderRadius: "8px", marginBottom: "5px", cursor: "pointer", color: "#64748B", fontSize: "14px", fontWeight: "600", transition: '0.2s' },
  navActive: { backgroundColor: "#F1F5F9", color: "#11306D", borderLeft: "4px solid #11306D" },
  moreSection: { borderTop: '1px solid #F1F5F9', paddingTop: '10px' },
  moreTrigger: { padding: '12px', color: '#11306D', cursor: 'pointer', fontWeight: '700' },
  dropdownMenu: { position: 'absolute', bottom: '60px', left: '20px', width: "180px", backgroundColor: "#fff", borderRadius: "12px", padding: "10px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", border: "1px solid #E2E8F0" },
  dropdownItem: { padding: "10px", fontSize: "13px", color: "#475569", cursor: "pointer", borderRadius: "8px" },
  mainContent: { flex: 1, padding: "120px 40px 60px" },
  welcomeText: { fontSize: "32px", fontWeight: "800", color: "#11306D", marginBottom: "20px", textAlign: 'center' },
  contentCard: { backgroundColor: "#fff", borderRadius: "20px", padding: "40px", border: "1px solid #E2E8F0", minHeight: '400px' },
  googleLayout: { display: 'flex', width: '100%', maxWidth: '1200px', margin: '0 auto', position: 'relative', flexDirection: 'column' },
  backBtnRow: { paddingLeft: '20px', marginBottom: '20px' },
  gBackBtn: { padding: "10px 20px", background: "#fff", border: "1px solid #dadce0", borderRadius: "20px", cursor: "pointer", color: "#11306D", fontWeight: "600" },
  googleSidebar: { width: '280px', padding: '20px', position: 'absolute', left: 0, top: '80px' },
  googleContent: { flex: 1, padding: '20px 60px', marginLeft: '280px' },
  gNavItem: { padding: '12px 20px', borderRadius: '30px', cursor: 'pointer', fontSize: '14px' },
  gNavActive: { backgroundColor: '#e8f0fe', color: '#1967d2', fontWeight: '600' },
  avatarWrapper: { position: 'relative', width: '90px', height: '90px', margin: '0 auto 15px' },
  largeAvatar: { width: '100%', height: '100%', backgroundColor: '#00897b', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', overflow: 'hidden' },
  avatarImg: { width: '100%', height: '100%', objectFit: 'cover' },
  cameraBtn: { position: 'absolute', bottom: 0, right: 0, width: '28px', height: '28px', backgroundColor: '#fff', border: '1px solid #dadce0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  photoPopup: { position: 'absolute', top: '100px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fff', width: '200px', borderRadius: '12px', padding: '8px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', border: '1px solid #eee', zIndex: 100 },
  photoOption: { padding: '12px', fontSize: '13px', borderRadius: '8px', cursor: 'pointer', textAlign: 'left' },
  gHiText: { fontSize: '28px', fontWeight: '400', color: '#202124' },
  gEmailSub: { color: '#5f6368', fontSize: '14px', marginBottom: '30px' },
  gSectionTitle: { fontSize: '22px', fontWeight: '400', marginBottom: '25px' },
  gCard: { border: "1px solid #dadce0", borderRadius: "12px", padding: "35px", maxWidth: "600px" },
  gFieldRow: { display: 'flex', borderBottom: '1px solid #f1f3f4', padding: '15px 0', alignItems: 'center' },
  gLabel: { width: '150px', fontSize: '12px', color: '#5f6368', fontWeight: '600' },
  gInput: { flex: 1, border: 'none', background: 'none', fontSize: '15px' },
  gValueStatic: { flex: 1, fontSize: '15px', color: '#5f6368' },
  gActionBtn: { padding: '8px 16px', background: '#11306D', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  gActionBtnSave: { padding: '8px 16px', background: '#10B981', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  cardActions: { marginTop: "20px", display: "flex", justifyContent: "flex-end" },
  fieldInput: { width: '100%', maxWidth: '400px', padding: '12px', borderRadius: '8px', border: '1px solid #dadce0' },
  actionBtn: { padding: '12px 30px', background: '#11306D', color: '#fff', borderRadius: '4px', cursor: 'pointer', fontWeight: '600', border: 'none' },
  forgotLink: { color: "#1967d2", cursor: "pointer", fontSize: "14px", textDecoration: "underline" },
  menuTrigger: { position: "fixed", top: "20px", left: "20px", zIndex: 1100, cursor: "pointer", padding: "10px", backgroundColor: "#fff", borderRadius: "50%", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" },
  hamburger: { display: "flex", flexDirection: "column", gap: "4px" },
  bar: { width: "18px", height: "2px", backgroundColor: "#11306D" },
  loader: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#11306D', fontWeight: 'bold' }
};

export default Dashboard;