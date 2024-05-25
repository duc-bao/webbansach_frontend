import { jwtDecode } from "jwt-decode"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export interface JwtPayLoad{
    id:any
    role : string
    avatar : string
    lastname: string
    enabled: boolean
}
export const RequireAdmin = <P extends Object>(
    WrappConponent: React.ComponentType<P>
)=>{
    const WithAdminCheck : React.FC<P> = (props)=>{
        const navigate = useNavigate();
        useEffect(()=>{
            const token = localStorage.getItem("token");
            if(!token){
                navigate("/login");
                return;
            } 
            // Giai ma token
            const decodedToken = jwtDecode(token) as JwtPayLoad;
            // Lay thong tin tu token do
            const role = decodedToken.role;
            if(role !== "ADMIN"){
                navigate("/error-403");
            }
        }, [navigate])
        return <WrappConponent {...props} ></WrappConponent>
    }
    return WithAdminCheck || null;
}