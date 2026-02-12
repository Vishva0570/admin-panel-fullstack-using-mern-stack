import axios from "axios";

const ADMIN_API = "http://localhost:8080/api/admin";
const USER_API = "http://localhost:8080/api/users";
const BLOG_API = "http://localhost:8080/api/blogs";
const PRODUCT_API = "http://localhost:8080/api/products";

/* ================= USERS ================= */
export const getUsers = () => axios.get(USER_API);
export const createUser = (user) => axios.post(USER_API, user);
export const deleteUser = (id) => axios.delete(`${USER_API}/${id}`);
export const updateUser = (id, user) =>
    axios.put(`${USER_API}/${id}`, user);

/* ================= BLOGS ================= */
export const getBlogs = () => axios.get(BLOG_API);

/* ================= PRODUCTS ================= */
export const getProducts = () => axios.get(PRODUCT_API);

/* ================= COUNTS ================= */
export const getUserCount = () =>
    axios.get(`${USER_API}/count`);

export const getBlogCount = () =>
    axios.get(`${BLOG_API}/count`);

export const getProductCount = () =>
    axios.get(`${PRODUCT_API}/count`);

/* ================= ADMIN ================= */
export const adminLogin = (data) =>
    axios.post(`${ADMIN_API}/login`, data);

export const adminRegister = (data) =>
    axios.post(`${ADMIN_API}/register`, data);
