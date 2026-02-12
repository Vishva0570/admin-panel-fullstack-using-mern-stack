import { useNavigate } from "react-router-dom";
import "../styles/layout.css";

const AdminLayout = ({ children, active }) => {
    const navigate = useNavigate();

    return (
        <div className="admin-container">
            <aside className="sidebar">
                <h2 className="logo">Admin</h2>
                <ul>
                    <li className={active === "dashboard" ? "active" : ""}
                        onClick={() => navigate("/dashboard")}>
                        Dashboard
                    </li>
                    <li className={active === "users" ? "active" : ""}
                        onClick={() => navigate("/")}>
                        Users
                    </li>
                    <li className={active === "blogs" ? "active" : ""}
                        onClick={() => navigate("/blogs")}>
                        Blogs
                    </li>
                    <li
                        className={active === "products" ? "active" : ""}
                        onClick={() => navigate("/products")}
                    >
                        Products
                    </li>
                </ul>
            </aside>

            <main className="main">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
