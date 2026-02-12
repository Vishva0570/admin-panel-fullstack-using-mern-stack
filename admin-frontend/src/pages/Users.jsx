import { useEffect, useState } from "react";
import {
    getUsers,
    createUser,
    deleteUser,
    updateUser,
} from "../api/UserApi";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import "../styles/dashboard.css";
import { useDashboard } from "../context/DashboardContext";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);

    // 🔍 SEARCH STATES
    const [searchInput, setSearchInput] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();
    const { refreshDashboard } = useDashboard();

    /* ================= LOAD USERS ================= */
    const loadUsers = async () => {
        const res = await getUsers();
        setUsers(res.data);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    /* ================= SEARCH ================= */
    const handleSearch = () => {
        setSearchTerm(searchInput.trim());
    };

    const handleClearSearch = () => {
        setSearchInput("");
        setSearchTerm("");
    };

    /* ================= ADD ================= */
    const handleAdd = async () => {
        if (!name) return toast.warning("Enter a name");

        try {
            setLoading(true);
            await createUser({ name });
            setName("");
            refreshDashboard();
            loadUsers();
            toast.success("User added");
        } catch {
            toast.error("Failed to add user");
        } finally {
            setLoading(false);
        }
    };

    /* ================= DELETE ================= */
    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await deleteUser(id);
            setUsers((prev) => prev.filter((u) => u._id !== id));
            refreshDashboard();
            toast.success("User deleted");
        } catch {
            toast.error("Delete failed");
        } finally {
            setLoading(false);
        }
    };

    /* ================= EDIT ================= */
    const handleEdit = (user) => {
        setEditingId(user._id);
        setName(user.name);
    };

    const handleUpdate = async () => {
        try {
            setLoading(true);
            await updateUser(editingId, { name });
            setEditingId(null);
            setName("");
            refreshDashboard();
            loadUsers();
            toast.success("User updated");
        } catch {
            toast.error("Update failed");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("admin");
        navigate("/login");
    };

    /* ================= FILTERED USERS ================= */
    const filteredUsers = users.filter(
        (u) =>
            !searchTerm ||
            u.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout active="users">
            <div className="topbar">
                <h3>User Management</h3>
                <button onClick={handleLogout}>Logout</button>
            </div>

            <div className="content">
                {/* ADD USER */}
                <div className="add-user">
                    <input
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={loading}
                    />

                    {editingId ? (
                        <button onClick={handleUpdate} disabled={loading}>
                            {loading ? "Updating..." : "Update"}
                        </button>
                    ) : (
                        <button onClick={handleAdd} disabled={loading}>
                            {loading ? "Adding..." : "Add User"}
                        </button>
                    )}
                </div>

                {/* SEARCH */}
                <div className="search-box">
                    <input
                        className="search-input"
                        placeholder="Search users..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        disabled={loading}
                    />

                    <button onClick={handleSearch} disabled={loading}>
                        Search
                    </button>

                    <button onClick={handleClearSearch} disabled={loading}>
                        Clear
                    </button>
                </div>

                {/* TABLE */}
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan="2" style={{ textAlign: "center" }}>
                                    No users found
                                </td>
                            </tr>
                        ) : (
                            filteredUsers.map((u) => (
                                <tr key={u._id}>
                                    <td>{u.name}</td>
                                    <td className="action-btns">
                                        <button
                                            className="edit-btn"
                                            onClick={() => handleEdit(u)}
                                            disabled={loading}
                                            title="Edit"
                                        >
                                            <FaEdit />
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(u._id)}
                                            disabled={loading}
                                            title="Delete"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};

export default Users;
