import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:8080/api/auth";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(`${API_URL}/login`, { username, password });
            localStorage.setItem("token", res.data.token); // Save Token!
            alert("Login Success!");
            navigate("/dashboard");
        } catch (error) {
            alert("Invalid Credentials");
        }
    };

    const handleRegister = async () => {
        try {
            await axios.post(`${API_URL}/register`, { username, password });
            alert("Registered! Now Login.");
        } catch (error) {
            alert("Error registering");
        }
    };

    return (
        <div style={{ padding: "50px", textAlign: "center" }}>
            <h1>🔐 Login to Sweet Shop</h1>
            <input placeholder="Username" onChange={e => setUsername(e.target.value)} /><br/><br/>
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} /><br/><br/>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegister} style={{ marginLeft: "10px" }}>Register</button>
        </div>
    );
}