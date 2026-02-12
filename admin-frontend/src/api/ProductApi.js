import axios from "axios";

const PRODUCT_API = "http://localhost:8080/api/products";

export const getProducts = () => axios.get(PRODUCT_API);
export const createProduct = (data) => axios.post(PRODUCT_API, data);
export const deleteProduct = (id) =>
    axios.delete(`${PRODUCT_API}/${id}`);