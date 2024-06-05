import { getIdUserByToken } from "../layout/utils/JwtService";
import CartItemModel from "../models/CartItemModel";
import { getBookByIdCartItem } from "./BookAPI";
import { my_request } from "./Request";

export async function getCartAllByIdUser(): Promise<CartItemModel[]> {
    const idUser = getIdUserByToken();
    const enpoint = `http://localhost:8080/users/${idUser}/listCartItems`;
    try {
        const response = await my_request(enpoint);
        if(response) {
            const cartResponseList :CartItemModel[] = await Promise.all(response._embedded.cartItems.map( async(item : any) =>{
                const bookResponse = await getBookByIdCartItem(item.idBooks);
                return  {...item, book: bookResponse};
            }));
            return cartResponseList; 
        }
    }catch (err) {
        console.log(err);   
    }
    return [];
}