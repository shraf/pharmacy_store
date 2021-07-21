import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Form from './Auth/Form';
import Login from "./Auth/login/Login";
import Register from './Auth/register/Register';
import Cart from './cart/cart';
import Header from './header/Header';
import Home from './home/home';
import Product from './products/product/product';
import Products from './products/products';
import Orders from './orders/orders';
import ProtectedRoute from './protected_router/ProtectedRoute';
import {connect} from "react-redux";
import Profile from './profile/profile';
import AdminPanel from './Admin/AdminPanel';
const AppRouter = ({user}) => {

    return (
        <Router >
            <Header />
      
            <Switch>
            <Route exact  path="/" component={Home}/>
            <ProtectedRoute condition={user.user&&user.user.isAdmin} path="/admin" component={AdminPanel}/>

                <ProtectedRoute condition={!user.isLogged} path="/login" component={()=><Form component= {<Login/>}/>}/>
                <ProtectedRoute condition={!user.isLogged} path="/register" component={Register}/>
                    <Route path="/products/:category" component={Products}/>
                    <Route  path="/product/:name" component={Product}/>
                    <Route   path="/cart" component={Cart}/>
                    <Route path="/profile" component={Profile}/>
                    <ProtectedRoute condition={user.isLogged} path="/orders" component={Orders}/>
            </Switch>
        </Router>
    )
}
const mapStateToProps=(state)=>{
    return state;
}
export default connect(mapStateToProps)(AppRouter);
