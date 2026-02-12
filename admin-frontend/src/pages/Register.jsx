import { useState } from "react";
import { adminRegister } from "../api/UserApi";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await adminRegister({ username, password });
            alert("Registration successful! Please login.");
            navigate("/login");
        } catch (err) {
            alert("Registration failed");
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-card" onSubmit={handleRegister}>
                <h2>Admin Register</h2>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Register</button>

                <p className="auth-link">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
}

export default Register;
