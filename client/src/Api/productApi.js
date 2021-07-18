import axios from "axios";
import env from "../env";
import { filterEmptyFields } from "./Api";

const getAllProducts = (...args) => {
    return axios.get(...args)
}

const getProductsByCategoryName = (category_name) => axios.get(`${env.api}/product/category/${category_name}`)



const postProduct = (product) => {
    filterEmptyFields(product);
    return axios.post(`${env.api}/product/`, product);
}

const putProduct = (product, id, options = { headers: { 'Content-Type': 'multipart/form-data' } }) =>
    axios.put(`${env.api}/product/${id}`, product, options);

const deleteProduct = (product_id) => axios.delete(`${env.api}/product/${product_id}`);

const productApi={
    getAllProducts,
    getProductsByCategoryName,
    postProduct,
    putProduct,
    deleteProduct
}

export default productApi;