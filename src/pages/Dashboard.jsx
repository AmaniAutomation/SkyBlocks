import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Block Coding"); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  
  // Account Management States
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) navigate("/login");
      else setUser(user);
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div style={styles.dashboardWrapper}>
      
      {/* MENU TRIGGER */}
      <div style={styles.menuTrigger} onMouseEnter={() => setIsSidebarOpen(true)}>
        <div style={styles.hamburger}>
          <div style={styles.bar}></div><div style={styles.bar}></div><div style={styles.bar}></div>
        </div>
      </div>

      {/* SIDEBAR */}
      <aside 
        style={{...styles.sidebar, transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)"}}
        onMouseLeave={() => setIsSidebarOpen(false)}
      >
        <div style={styles.sidebarHeader}>
          <div style={styles.logoCircle}>A</div>
          <span style={styles.logoText}>AMANI</span>
        </div>
        
        <nav style={styles.navMenu}>
          {["Tutorials", "Missions", "Block Coding"].map((item) => (
            <div 
              key={item}
              onClick={() => { setActiveTab(item); setIsSidebarOpen(false); }}
              className="dashboard-nav-item"
              style={{...styles.navItem, ...(activeTab === item ? styles.navActive : {})}}
            >
               <span style={styles.navIcon}>{item === "Block Coding" ? "🧩" : item === "Missions" ? "🚀" : "📚"}</span>
               {item}
            </div>
          ))}
        </nav>

        <div style={styles.moreSection}>
          <div 
            style={styles.moreTrigger} 
            onMouseEnter={() => setShowMoreMenu(true)}
            onMouseLeave={() => setShowMoreMenu(false)}
          >
            <span>⋮ More</span>
            {showMoreMenu && (
              <div style={styles.dropdownMenu}>
                <div style={styles.dropdownItem} onClick={() => setActiveTab("Manage Account")}>👤 Manage Account</div>
                <div style={styles.dropdownItem} onClick={() => setActiveTab("Settings")}>⚙️ Settings</div>
                <div style={styles.dropdownDivider}></div>
                <div style={{...styles.dropdownItem, color: '#ef4444'}} onClick={handleLogout}>Logout</div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* MAIN WORKSPACE */}
      <main style={styles.mainContent}>
        
        {activeTab !== "Manage Account" && (
          <header style={styles.header}>
            <h1 style={styles.welcomeText}>{activeTab}</h1>
          </header>
        )}

        <div style={activeTab === "Manage Account" ? styles.transparentCard : styles.contentCard}>
          
          {/* --- MANAGE ACCOUNT VIEW --- */}
          {activeTab === "Manage Account" && (
            <div className="fade-in">
              {/* 1. PROFILE PHOTO SECTION */}
              <div style={styles.profileHeaderSection}>
                <div style={styles.largeAvatarWrapper}>
                  <div style={styles.largeAvatar}>
                    {user?.email?.charAt(0).toUpperCase()}
                  </div>
                  <div className="camera-trigger" style={styles.cameraBtn}>
                    📷
                    <div className="camera-dropdown" style={styles.cameraDropdown}>
                       <div style={styles.dropItem}>Upload from Gallery</div>
                       <div style={styles.dropItem}>Take Photo</div>
                       <div style={{...styles.dropItem, color: '#ef4444'}}>Remove Photo</div>
                    </div>
                  </div>
                </div>
                <h2 style={styles.profileName}>{user?.user_metadata?.first_name} {user?.user_metadata?.last_name || "Innovator"}</h2>
                <p style={styles.profileSub}>{user?.email}</p>
                <span style={styles.profileBadge}>{user?.user_metadata?.account_type || "Student"}</span>
              </div>

              {/* 2. PERSONAL INFORMATION */}
              <div style={styles.accountGrid}>
                <div style={styles.infoCard}>
                  <h3 style={styles.cardTitle}>Personal Information</h3>
                  <div style={styles.inputGrid}>
                    <div style={styles.field}>
                      <label style={styles.fieldLabel}>First Name</label>
                      <input style={styles.fieldInput} defaultValue={user?.user_metadata?.first_name} disabled={!isEditing} />
                    </div>
                    <div style={styles.field}>
                      <label style={styles.fieldLabel}>Last Name</label>
                      <input style={styles.fieldInput} defaultValue={user?.user_metadata?.last_name} disabled={!isEditing} />
                    </div>
                    <div style={styles.field}>
                      <label style={styles.fieldLabel}>Email Address</label>
                      <input style={{...styles.fieldInput, backgroundColor: '#f1f1f1'}} value={user?.email} disabled />
                    </div>
                    <div style={styles.field}>
                      <label style={styles.fieldLabel}>Account Type</label>
                      <input style={styles.fieldInput} defaultValue={user?.user_metadata?.account_type} disabled={!isEditing} />
                    </div>
                    <div style={styles.field}>
                      <label style={styles.fieldLabel}>Member Since</label>
                      <input style={{...styles.fieldInput, backgroundColor: '#f1f1f1'}} value={new Date(user?.created_at).toLocaleDateString()} disabled />
                    </div>
                  </div>
                  <div style={styles.cardActions}>
                    {!isEditing ? (
                      <button style={styles.primaryActionBtn} onClick={() => setIsEditing(true)}>Edit Details</button>
                    ) : (
                      <button style={{...styles.primaryActionBtn, backgroundColor: '#10B981'}} onClick={() => setIsEditing(false)}>Save Changes</button>
                    )}
                  </div>
                </div>

                {/* 3. SECURITY */}
                <div style={styles.infoCard}>
                  <h3 style={styles.cardTitle}>Security</h3>
                  <p style={{fontSize: '13px', color: '#64748B', marginBottom: '15px'}}>Change Password</p>
                  <div style={styles.field}><label style={styles.fieldLabel}>Current Password</label><input type="password" style={styles.fieldInput} placeholder="••••••••" /></div>
                  <div style={styles.field}><label style={styles.fieldLabel}>New Password</label><input type="password" style={styles.fieldInput} placeholder="••••••••" /></div>
                  <div style={styles.field}><label style={styles.fieldLabel}>Confirm New Password</label><input type="password" style={styles.fieldInput} placeholder="••••••••" /></div>
                  <button style={styles.primaryActionBtn}>Update Password</button>
                </div>

                {/* 4. ACCOUNT INFORMATION */}
                <div style={styles.infoCard}>
                  <h3 style={styles.cardTitle}>Account Metadata</h3>
                  <div style={styles.metaRow}><span>Email Verified</span> <span style={{color: '#10B981'}}>✅ Yes</span></div>
                  <div style={styles.metaRow}><span>User ID</span> <code style={styles.code}>{user?.id?.substring(0, 12)}...</code></div>
                  <div style={styles.metaRow}><span>Last Login</span> <span>{new Date().toLocaleDateString()}</span></div>
                </div>

                {/* 5. DANGER ZONE */}
                <div style={{...styles.infoCard, border: '1px solid #fee2e2'}}>
                  <h3 style={{...styles.cardTitle, color: '#ef4444'}}>Danger Zone</h3>
                  <p style={{fontSize: '13px', color: '#b91c1c', marginBottom: '20px'}}>
                    Warning: Deleting your account is permanent and cannot be undone. All engineering data will be wiped.
                  </p>
                  <button style={styles.dangerBtn}>Delete Account</button>
                </div>
              </div>
            </div>
          )}

          {/* ... Other Tabs remain the same ... */}
          {activeTab === "Block Coding" && (
            <div className="fade-in">
              <h2 style={styles.sectionTitle}>Visual Logic Workspace</h2>
              <div style={styles.codingArea}>
                <div style={styles.blockPalette}>
                  <p style={styles.paletteLabel}>Blocks</p>
                  <div style={styles.blockBlue}>Move Forward</div>
                  <div style={styles.blockBlue}>Turn Right</div>
                  <div style={styles.blockOrange}>Wait (1s)</div>
                  <div style={styles.blockGreen}>Repeat 5x</div>
                </div>
                <div style={styles.workspace}>
                   <p style={{color: '#94A3B8'}}>Drag and drop blocks here...</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <style>{`
        .dashboard-nav-item { transition: all 0.3s ease; position: relative; }
        .dashboard-nav-item:hover { background-color: #F1F5F9 !important; color: #11306D !important; padding-left: 25px !important; }
        .fade-in { animation: fadeIn 0.5s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        
        .camera-trigger:hover .camera-dropdown { display: block !important; }
        .camera-dropdown div:hover { background: #f1f5f9; }
      `}</style>
    </div>
  );
};

const styles = {
  dashboardWrapper: { display: "flex", minHeight: "100vh", backgroundColor: "#F8FAFC", fontFamily: "'Inter', sans-serif" },
  sidebar: { position: "fixed", left: 0, top: 0, height: "100vh", width: "260px", backgroundColor: "#FFFFFF", padding: "40px 20px", display: "flex", flexDirection: "column", zIndex: 1050, transition: "transform 0.3s ease", borderRight: "1px solid #E2E8F0" },
  sidebarHeader: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "40px" },
  logoCircle: { width: "30px", height: "30px", backgroundColor: "#11306D", color: "#fff", borderRadius: "6px", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold" },
  logoText: { fontSize: "18px", fontWeight: "800", color: "#11306D" },
  navMenu: { flex: 1 },
  navItem: { display: "flex", alignItems: "center", padding: "12px 15px", borderRadius: "10px", marginBottom: "8px", cursor: "pointer", color: "#64748B", fontSize: "14px", fontWeight: "600" },
  navActive: { backgroundColor: "#F1F5F9", color: "#11306D", borderLeft: "4px solid #11306D" },
  navIcon: { marginRight: "12px" },

  moreSection: { borderTop: '1px solid #F1F5F9', paddingTop: '10px', position: 'relative' },
  moreTrigger: { padding: '12px', color: '#11306D', cursor: 'pointer', fontWeight: '700' },
  dropdownMenu: { position: 'absolute', bottom: '50px', left: 0, width: "200px", backgroundColor: "#fff", borderRadius: "12px", padding: "10px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", border: "1px solid #E2E8F0" },
  dropdownItem: { padding: "10px", fontSize: "13px", color: "#475569", cursor: "pointer", borderRadius: "8px" },
  dropdownDivider: { height: '1px', background: '#f1f1f1', margin: '5px 0' },

  mainContent: { flex: 1, padding: "100px 40px 60px", display: "flex", flexDirection: "column", maxWidth: "1200px", margin: "0 auto" },
  header: { marginBottom: "30px" },
  welcomeText: { fontSize: "32px", fontWeight: "800", color: "#11306D" },
  contentCard: { backgroundColor: "#fff", borderRadius: "20px", padding: "40px", border: "1px solid #E2E8F0", flex: 1 },
  transparentCard: { flex: 1 },

  /* MANAGE ACCOUNT SPECIFIC STYLES */
  profileHeaderSection: { textAlign: 'center', marginBottom: '50px' },
  largeAvatarWrapper: { position: 'relative', width: '120px', height: '120px', margin: '0 auto 20px' },
  largeAvatar: { width: '100%', height: '100%', backgroundColor: '#11306D', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', fontWeight: 'bold' },
  cameraBtn: { position: 'absolute', bottom: '5px', right: '5px', width: '35px', height: '35px', backgroundColor: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', cursor: 'pointer', fontSize: '18px' },
  cameraDropdown: { display: 'none', position: 'absolute', top: '40px', left: '0', backgroundColor: '#fff', padding: '10px', borderRadius: '12px', width: '180px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', zIndex: 10, textAlign: 'left', border: '1px solid #eee' },
  dropItem: { padding: '8px 12px', fontSize: '12px', cursor: 'pointer', borderRadius: '6px' },
  profileName: { fontSize: '24px', fontWeight: '800', color: '#0F172A', margin: '0 0 5px' },
  profileSub: { fontSize: '14px', color: '#64748B', margin: '0 0 15px' },
  profileBadge: { padding: '5px 15px', backgroundColor: '#F1F5F9', color: '#11306D', borderRadius: '20px', fontSize: '12px', fontWeight: '700' },

  accountGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '25px' },
  infoCard: { backgroundColor: '#fff', padding: '30px', borderRadius: '24px', border: '1px solid #E2E8F0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' },
  cardTitle: { fontSize: '18px', fontWeight: '800', color: '#0F172A', marginBottom: '20px' },
  inputGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
  field: { marginBottom: '15px' },
  fieldLabel: { display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748B', marginBottom: '5px' },
  fieldInput: { width: '100%', padding: '10px 15px', borderRadius: '8px', border: '1.5px solid #E2E8F0', fontSize: '14px', outline: 'none' },
  primaryActionBtn: { padding: '10px 20px', backgroundColor: '#11306D', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', marginTop: '10px' },
  metaRow: { display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #F1F5F9', fontSize: '14px' },
  code: { background: '#F1F5F9', padding: '2px 6px', borderRadius: '4px' },
  dangerBtn: { width: '100%', padding: '12px', backgroundColor: '#fff', color: '#ef4444', border: '1.5px solid #ef4444', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' },

  menuTrigger: { position: "fixed", top: "20px", left: "20px", zIndex: 1100, cursor: "pointer", padding: "10px", backgroundColor: "#fff", borderRadius: "50%", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" },
  hamburger: { display: "flex", flexDirection: "column", gap: "4px" },
  bar: { width: "18px", height: "2px", backgroundColor: "#11306D" },
  codingArea: { display: "flex", gap: "20px", minHeight: "450px" },
  blockPalette: { width: "200px", background: "#F8FAFC", borderRadius: "12px", padding: "15px", border: "1px solid #E2E8F0" },
  paletteLabel: { fontSize: "12px", fontWeight: "800", marginBottom: "15px", color: "#94A3B8" },
  blockBlue: { background: "#11306D", color: "#fff", padding: "12px", borderRadius: "8px", marginBottom: "8px", fontSize: "13px" },
  blockOrange: { background: "#F59E0B", color: "#fff", padding: "12px", borderRadius: "8px", marginBottom: "8px", fontSize: "13px" },
  blockGreen: { background: "#10B981", color: "#fff", padding: "12px", borderRadius: "8px", marginBottom: "8px", fontSize: "13px" },
  workspace: { flex: 1, border: "2px dashed #E2E8F0", borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center", background: "#fcfcfc" },
  moduleBox: { padding: "20px", backgroundColor: "#F8FAFC", borderRadius: "12px", border: "1px solid #E2E8F0", color: "#11306D", fontWeight: "600" },
};

export default Dashboard;