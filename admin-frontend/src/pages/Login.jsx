import { useState } from "react";
import { adminLogin } from "../api/UserApi";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await adminLogin({ username, password });
            localStorage.setItem("admin", JSON.stringify(res.data));
            navigate("/");
        } catch {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="login-container">
            <form className="login-card" onSubmit={handleLogin}>
                <h2>Admin Login</h2>

                <input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>

                <p className="switch-link">
                    Don’t have an account? <Link to="/register">Register</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
