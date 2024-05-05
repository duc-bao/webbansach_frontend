import { useEffect, useState } from "react";
import { BookCartList } from "../Products/BookCartList";
import CartItemModel from "../../models/CartItemModel";

interface CartPageProps {
    // cartList: CartItemModel[];
    setTotalCart: any;
}


const CartPage: React.FC<CartPageProps> = (props) => {
	const [cartList, setCartList] = useState<CartItemModel[]>([]);

	useEffect(() => {
		const cartData: string | null = localStorage.getItem("cart");
		const cart: CartItemModel[] = cartData ? JSON.parse(cartData) : [];
		setCartList(cart);
	}, [cartList]);
	return (
		
		<BookCartList
			cartList={cartList}
			setCartList={setCartList}
			setTotalCart={props.setTotalCart}
		/>
	);
};

export default CartPage;
