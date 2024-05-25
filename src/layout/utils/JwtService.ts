import { jwtDecode } from "jwt-decode"

export const isTokenExpired = (token :string)=>{
    const decodedToken  = jwtDecode(token);
    if(!decodedToken.exp){
        return false;
    }
    const currentTime = Date.now() / 1000; //Thời gian hiện tại tính bằng giây
    return currentTime < decodedToken.exp;
}
export const isToken = () =>{
    const token = localStorage.getItem("token");
    if(token){
        return true;
    }
    return false;
}