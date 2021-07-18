import axios from "axios";
import env from "../env";

const getOrder = (user_id) => {
    const url = `${env.api}/user/${user_id}/orders`;
    return axios.get(url);
}

const postOrder = (products, user_id, dispatch) => {
    const url = `${env.api}/user/${user_id}/orders`;
    return axios.post(url, products).then(res => dispatch({ type: "RESET" }));
}

const orderApi = {
    getOrder,
    postOrder
}

export default orderApi;