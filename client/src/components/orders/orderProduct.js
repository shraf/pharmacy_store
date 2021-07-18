import axios from 'axios';
import React, {  } from 'react';
import { Card } from "react-bootstrap";
import useSWR from 'swr';
import env from '../../env';
import {Link} from "react-router-dom";
import { _arrayBufferToBase64 } from '../../utill/util';
const OrderProduct = ({ product }) => {
    const url=`${env.api}/image/${product.product_image}`;
    const {data:image}=useSWR(url,(...args)=>axios.get(...args).then(res=>res.data));
   
    return (
        <Card style={{ height: "100%" }} className=" mr-auto ml-auto my-3" >
            {     <Card.Body>
                <div>
                    <Card.Title><h2><Link className="nav-link text-dark font-weight-normal"  to={`/product/${product.name}`}> {product.name} </Link></h2></Card.Title>
                    <div style={{ height: "190px", maxWidth: "190px " }} className="mr-auto ml-auto">
                        <img style={{ maxWidth: "190px", objectFit: "contain", height: "100%" }}
                            src={image?`data:image/jpeg;base64,${_arrayBufferToBase64(image.img.data)}`:""} />
                    </div>
                    <div className="d-flex">
                        <h3 className="mr-auto py-3" style={{ color: "green" }}>${product.price}</h3>

                    </div>
                </div>

            </Card.Body>
            }
        </Card>
    )
}
export default OrderProduct;