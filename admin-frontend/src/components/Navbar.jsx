import { useNavigate, Link } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("admin");
        navigate("/login");
    };

    return (
        <div className="navbar">
            <h3 className="logo">Admin Panel</h3>

            <ul className="nav-links">
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/users">Users</Link></li>
                <li><Link to="/blogs">Blogs</Link></li>
                <li><Link to="/products">Products</Link></li>
            </ul>

            <button className="logout-btn" onClick={logout}>
                Logout
            </button>
        </div>
    );
};

export default Navbar;
