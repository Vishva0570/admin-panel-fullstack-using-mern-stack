import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";
import Blogs from "./pages/blog";
import Products from "./pages/Products";


function App() {
  const admin = localStorage.getItem("admin");

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={admin ? <Users /> : <Navigate to="/login" />} />
      <Route path="/dashboard" element={admin ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/Blog" element={admin ? <Blogs /> : <Navigate to="/login" />} />
      <Route path="/products" element={admin ? <Products /> : <Navigate to="/login" />} />
      <Route
        path="/blogs"
        element={admin ? <Blogs /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
