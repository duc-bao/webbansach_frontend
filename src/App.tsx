import React, { useEffect, useState } from "react";
import Navbar from "./layout/header-footer/Navbar";
import Footer from "./layout/header-footer/Footer";
import HomePage from "./layout/homePage/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./layout/About/About";
import FilterPage from "./layout/page/FilterPage";
import BookDetail from "./layout/Products/BookDetail";
import { CartItemContext } from "./layout/utils/CartItemContext";
import CartPage from "./layout/page/CartPage";
import CartItemModel from "./models/CartItemModel";

function App() {
    const [keywordSearch, setKeywordSearch] = useState("");
    const [cartList, setCartList] = useState<CartItemModel[]>([]);
    const [totalCart, setTotalCart] = useState(0);

    useEffect(() => {
        const cartData: string | null = localStorage.getItem("cart");
        const cart: CartItemModel[] = cartData ? JSON.parse(cartData) : [];
        // let totalQuantity = cart.reduce(
        // 	(total, currentValue) => total + currentValue.quantity,
        // 	0
        // );
        setCartList(cart);
        setTotalCart(cart.length);
    }, []);
    return (
        <div className="App">
            <BrowserRouter>
                <CartItemContext>
                    <Navbar
                        keywordSearch={keywordSearch}
                        setKeywordSearch={setKeywordSearch}
                        totalCart={totalCart}
                    ></Navbar>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <HomePage
                                    keywordSearch={keywordSearch}
                                    setTotalCart={setTotalCart}
                                    totalCart={totalCart}
                                ></HomePage>
                            }
                        />
                        <Route
                            path="/search/:idGenreParam"
                            element={<FilterPage setTotalCart={setTotalCart} />}
                        />
                        <Route
                            path="/search"
                            element={<FilterPage setTotalCart={setTotalCart} />}
                        />
                        <Route path="/about" element={<About></About>} />
                        <Route
                            path="/book/:idBook"
                            element={
                                <BookDetail
                                    setTotalCart={setTotalCart}
                                    totalCart={totalCart}
                                ></BookDetail>
                            }
                        />
                        <Route
                            path="/cart"
                            element={
                                <CartPage
                                    setTotalCart={setTotalCart}
                                ></CartPage>
                            }
                        ></Route>
                        {/* <Route
                        path="/my-favorite-book"
                        element={<MyFavoriteBook></MyFavoriteBook>}
                    ></Route>
                   
                    <Route path="/register" element={<RegisterPage />}></Route> */}
                    </Routes>
                    <Footer></Footer>
                </CartItemContext>
            </BrowserRouter>
        </div>
    );
}
export default App;
