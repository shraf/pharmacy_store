import {combineReducers} from "redux";
import CartReducer from "./Cart/CartReducer";
import AuthReducer from "./Auth/AuthReducer";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig={
    key:'root',
    storage:storage,
    whitelist:['cart','user']
}

const rootReducer= combineReducers({
    user:AuthReducer,
    cart:CartReducer,

});
export default persistReducer(persistConfig,rootReducer);