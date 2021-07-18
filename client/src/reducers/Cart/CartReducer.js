const CartReducer=(state={products:[]},action)=>{
    switch(action.type){
        case "SET":
            state=action.payload;
            break;
        case "RESET":
            state={products:[]};
            break;
        case "ADD":
            state={...state,products:[...state.products,action.payload]};
            break;
        case "REMOVE":
            state={...state,products:state.products.filter(product=>product.name==action.payload._id)};
            break;
        case "INCREASE":
            state={...state,products:state.products.map(product=>{
                    
                if(product.product.name===action.payload){
                    product={...product,quantity:product.quantity+1}
                    console.log("succed");
                }
                return product;
            })}
            break;
        case "DECREASE":
            state={...state,products:state.products.map(product=>{
                    
                if(product.product.name===action.payload){
                    product={...product,quantity:product.quantity-1}
                    console.log("succed");
                }
                return product;
            })}
                break;
            default:
                return state;

    }
    console.log(state);
    return state;
}
export default CartReducer;