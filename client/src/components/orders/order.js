import React from 'react';
import { Card } from "react-bootstrap";
import OrderProduct from './orderProduct';
import "./style.css";
const Order = ({ order }) => {
    console.log(order);
    return (
        <Card style={{ height: "100%" }} className="mr-auto ml-auto my-3" >
            {order.order.products.map(product=><OrderProduct key={product._id} product={{...product.item,quantity:product.quantity}}/>)}
            <strong>Total price of order:</strong><p style={{color:"green"}}>${order.order.price}</p>
        </Card>
    )
}
export default Order;