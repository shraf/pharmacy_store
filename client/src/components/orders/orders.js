import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import Api from "../../Api/Api";
import Order from "./order";
const Orders = ({ user }) => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        Api.orderApi.getOrder(user.id)
            .then(res =>  setOrders(res.data) );

    }, [])

    return (
        <div>
            <Container>
                {orders.map(order => <Order key={order._id} order={{ order }} />)}
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => {
    const { user } = state;
    return user;
}
export default connect(mapStateToProps)(Orders);