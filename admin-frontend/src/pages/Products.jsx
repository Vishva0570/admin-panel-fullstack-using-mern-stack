import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import {
    getProducts,
    createProduct,
    deleteProduct,
} from "../api/ProductApi";
import "../styles/products.css";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    const loadProducts = async () => {
        const res = await getProducts();
        setProducts(res.data);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleAdd = async () => {
        if (!name || !price) return;
        await createProduct({ name, price });
        setName("");
        setPrice("");
        loadProducts();
    };

    const handleDelete = async (id) => {
        await deleteProduct(id);
        setProducts((prev) => prev.filter((p) => p._id !== id));
    };

    return (
        <AdminLayout active="products">
            <h2>Products</h2>

            <div className="product-form">
                <input
                    placeholder="Product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <button onClick={handleAdd}>Add Product</button>
            </div>

            <table className="product-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p) => (
                        <tr key={p._id}>
                            <td>{p.name}</td>
                            <td>₹{p.price}</td>
                            <td>
                                <button
                                    className="delete"
                                    onClick={() => handleDelete(p._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </AdminLayout>
    );
};

export default Products;
