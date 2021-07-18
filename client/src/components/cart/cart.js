import React, { useState } from "react";
import { Container, Button, } from "react-bootstrap";
import { connect } from "react-redux";
import ProductCard from "./productCard";
import Paypal from "../paypal/paypal";
import Api from "../../Api/Api";
const Cart = ({ cart, user, dispatch }) => {
  const [checkout, setCheckOut] = useState(false);

  const extractItems = (cart) => {
    return cart.products.map(item => {
      return (
        { ...item.product, quantity: item.quantity }
      );
    }
    )
  }

  const postOrder = (items) => {
    const data = {
      products: items.map(item => 
          new Object({ productId: item._id, 'quantity': item.quantity,price:item.price })
        )
    }
    Api.orderApi.postOrder(data,user.user.id,dispatch);
  }

  return (
    <>
      <Container className="m-3 ">
      {cart.products.length>0?
        <div className="mr-auto ml-auto">
          {cart.products.map
            (product =>
              <ProductCard key={product.product._id} dispatch={dispatch} product={product.product} quantity={product.quantity} />)}

          {checkout ? (
            <Paypal callback={() => postOrder(extractItems(cart))} products={extractItems(cart)} />
          ) : (
            <Button
              variant="dark"
              onClick={() => {
                setCheckOut(true);
              }}
            >
              Checkout
            </Button>
          )}
        </div>
        :<h2 className="text-align-center">You have no items in your cart</h2>
        }
        
      </Container>
    </>
  )
}
const mapStateToProps = (state) => {
  const { cart } = state;
  const { user } = state;
  return { cart, user };
}
export default connect(mapStateToProps)(Cart);