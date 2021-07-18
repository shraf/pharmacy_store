import React, {  useState } from 'react';
import { InputGroup, Form, Row, Col, Button, Modal } from 'react-bootstrap';
import { AiFillDelete } from "react-icons/ai"
import NewItemModal from './newItemModal';
import Api from '../../Api/Api';
const AdminPanelContent = ({ categories, products, formData, handleInputChange, refreshCategories, refreshProducts }) => {
    const [showItemModal, setShowItemModal1] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);

    const Categories = () => categories ? categories
        .map(category =>
            <option key={category._id}>{category.name}</option>
        ) : "";

    let Items = () => products ? products
        .map(product =>
            <option key={product._id} value={product._id}>{product.name}</option>
        ) : "";

    const updateCategory = (type, category) => {
        let new_categories;
        switch (type) {
            case "delete":
                new_categories = categories
                    .filter(ctgr => ctgr.name != category.name)
                    .map(ctgr => ctgr);
                break;
            
            case "add":
                new_categories=categories.concat([category]);
                break;
            default:
                new_categories = categories;
                break;
        }
        refreshCategories(new_categories);

    }

    const updateProduct = (type, product) => {
        let new_products;

        switch (type) {
            case "delete":
                new_products = products
                    .filter(prdct => prdct._id != product.id)
                    .map(prdct => prdct);
                break;
            case "add":
                new_products=products.concat([product]);
            default:
                new_products = products;
        }
        refreshProducts(new_products);
    }

    const deleteCategory = () => {
        Api.categoryApi.deleteCategory(formData.category)
            .then(() => updateCategory("delete", {name:formData.category}));
    }

    const deleteProduct = () => {
        Api.productApi.deleteProduct(formData._id)
            .then(() => updateProduct("delete", {_id:formData._id}));
    }

   
    return (
        <>
            <Form className="p-5 border-left border-light my-5 mr-5 text-light" name="productForm">
                <Row>
                    <Col xs={6}>
                        <InputGroup>
                            <Button variant="danger" className="mr-2" disabled={formData.category == "Select category" || formData.category == undefined}
                                onClick={deleteCategory}>
                                <AiFillDelete />
                            </Button>
                            <span className="input-group-text bg-sky  text-light border-0">Choose category</span>
                            <Form.Control as="select" name="category" value={formData.category || "Select category"} onChange={handleInputChange}>
                                <option>Select category</option>
                                <Categories />

                            </Form.Control>
                        </InputGroup>
                    </Col>
                    <Col xs={6}>
                        <InputGroup>
                            <Button onClick={() => setShowCategoryModal(true)} variant="dark" className="ml-auto bg-sky">Add new category</Button>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="py-5">
                    <Col xs={6} >
                        <InputGroup>
                            <Button variant="danger" className="mr-2" disabled={formData._id == "Select item" || formData._id == undefined || products.length < 1}
                                onClick={deleteProduct}>
                                <AiFillDelete />
                            </Button>
                            <span className="input-group-text bg-sky    text-light border-0">Choose item</span>
                            <Form.Control as="select" defaultValue="" name="_id" value={formData._id || "Select item"} onChange={handleInputChange}>
                                <option>Select item</option>
                                <Items />

                            </Form.Control>
                        </InputGroup>
                    </Col>
                    <Col xs={6}>
                        <InputGroup>
                            <Button onClick={() => setShowItemModal1(true)} variant="dark" className="ml-auto bg-sky">Add new item</Button>
                        </InputGroup>
                    </Col>
                </Row>
                <Form>
                    <Row className="py-3">
                        <Col xs={6}>
                            <InputGroup>
                                <span className="input-group-text bg-sky text-light border-0">Name</span>
                                <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} />
                            </InputGroup>

                        </Col>
                        <Col xs={6}>
                            <InputGroup>
                                <span className="input-group-text bg-sky text-light border-0">Price</span>
                                <Form.Control type="number" name="price" value={formData.price} onChange={handleInputChange} />
                            </InputGroup>
                        </Col>

                    </Row>
                    <Row className="py-3">
                        <Col xs={12}>
                            <InputGroup>
                                <Form.File
                                    type="file"
                                    className="custom-file-label h-auto "
                                    id="inputGroupFile01"
                                    name="file"
                                    value={formData.oiimg || ""}
                                    onChange={handleInputChange}
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row className="py-5">
                        <Col xs={12}>
                            <InputGroup>
                                <span class="input-group-text bg-sky text-white border-0">Description</span>
                                <Form.Control as="textarea" name="discription" value={formData.discription || ""} onChange={handleInputChange} />
                            </InputGroup>
                        </Col>
                    </Row>
                </Form>
                <Modal show={showItemModal} >
                    <NewItemModal onHide={() => setShowItemModal1(false)}  update={updateProduct} onSubmit={Api.productApi.postProduct} formData={formData} handleInputChange={handleInputChange} type="item" />
                </Modal>
                <Modal show={showCategoryModal} >
                    <NewItemModal onHide={() => setShowCategoryModal(false)} update={updateCategory} onSubmit={Api.categoryApi.postCategory} formData={formData} handleInputChange={handleInputChange} type="category" />
                </Modal>
            </Form>
        </>
    )
}
export default AdminPanelContent;