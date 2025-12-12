import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

const API_BASE = "http://localhost:8080/api";

const COLORS = [
  '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', 
  '#C7CEEA', '#F4A261', '#E76F51', '#f8c291'
];

const getSweetColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return COLORS[Math.abs(hash) % COLORS.length];
};

// --- 1. LOGIN COMPONENT ---
function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleAuth = async (endpoint) => {
        try {
            const res = await axios.post(`${API_BASE}/auth/${endpoint}`, { username, password });
            if (endpoint === 'login') {
                localStorage.setItem("token", res.data.token);
                navigate("/dashboard");
            } else {
                alert("Registered! Now click Login.");
            }
        } catch (error) {
            alert("Action failed! Check console.");
        }
    };

    return (
        <div className="login-container">
            <div className="card" style={{padding: '40px', maxWidth: '400px'}}>
                <h1 style={{color: '#ff6b6b'}}>🔐 Sugar Auth</h1>
                <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                <div style={{display: 'flex', gap: '10px', marginTop: '20px', justifyContent: 'center'}}>
                    <button className="btn" onClick={() => handleAuth('login')}>Login</button>
                    <button className="btn" onClick={() => handleAuth('register')} style={{background: '#4ecdc4'}}>Register</button>
                </div>
            </div>
        </div>
    );
}

// --- 2. DASHBOARD COMPONENT ---
function Dashboard() {
    const [sweets, setSweets] = useState([]);
    
    // Form States
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");

    // Filter & Sort States
    const [searchQuery, setSearchQuery] = useState("");
    const [sortType, setSortType] = useState("default"); // default, asc, desc

    const navigate = useNavigate();

    useEffect(() => { fetchSweets(); }, []);

    const getAuth = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

    const fetchSweets = async () => {
        try {
            const res = await axios.get(`${API_BASE}/sweets`, getAuth());
            
            const sortedSweets = res.data.sort((a, b) => a.id - b.id);
            
            setSweets(sortedSweets);
        } catch (error) {
            navigate("/"); // Kick to login if token invalid
        }
    };

    const handleAdd = async () => {
        if(!name || !price || !quantity) return alert("Fill all fields!");
        try {
            await axios.post(`${API_BASE}/sweets`, 
                { name, price: parseFloat(price), quantity: parseInt(quantity), category: "General" }, 
                getAuth()
            );
            fetchSweets(); setName(""); setPrice(""); setQuantity("");
        } catch(e) { alert("Failed to add."); }
    };

    const handlePurchase = async (id) => {
        try {
            await axios.post(`${API_BASE}/sweets/${id}/purchase`, {}, getAuth());
            fetchSweets();
        } catch(e) { alert("Stock empty!"); }
    };

    const handleDelete = async (id) => {
        if(confirm("Delete this sweet?")) {
            await axios.delete(`${API_BASE}/sweets/${id}`, getAuth());
            fetchSweets();
        }
    };

    // --- SEARCH & FILTER LOGIC ---
    const getProcessedSweets = () => {
        let result = [...sweets];

        // 1. Filter by Search Name
        if (searchQuery) {
            result = result.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        // 2. Sort Logic
        if (sortType === "asc") {
            result.sort((a, b) => a.price - b.price); // Low to High
        } else if (sortType === "desc") {
            result.sort((a, b) => b.price - a.price); // High to Low
        }

        return result;
    };

    const displaySweets = getProcessedSweets();

    return (
        <div className="container">
            <div className="hero">
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <div>
                        <h1>🍬 Sweet Shop Manager</h1>
                        <p className="subtitle">Official Inventory & Sales Dashboard</p>
                    </div>
                    <button onClick={() => {localStorage.clear(); navigate('/')}} className="btn" style={{background:'#333', fontSize:'14px'}}>Logout</button>
                </div>
            </div>

            {/* ADD ITEM SECTION */}
            <div className="form-section">
                <h3>Admin Panel:</h3>
                <input placeholder="Sweet Name" value={name} onChange={e => setName(e.target.value)} />
                <input type="number" placeholder="Price (₹)" value={price} onChange={e => setPrice(e.target.value)} />
                <input type="number" placeholder="Qty" value={quantity} onChange={e => setQuantity(e.target.value)} style={{width:'80px'}} />
                <button className="btn" onClick={handleAdd}>+ Add Sweet</button>
            </div>

            {/* --- NEW: SEARCH & FILTER BAR --- */}
            <div className="filter-bar">
                <input 
                    className="search-input"
                    placeholder="🔍 Search sweets..." 
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
                
                <select className="sort-select" onChange={(e) => setSortType(e.target.value)}>
                    <option value="default">Sort By: Newest</option>
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                </select>
            </div>

            {/* GRID */}
            <div className="grid">
                {displaySweets.length > 0 ? (
                    displaySweets.map(sweet => (
                        <div key={sweet.id} className="card">
                            <div className="card-header" style={{ backgroundColor: getSweetColor(sweet.name) }}>
                                <h3 className="sweet-name">{sweet.name}</h3>
                            </div>
                            
                            <div className="card-content">
                                <span className="tag">In Stock: {sweet.quantity}</span>
                                {/* UPDATED TO RUPEE SYMBOL */}
                                <div className="price">₹{sweet.price}</div>
                                
                                <div className="action-buttons">
                                    <button 
                                        className="btn-purchase" 
                                        disabled={sweet.quantity <= 0}
                                        onClick={() => handlePurchase(sweet.id)}
                                    >
                                        {sweet.quantity > 0 ? "Purchase" : "Sold Out"}
                                    </button>
                                    
                                    <button className="btn-delete" onClick={() => handleDelete(sweet.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{textAlign: 'center', color: '#555', fontSize: '1.2rem', marginTop: '20px'}}>
                        No sweets found matching "{searchQuery}" 🍩
                    </div>
                )}
            </div>
            
            <footer>© 2025 Sweet Shop Systems</footer>
        </div>
    );
}

// --- 3. MAIN ROUTER ---
export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}