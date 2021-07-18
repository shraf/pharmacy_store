import axios from 'axios';
import React, { useState } from 'react';
import { Row, Col,Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import env from '../../env';
import ProductCard from './productCard';
import SideMenu from './sideMenu';
import ReactPaginate from 'react-paginate';
import "./style/style.css";
import useSWR from 'swr';
const fetcher=(...args)=>axios.get(...args).then(res=>res.data);
const Products = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [query,setQuery]=useState("");
    const { category } = useParams();
    const url = `${env.api}/product?category=${category}&pagenumber=${pageNumber}&name=${query}`;
    const {data:products} = useSWR(url,fetcher);

  


    const getNextPage = async ({ selected }) => {
        setPageNumber(() => selected + 1);
    }
 
    return (
        <Container className="">
        {
                products ?
                products.length>0?
                    <>
                        <Row>
                            <Col md={3}>
                                <SideMenu setQuery={setQuery}   />
                            </Col>
                            <Col md={9} lg={9}>
                                <Row>
                                    {products.map(product => <Col key={product._id} xs={12} md={4}><ProductCard product={product} /></Col>)}

                                </Row>
                            </Col>
                        </Row>
                        
                    </>:<h2>There is no products in that category</h2>
                
                    
                    :<h2>Loading</h2>}
                    <ReactPaginate
                            previousLabel={"prev"}
                            nextLabel={"next"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={15}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={(selected) => getNextPage(selected)}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"} />
        </Container>
    )
}
export default Products;