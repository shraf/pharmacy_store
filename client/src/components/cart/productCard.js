import React from "react";
import { Button, Card } from "react-bootstrap";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { _arrayBufferToBase64 } from "../../utill/util";
const ProductCard = ({ product, quantity, dispatch }) => {
    const changeQuantity = (type) => {
        dispatch({ type: type, payload: product.name });
    }
    return (
        <div>
            <Card style={{ height: "100%" }} className=" mr-auto ml-auto my-3" >
                <Card.Body>
                    <div>
                        <Card.Title><h2>{product.name}</h2></Card.Title>
                        <div style={{ height: "190px", maxWidth: "190px " }} className="mr-auto ml-auto">
                            <img style={{ maxWidth: "190px", objectFit: "contain", height: "100%" }}
                                src={`data:image/jpeg;base64,${_arrayBufferToBase64(product.product_image.img.data)}`} />
                        </div>
                        <div className="d-flex">
                            <h3 className="mr-auto py-3" style={{ color: "green" }}>${product.price}</h3>
                            <div className="ml-auto d-flex ">
                                <Button onClick={() => dispatch({ type: "REMOVE", payload: { _id: product._id } })} variant="dark" className="my-3 mr-2" style={{ height: "fit-content" }} >Remove</Button>
                                <div>
                                    <button onClick={() => changeQuantity("DECREASE")} style={{ background: "transparent", border: "none", padding: "0px" }}><AiOutlineMinus style={{ pointerEvents: "none" }} /> </button>

                                    <span className="d-block">{quantity}</span>
                                    <button onClick={() => changeQuantity("INCREASE")} style={{ background: "transparent", border: "none", padding: "0px" }} className=""><AiOutlinePlus style={{ pointerEvents: "none" }} /></button>
                                </div>
                            </div>
                        </div>
                    </div>

                </Card.Body>

            </Card>
        </div>
    )
}
export default ProductCard;