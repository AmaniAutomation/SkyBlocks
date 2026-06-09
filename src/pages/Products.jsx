import React, { useMemo, useState, useEffect, useRef } from "react";

// Local image imports from your folder
import bmsImg from "../assets/images/bms.png";
import escImg from "../assets/images/esc.png";
import fcImg from "../assets/images/fc.png";

const AmaniProductsSystem = () => {
  // --- STATE MANAGEMENT ---
  const [currentView, setCurrentView] = useState("grid"); // 'grid' or 'login'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [sortOption, setSortOption] = useState("Recommended");
  const [showSort, setShowSort] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [openSections, setOpenSections] = useState({ info: true, refund: false, shipping: false });

  // Refs for keyboard scrolling focus
  const modalScrollRef = useRef(null);
  const fullScreenRef = useRef(null);

  const productsData = [
    { id: 1, name: "Battery Management System(Customized)", sku: "aa_3", price: "₹0.00", image: bmsImg, question: "What is the Battery Power Rating?", shippingText: "Expected to ship by End of January 2025", productInfo: "Experience unmatched energy efficiency with Amani Automation Pvt’s customized Battery Management System (BMS). Our state-of-the-art BMS ensures optimal performance and longevity of your battery assets." },
    { id: 2, name: "Electronic Speed Controller(Customized)", sku: "aa_2", price: "₹0.00", image: escImg, question: "What is the Power Rating of your Motor?", shippingText: "Expected to ship by End of January 2025", productInfo: "High-performance Electronic Speed Controller from Amani Automation Pvt. Tailored for high-performance applications, this controller offers precise velocity management." },
    { id: 3, name: "Flight Controller(Customized)", sku: "aa_1", price: "₹0.00", image: fcImg, question: "What is Your Flight Application?", shippingText: "Expected to ship by End of June 2025", productInfo: "Customized Flight Controller engineered for drones and UAV systems. Explore unparalleled precision with our Customized Flight Controller." },
  ];

  // --- LOGIC ---
  const sortedProducts = useMemo(() => {
    let products = [...productsData];
    if (sortOption === "Name A-Z") return products.sort((a, b) => a.name.localeCompare(b.name));
    if (sortOption === "Name Z-A") return products.sort((a, b) => b.name.localeCompare(a.name));
    if (sortOption === "Newest") return products.reverse();
    return products;
  }, [sortOption]);

  const currentIndex = sortedProducts.findIndex((p) => p.id === selectedProduct?.id);
  const handleNext = () => setSelectedProduct(sortedProducts[(currentIndex + 1) % sortedProducts.length]);
  const handlePrev = () => setSelectedProduct(sortedProducts[(currentIndex - 1 + sortedProducts.length) % sortedProducts.length]);

  // Handle Focus for Keyboard Scrolling
  useEffect(() => {
    if (selectedProduct && !isFullScreen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => modalScrollRef.current?.focus(), 100);
    } else if (isFullScreen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => fullScreenRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedProduct, isFullScreen]);

  if (currentView === "login") {
    return (
      <div style={{...styles.loginPage, outline:'none'}}>
        <div style={styles.loginCard}>
          <div style={styles.loginLeft}>
            <div style={styles.badge}>AMANI AUTOMATION</div>
            <h1 style={styles.loginTitle}>Access Your Innovation Hub.</h1>
            <p style={{opacity:0.8, lineHeight:1.6}}>Continue to your robotics, automation, and engineering workspace.</p>
          </div>
          <div style={styles.loginRight}>
            <h2 style={{color:'#163b86', fontSize:32, marginBottom:10}}>Sign In</h2>
            <p style={{color:'#64759a', marginBottom:30}}>Continue with your email</p>
            <label style={styles.label}>Email Address</label>
            <input type="email" placeholder="Enter your email" style={styles.input} />
            <button style={styles.mainBtn} onClick={() => setCurrentView('grid')}>Continue with Email</button>
            <div style={styles.divider}>OR</div>
            <button style={styles.socialBtn}>Continue with Google</button>
            <button style={styles.socialBtn}>Continue with GitHub</button>
            <button style={{marginTop:20, background:'none', border:'none', color:'#163b86', textDecoration:'underline', cursor:'pointer'}} onClick={() => setCurrentView('grid')}>← Back to Products</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <style>{`
        .sort-link { color: #163b86; text-decoration: underline; cursor: pointer; font-weight: 700; font-size: 22px; }
        .product-card { transition: 0.3s; cursor: pointer; border: 1px solid #dbe7ff; background: white; border-radius: 24px; padding: 20px; }
        .product-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(22, 59, 134, 0.1); }
        .x-btn { background: #f0f7ff; color: #163b86; border: none; width: 36px; height: 36px; border-radius: 50%; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .qty-input-box { display: flex; border: 1px solid #dbe7ff; border-radius: 8px; width: fit-content; margin-bottom: 20px; }
        .qty-input-box button { width: 40px; height: 40px; background: none; border: none; cursor: pointer; color: #163b86; font-size: 20px; }
        .qty-input-box span { width: 45px; text-align: center; line-height: 40px; font-weight: 700; border-left: 1px solid #eee; border-right: 1px solid #eee; }
        
        /* Modal Right Scroll Styling */
        .modal-right-pane {
          flex: 1;
          padding: 40px;
          overflow-y: auto !important;
          scrollbar-width: thin;
          scrollbar-color: #dbe7ff transparent;
          outline: none;
        }
        .modal-right-pane::-webkit-scrollbar { width: 6px; }
        .modal-right-pane::-webkit-scrollbar-thumb { background: #dbe7ff; border-radius: 10px; }
      `}</style>

      {/* HERO SECTION */}
      <div style={styles.hero}>
        <h1>Smart Automation Products</h1>
        <p>Explore advanced hardware engineered for robotics, drones, and industrial innovation.</p>
      </div>

      <div style={styles.layout}>
        <div style={styles.sidebar}>
          <h2 style={{color:'#163b86', marginBottom:20}}>Browse by</h2>
          <p style={{color:'#163b86', fontWeight:700, borderLeft:'3px solid #163b86', paddingLeft:15}}>All Products</p>
        </div>

        <div style={{flex:1}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:30}}>
            <span style={{color:'#163b86', fontWeight:600, fontSize:18}}>{sortedProducts.length} products</span>
            <div style={{position:'relative'}}>
              <span className="sort-link" onClick={() => setShowSort(!showSort)}>Sort by: {sortOption} ▾</span>
              {showSort && (
                <div style={styles.dropdown}>
                  {["Recommended", "Newest", "Name A-Z", "Name Z-A"].map(opt => (
                    <div key={opt} style={styles.dropItem} onClick={() => {setSortOption(opt); setShowSort(false)}}>{opt}</div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div style={styles.grid}>
            {sortedProducts.map(p => (
              <div key={p.id} className="product-card" onClick={() => setSelectedProduct(p)}>
                <div style={styles.imgContainer}><img src={p.image} style={{maxWidth:'100%', maxHeight:'100%', objectFit:'contain'}} alt="" /></div>
                <h3 style={{color:'#163b86', fontSize:19, minHeight:50, marginTop:15}}>{p.name}</h3>
                <p style={{color:'#163b86', fontSize:24, fontWeight:800, margin:'10px 0'}}>{p.price}</p>
                <button style={styles.mainBtn}>Pre Order</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- MODAL (SUB-SCREEN) --- */}
      {selectedProduct && !isFullScreen && (
        <div style={styles.overlay} onClick={() => setSelectedProduct(null)}>
          <div style={styles.modalBox} onClick={e => e.stopPropagation()}>
            {/* LEFT FIXED IMAGE */}
            <div style={{width:'45%', background:'#f8fafc', display:'flex', alignItems:'center', padding:40, borderRight:'1px solid #edf3fb'}}>
              <img src={selectedProduct.image} style={{width:'100%', objectFit:'contain'}} alt="" />
            </div>

            {/* RIGHT SCROLLABLE FORM */}
            <div 
              className="modal-right-pane" 
              ref={modalScrollRef} 
              tabIndex="0"
            >
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:20}}>
                    <div style={{display:'flex', gap:15, fontWeight:700, color:'#163b86'}}>
                        <span style={{cursor:'pointer'}} onClick={handlePrev}>‹ Prev</span>
                        <span style={{opacity:0.2}}>|</span>
                        <span style={{cursor:'pointer'}} onClick={handleNext}>Next ›</span>
                    </div>
                    <button className="x-btn" onClick={() => setSelectedProduct(null)}>✕</button>
                </div>
                <h1 style={{fontSize:30, color:'#163b86', marginBottom:10}}>{selectedProduct.name}</h1>
                <p style={{fontSize:22, fontWeight:800, color:'#163b86', marginBottom:25}}>{selectedProduct.price}</p>
                
                <label style={styles.label}>{selectedProduct.question} *</label>
                <textarea style={{...styles.input, height:120}} placeholder="Details..." />
                
                <label style={styles.label}>Pre-Order Quantity? *</label>
                <input type="text" style={styles.input} placeholder="How many units?" />

                <label style={styles.label}>Quantity</label>
                <div className="qty-input-box">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>

                <button style={styles.mainBtn} onClick={() => setCurrentView('login')}>Pre-Order Now</button>
                <p style={{textAlign:'center', marginTop:20}}>
                  <span className="sort-link" style={{fontSize:14}} onClick={() => setIsFullScreen(true)}>View Full Product Details →</span>
                </p>
                <div style={{height: '20px'}}></div> {/* Padding for scroll end */}
            </div>
          </div>
        </div>
      )}

      {/* --- FULL SCREEN VIEW --- */}
      {selectedProduct && isFullScreen && (
        <div 
            className="modal-right-pane" 
            ref={fullScreenRef} 
            tabIndex="0" 
            style={styles.fullScreen}
        >
           <div style={styles.fullNav}>
              <div style={{fontSize:20, fontWeight:800}}>Store / {selectedProduct.name}</div>
              <div style={{display:'flex', gap:30, alignItems:'center'}}>
                  <span style={{cursor:'pointer', fontWeight:700}} onClick={handlePrev}>‹ Prev</span>
                  <span style={{opacity:0.2}}>|</span>
                  <span style={{cursor:'pointer', fontWeight:700}} onClick={handleNext}>Next ›</span>
                  <button className="x-btn" style={{marginLeft:20, background:'#163b86', color:'white'}} onClick={() => setIsFullScreen(false)}>✕</button>
              </div>
           </div>
           <div style={styles.fullGrid}>
              <div>
                <img src={selectedProduct.image} style={styles.fullImg} alt="" />
                <p style={{marginTop:40, lineHeight:1.8, color:'#64759a', fontSize:18}}>{selectedProduct.productInfo}</p>
              </div>
              <div style={{paddingBottom:'100px'}}>
                <h1 style={{fontSize:48, fontWeight:900, color:'#163b86'}}>{selectedProduct.name}</h1>
                <p style={{fontSize:42, fontWeight:800, margin:'20px 0'}}>{selectedProduct.price}</p>
                <label style={styles.label}>Requirements? *</label>
                <textarea style={{...styles.input, height:120}} />
                <label style={styles.label}>Pre-Order Quantity? *</label>
                <input type="text" style={styles.input} />
                <button style={{...styles.mainBtn, height:65, fontSize:20}} onClick={() => setCurrentView('login')}>Confirm Pre-Order</button>
                <div style={{marginTop:50, borderTop:'1px solid #eee'}}>
                    {['PRODUCT INFO', 'RETURN POLICY', 'SHIPPING'].map(item => (
                        <div key={item} style={{padding:'20px 0', borderBottom:'1px solid #eee', display:'flex', justifyContent:'space-between', fontWeight:700}}>
                            <span>{item}</span><span>+</span>
                        </div>
                    ))}
                </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  page: { background: "#edf3fb", minHeight: "100vh", padding: "140px 5% 80px", fontFamily: "sans-serif" },
  hero: { textAlign: "center", marginBottom: "60px" },
  layout: { display: "flex", gap: "40px", maxWidth: "1300px", margin: "0 auto" },
  sidebar: { width: "200px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "25px" },
  imgContainer: { height: "220px", display: "flex", alignItems: "center", justifyContent: "center" },
  mainBtn: { width: "100%", padding: "16px", background: "#163b86", color: "white", border: "none", borderRadius: "12px", fontWeight: "700", cursor: "pointer" },
  dropdown: { position: "absolute", top: "40px", right: 0, background: "white", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", width: "180px", zIndex: 100, border: "1px solid #edf3fb", overflow: "hidden" },
  dropItem: { padding: "12px 20px", fontSize: "14px", cursor: "pointer", color: "#163b86" },
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" },
  modalBox: { background: "white", width: "950px", height: "660px", borderRadius: "32px", display: "flex", overflow: "hidden", position: "relative" },
  label: { display: "block", marginBottom: "8px", fontWeight: "700", color: "#163b86", fontSize: "14px" },
  input: { width: "100%", padding: "14px", border: "1px solid #dbe7ff", borderRadius: "12px", marginBottom: "20px", outline: "none", color: "#163b86" },
  fullScreen: { position: "fixed", top: "80px", left: 0, right: 0, bottom: 0, background: "white", zIndex: 2000, padding: "60px 8%", color: "#163b86" },
  fullNav: { display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #edf3fb", paddingBottom: "20px", marginBottom: "40px" },
  fullGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px" },
  fullImg: { width: "100%", borderRadius: "24px", background: "#f8fafc", padding: "40px", border: "1px solid #eee" },
  loginPage: { background: "#edf3fb", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" },
  loginCard: { display: "grid", gridTemplateColumns: "1fr 1fr", width: "1000px", background: "white", borderRadius: "32px", overflow: "hidden", position: 'relative' },
  loginLeft: { background: "linear-gradient(135deg, #163b86 0%, #11306d 100%)", color: "white", padding: "60px", display: "flex", flexDirection: "column", justifyContent: "center" },
  loginRight: { padding: "60px", display: "flex", flexDirection: "column", justifyContent: "center" },
  badge: { fontSize: 12, fontWeight: 700, letterSpacing: 2, marginBottom: 20 },
  loginTitle: { fontSize: 42, fontWeight: 900, lineHeight: 1.1, marginBottom: 20 },
  divider: { textAlign: "center", margin: "20px 0", color: "#64759a", fontSize: 12, fontWeight: 700 },
  socialBtn: { width: "100%", padding: "13px", background: "white", border: "1px solid #edf3fb", borderRadius: "12px", marginBottom: "12px", fontWeight: 600, color: "#163b86", cursor: "pointer" },
};

export default AmaniProductsSystem;