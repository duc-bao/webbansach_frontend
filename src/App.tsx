import React, { useEffect, useState } from "react";
import Navbar from "./layout/header-footer/Navbar";
import Footer from "./layout/header-footer/Footer";
import HomePage from "./layout/homePage/HomePage";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import About from "./layout/About/About";
import FilterPage from "./layout/page/FilterPage";
import BookDetail from "./layout/Products/BookDetail";
import { CartItemContext } from "./layout/utils/CartItemContext";
import CartPage from "./layout/page/CartPage";
import CartItemModel from "./models/CartItemModel";
import RegisterPage from "./layout/User/Register";
import LoginPage from "./layout/User/LoginPage";
import ActiveCodeUser from "./layout/User/ActiveCodeUser";
import BookManagement from "./admin/BookManagement";
import { AuthoProvider } from "./layout/utils/AuthorizationContext";
import { Error403Page } from "./layout/page/403Page";
import { Error404Page } from "./layout/page/404Page";
import DashBoardPage from "./admin/DashBoard";
import GenreManagementPage from "./admin/GenreManagement";
import OrderManagementPage from "./admin/OrderManagement";
import UserManagementPage from "./admin/UserManagement";
import { SlideBar } from "./admin/component/SideBar";
import { ConfirmProvider } from "material-ui-confirm";
import { ForgotPassword } from "./layout/User/FogotPassword";
import { ProfilePage } from "./layout/User/ProfilePage";
import PolicyPage from "./layout/page/PolicyPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyFavoriteBooksPage from "./layout/page/MyFavoritePage";
import { FeedbackCustomerPage } from "./layout/page/FeedBackCustomerPage";
import FeedbackPage from "./admin/FeedbackManagement";
import CheckoutStatus from "./layout/page/CheckoutStatus";
import Authenticate from "./layout/User/Authenticate";
const MyRoutes = () => {
    const [reloadAvatar, setReloadAvatar] = useState(0);
    const [keywordSearch, setKeywordSearch] = useState("");
    const [cartList, setCartList] = useState<CartItemModel[]>([]);
    const [totalCart, setTotalCart] = useState(0);
    // Lấy giỏ hàng từ local
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
    const location = useLocation();
    const isAdmin = location.pathname.startsWith("/admin");
    return (
        <AuthoProvider>
            <CartItemContext>
                <ConfirmProvider>
                {!isAdmin && (
                    <Navbar
                        keywordSearch={keywordSearch}
                        setKeywordSearch={setKeywordSearch}
                        totalCart={totalCart}
                    ></Navbar>
                )}
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
							path='/profile'
							element={<ProfilePage setReloadAvatar={setReloadAvatar} />}
						/>
                    <Route path="/policy" element= {<PolicyPage></PolicyPage>}></Route>
                    <Route path="/forgot-password" element={<ForgotPassword></ForgotPassword>}></Route>
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
                               
                            ></BookDetail>
                        }
                    />
                    <Route
                        path="/cart"
                        element={
                            <CartPage ></CartPage>
                        }
                    ></Route>
                    <Route path="/feedback" element={<FeedbackCustomerPage></FeedbackCustomerPage>}></Route>
                    <Route path="/my-favorite-books" element = {<MyFavoriteBooksPage></MyFavoriteBooksPage>}></Route>
                    <Route
                        path="/register"
                        element={<RegisterPage></RegisterPage>}
                    ></Route>
                    <Route path="/login" element={<LoginPage />}></Route>
                    <Route
                        path="/active-account/:email/:activeCode"
                        element={<ActiveCodeUser></ActiveCodeUser>}
                    ></Route>
                    <Route
                        path="error-403"
                        element={<Error403Page></Error403Page>}
                    ></Route>
                    <Route
							path='/check-out/status'
							element={<CheckoutStatus />}
						/>
                    <Route 
                            path="/authenticate"
                            element={<Authenticate></Authenticate>}
                        ></Route>
                    <Route
                        path="error-404"
                        element={<Error404Page></Error404Page>}
                    ></Route>
                    {/* <Route
                        path="/my-favorite-book"
                        element={<MyFavoriteBook></MyFavoriteBook>}
                    ></Route>
                   
                    <Route path="/register" element={<RegisterPage />}></Route> */}
                </Routes>
                {isAdmin && (
                    <div className="row overflow-hidden w-100">
                        <div className="col-2 col-md-3 col-lg-2">
                            <SlideBar></SlideBar>
                        </div>
                        <div className="col-10 col-md-9 col-lg-10">
                            <Routes>
                                <Route
                                    path="/admin/book"
                                    element={<BookManagement></BookManagement>}
                                >
                                    {" "}
                                </Route>
                                <Route
                                    path="/admin/genre"
                                    element={
                                        <GenreManagementPage></GenreManagementPage>
                                    }
                                ></Route>
                                <Route
										path='/admin/dashboard'
										element={<DashBoardPage />}
									/>
                                <Route
                                    path="/admin"
                                    element={<DashBoardPage></DashBoardPage>}
                                ></Route>
                                <Route
                                    path="/admin/order"
                                    element={
                                        <OrderManagementPage></OrderManagementPage>
                                    }
                                ></Route>
                                <Route
                                    path="/admin/user"
                                    element={
                                        <UserManagementPage></UserManagementPage>
                                    }
                                ></Route>
                                <Route path="/admin/feedback" element={<FeedbackPage></FeedbackPage>}> </Route>
                            </Routes>
                        </div>
                    </div>
                )}
                {!isAdmin && <Footer></Footer>}
                <ToastContainer
						position='bottom-center'
						autoClose={3000}
						pauseOnFocusLoss={false}
					/>
                </ConfirmProvider>
            </CartItemContext>
        </AuthoProvider>
    );
};
function App() {
    return (
        <BrowserRouter>
            <MyRoutes></MyRoutes>
        </BrowserRouter>
    );
}
export default App;
