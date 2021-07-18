import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "./style/style.css";
import axios from 'axios';
import env from "../../env";
import { _arrayBufferToBase64 } from "../../utill/util";
const Home = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const url = `${env.api}/category`;
        axios.get(url)
            .then(res => {
                console.log(res.data);

                setCategories(res.data);
            });
    }, [])
    return (
        <div className="wallpaper mr-auto ml-auto">
            <Row className="py-5 w-75  mr-auto ml-auto d-flex justify-content-center">
                {categories.map(category => {
                    return (
                        <Col key={category._id} md={4} sm={6} xs={12}>
                            <Card className="mr-auto w-100  border-0" style={{ backgroundImage: category.image?`url("data:image/jpeg;base64,${category.image}")`:`url("data:image/jpeg;base64,${_arrayBufferToBase64(category.img.data.data)}")` }}>

                                <Card.Body>
                                    <Card.Title>
                                        <Button variant="dark"><Link style={{color:"white",fontWeight:"normal"}} className="nav-link" to={`/products/${category.name}`}>{category.name}</Link></Button>
                                    </Card.Title>

                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}


            </Row>

        </div>
    )
}
export default Home;