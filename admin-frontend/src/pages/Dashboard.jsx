import { useEffect, useState } from "react";
import {
    getUsers,
    getBlogs,
    getProducts,
} from "../api/UserApi";
import AdminLayout from "../components/AdminLayout";
import DashboardCharts from "../components/DashboardCharts";
import "../styles/dashboardPage.css";

const Dashboard = () => {
    const [users, setUsers] = useState(0);
    const [blogs, setBlogs] = useState(0);
    const [products, setProducts] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const admin = JSON.parse(localStorage.getItem("admin"));

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                setLoading(true);

                const usersRes = await getUsers();
                const blogsRes = await getBlogs();
                const productsRes = await getProducts();

                setUsers(usersRes.data.length || 0);
                setBlogs(blogsRes.data.length || 0);
                setProducts(productsRes.data.length || 0);
            } catch (err) {
                console.error(err);
                setError("Failed to load dashboard data");
            } finally {
                setLoading(false);
            }
        };

        loadDashboardData();
    }, []);

    if (loading) {
        return (
            <AdminLayout active="dashboard">
                <h2>Loading dashboard...</h2>
            </AdminLayout>
        );
    }

    if (error) {
        return (
            <AdminLayout active="dashboard">
                <h2 style={{ color: "red" }}>{error}</h2>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout active="dashboard">
            <h2>Welcome, {admin?.username} 👋</h2>

            {/* STAT CARDS */}
            <div className="cards">
                <div className="card">
                    <h3>Users</h3>
                    <p>{users}</p>
                </div>
                <div className="card">
                    <h3>Blogs</h3>
                    <p>{blogs}</p>
                </div>
                <div className="card">
                    <h3>Products</h3>
                    <p>{products}</p>
                </div>
                <div className="card">
                    <h3>Status</h3>
                    <p>Active</p>
                </div>
            </div>

            {/* CHARTS */}
            <DashboardCharts
                users={users}
                blogs={blogs}
                products={products}
            />
        </AdminLayout>
    );
};

export default Dashboard;
