import axios from "axios";
import env from "../env";
import categoryApi from "./categoryApi";
import productApi from "./productApi";
import userApi from "./userApi";
import orderApi from "./orderApi";

const filterEmptyFields = (data) => {
    const keys = data.keys();
    let key = keys.next();
    const deleting_keys = [];
    while (!key.done) {
        if ((!data.get(key.value)) || (data.get(key.value).length < 1))
            deleting_keys.push(key.value);
        key = keys.next();
    }
    deleting_keys.forEach(key => data.delete(key));
}




const Api={
    categoryApi,
    productApi,
    userApi,
    orderApi
}
export {filterEmptyFields};
export default Api;