import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { getBlogs, createBlog, deleteBlog } from "../api/BlogApi";
import "../styles/blogs.css";

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const loadBlogs = async () => {
        const res = await getBlogs();
        setBlogs(res.data);
    };

    useEffect(() => {
        loadBlogs();
    }, []);

    const handleAdd = async () => {
        if (!title || !content) return;
        await createBlog({ title, content });
        setTitle("");
        setContent("");
        loadBlogs();
    };

    const handleDelete = async (id) => {
        await deleteBlog(id);
        setBlogs((prev) => prev.filter((b) => b._id !== id));
    };

    return (
        <AdminLayout active="blogs">
            <h2>Blogs</h2>

            <div className="blog-form">
                <input
                    placeholder="Blog title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    placeholder="Blog content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <button onClick={handleAdd}>Publish Blog</button>
            </div>

            <div className="blog-list">
                {blogs.map((b) => (
                    <div key={b._id} className="blog-card">
                        <h3>{b.title}</h3>
                        <p>{b.content}</p>
                        <small>By {b.author}</small>
                        <button
                            className="delete"
                            onClick={() => handleDelete(b._id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
};

export default Blogs;
