import React from 'react';
import { Card } from 'react-bootstrap';
import "../home/style/style.css";
import {_arrayBufferToBase64} from "../../utill/util";
import { Link } from 'react-router-dom';
import env from '../../env';
import axios from "axios";
import useSWR from 'swr';
const fetcher=(...args)=>axios.get(...args).then(res=>res.data);

const ProductCard = ({product}) => {
    const url=`${env.api}/image/${product.product_image}`;
    const {data:image}=useSWR(url,fetcher);

  
    return (
        <Card className="mr-auto h-100 " style={{width:"80%"}} >
        <div className="w-100 d-flex" style={{overflow:"hidden"}}>
                    <img className="mr-auto ml-auto h-100" src={image?(`data:image/jpeg;base64,${ _arrayBufferToBase64(image.img.data)}`):""} style={{maxWidth:"290px",maxHeight:"200px",boxSizing:'content-box',objectFit:"contain" }}/>
        </div>
            <Card.Body>
                <Card.Title><Link className="nav-link text-body font-weight-normal mb-5" to={`/product/${product.name}`}>{product.name}</Link> </Card.Title>
                <p style={{color:"green",position:"absolute",bottom:"0px"}}>${product.price}</p>
            </Card.Body>
        </Card>
    )
}
export default ProductCard;