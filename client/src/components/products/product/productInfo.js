import React from 'react';
import { Link } from 'react-router-dom';
const ProductInfo=({category,name,price})=>{
    return(
        <>
        <div className="border-bottom p-2 m-5">
        <Link className="text-muted" to={`/products/${category}`}>{category?category.toUpperCase():""}</Link>
        <h2>{name}</h2>
    </div>
    <div className="ml-5">
        <table>
            <tr>
                <td className="font-weight-bold p-2 pl-3">SKU</td>
                <td >1819804</td>
            </tr>
            <tr>
                <td className="font-weight-bold p-2 pl-3">UPC</td>
                <td>763189016315</td>
            </tr>
            <tr>
                <td className="font-weight-bold p-2 pl-3">CONDITION</td>
                <td>New</td>
            </tr>
            <tr>
                <td className="font-weight-bold p-2 pl-3">WEIGHT</td>
                <td>0.44LBS</td>
            </tr>
        </table>

        <h2 className="pl-3 py-2" style={{ color: "green" }}>{`$${price}`}</h2>
    </div>
    </>
    )
}
export default ProductInfo;