import React from 'react';
import Background from '../background';

const Form=({component})=>{
    return(
        <>
            <Background/>
            {component}
        </>
    )
}
export default Form;