import jwt_decode from "jwt-decode";
export const extractUserFromToken = async (token) => {
    try {
      
        const user = await jwt_decode(token);
        return user;
    }
    catch (e) {
        console.log(e);
        return { logged: false };
    }
}
