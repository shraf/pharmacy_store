import React, { useState, useEffect } from 'react';
import {  Row, Col, Button } from 'react-bootstrap';
import AdminPanelContent from './AdminPanelContent';
import Icon from "./assets/user.svg";
import "./admin.css";
import useForm from '../../hooks/useForm';
import Api from '../../Api/Api';

const AdminPanel = () => {
    const { formData, handleInputChange } = useForm();
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [cls, setCls] = useState("");
    useEffect(() => {
        Api.productApi.getProductsByCategoryName(formData.category)
            .then(products => setProducts(products.data));

    }, [formData.category])

    useEffect(async () => {
        const category_names = await Api.categoryApi.getAllCategoriesNames();
        setCategories(category_names.data);

    }, [])

    const refreshCategories = (new_categories) => {
        setCategories(new_categories);
    }

    const refreshProducts = (new_products) => {
        setProducts(new_products);
    }


    const onEditBtnClick = () => {
        const data = new FormData();

        Object.keys(formData)
            .forEach(key => data.append(key, formData[key]));

        Api.productApi.putProduct(data, formData._id)
            .then(() => {
                setCls("animated-click");
                setTimeout(() => setCls(""), 5000)
            })
            .catch(() => {
                setCls("animated-err");
                setTimeout(() => setCls(""), 5000)
            });


    }

    return (
        <Row style={{ backgroundColor: "#383c66", height: "100vh" }}>
            <Col xs={4} className="text-center align-self-center">
                <div className="w-50">
                    <Button className={`rounded-circle bg-sky ${cls}`} onClick={onEditBtnClick} style={{ width: 108, height: 108, position: "absolute", transform: "translate(45%,45%)" }}>Edit</Button>
                    <img class={`animated-btn `} src={Icon}></img>
                </div>
            </Col>
            <Col xs={8}>
                <AdminPanelContent refreshCategories={refreshCategories} refreshProducts={refreshProducts} formData={formData} handleInputChange={handleInputChange} categories={categories} products={products} />
            </Col>
        </Row>
    )
}

export default AdminPanel;