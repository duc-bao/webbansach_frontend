import { createContext, useContext, useEffect, useState } from "react";
import CartItemModel from "../../models/CartItemModel";

interface CartItemProps {
    children: React.ReactNode;
}
interface CartItemContextInterface {
    cartList: CartItemModel[];
    setCartList: any;
    totalCart: number;
    setTotalCart: any;
}
const CartItem = createContext<CartItemContextInterface | undefined>(undefined);

export const CartItemContext: React.FC<CartItemProps | undefined> = (props) => {
    const [cartList, setCartList] = useState<CartItemModel[]>([]);
    const [totalCart, setTotalCart] = useState(0);
    useEffect(() => {
        // Lấy dữ liệu giỏ hàng từ localStorage
        const cartData: string | null = localStorage.getItem("cart");
        let cart: CartItemModel[] = [];
        cart = cartData ? JSON.parse(cartData) : [];
        setCartList(cart);
        setTotalCart(cart.length);
    }, []);
    return (
        <CartItem.Provider
            value={{ cartList, setCartList, totalCart, setTotalCart }}
        >
           {props && props.children} {/* Kiểm tra props trước khi sử dụng */}
        </CartItem.Provider>
    );
};
export const useCartItem = (): CartItemContextInterface => {
    const context = useContext(CartItem);
    if (!context) {
        throw new Error("Lỗi context");
    }
    return context;
};
