import getAuth from "./getInitialValue";
const reducer=(state={isLogged:false},action)=>{
    console.log(action);
    console.log(state);
    switch(action.type){
        case 'SET_USER':
            console.log("settin");
            return {...action.payload,isLogged:true};
            
        case "REMOVE_USER":
            return {isLogged:false};
        default:
            return state;
    }
}
export default reducer;