import { createContext, useContext, useState } from "react";
import { isToken } from "./JwtService";

interface   AuthContextProps{
    children : React.ReactNode;
}
interface AuthuContextType{
    isLoggedIn:boolean
    setIsLoggedIn:any
}

const AuthorizationContext  = createContext<AuthuContextType | undefined>(undefined);
export const AuthoProvider : React.FC<AuthContextProps> = (props)=>{
    const [isLoggedIn, setIsLoggedIn] = useState(isToken());
    return(
        <AuthorizationContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            {props.children}
        </AuthorizationContext.Provider>
    )
}
export const useAuth = () : AuthuContextType =>{
    const context = useContext(AuthorizationContext);
    if(!context){
        throw new Error("Loi");
    }
    return context; 
}