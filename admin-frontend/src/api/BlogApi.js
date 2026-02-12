import axios from "axios";

const BLOG_API = "http://localhost:8080/api/blogs";

export const getBlogs = () => axios.get(BLOG_API);
export const createBlog = (data) => axios.post(BLOG_API, data);
export const deleteBlog = (id) =>
    axios.delete(`${BLOG_API}/${id}`);
