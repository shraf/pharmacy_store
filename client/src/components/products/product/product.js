import axios from 'axios';
import React from 'react';
import { connect } from "react-redux";
import { Row, Container, Col } from 'react-bootstrap';
import { useParams } from 'react-router';
import env from '../../../env';
import { _arrayBufferToBase64 } from '../../../utill/util';
import ProductInfo from './productInfo';
import ProductBody from './productBody';
import Loader from "react-loader-spinner";
import useSWR from "swr";
const fetcher = (...args) => axios.get(...args).then((res) => res.data);
const Product = ({ cart, dispatch }) => {
    const { name } = useParams();
    const { data:product, error } = useSWR(`${env.api}/product/${name}`, fetcher);

    const addToCart = () => {
        dispatch({ type: "ADD", payload: { product: product, quantity: 1 } })
    }

    const removeFromCart = () => {
        dispatch({ type: "REMOVE", payload: { _id: product._id } });
    }

    const isAddedToCart = () => {
        return cart.products.filter(item => item.product._id === product._id).length > 0;

    }

    const ProductLoader = () => <>    <Loader
        type="ThreeDots"
        color="#00BFFF"
        height={100}
        width={100}
    //3 secs
    /></>;

    return (
        <Container >
            {error ? <p>some error heppend</p> : <p></p>}
            { product ? (<>

                <Row className="border  m-3">
                    <Col xs={12} md={6} style={{  }}>
                        <ProductBody isAddedToCart={isAddedToCart()} dispatchers={{ add: addToCart, remove: removeFromCart }} image={_arrayBufferToBase64(product.product_image.img.data)} />
                    </Col>
                    <Col xs={12} md={6}>
                        <ProductInfo name={product.name} category={product.category} price={product.price} />
                    </Col>
                </Row>
                <Row className="w-80 border pb-5 m-3">
                    <Col xs={12} className=" " >
                        <h2 className="m-3">{product.name}</h2>
                        <p>{product.discription}</p>
                    </Col>

                </Row>
            </>)
                : (<><ProductLoader /></>)}
        </Container>
    )
}
const mapStateToProps = cart => {
    console.log(cart);
    return cart;
}
export default connect(mapStateToProps)(Product);