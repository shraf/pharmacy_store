import axios from "axios"
import env from "../env";
import { filterEmptyFields } from "./Api";
const getAllCategories = () => axios.get(`${env.api}/category/`);


const getAllCategoriesNames = () => axios.get(`${env.api}/category/names`);


const postCategory = (category, options = { headers: { 'Content-Type': 'multipart/form-data' } }) => {
    filterEmptyFields(category);
    return axios.post(`${env.api}/category`, category, options)
}

const deleteCategory = (category) => axios.delete(`${env.api}/category/${category}`);

const categoryApi={
    getAllCategories,
    getAllCategoriesNames,
    postCategory,
    deleteCategory
}
export default categoryApi;