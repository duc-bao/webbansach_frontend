import React, { useState } from "react";
import Navbar from "./layout/header-footer/Navbar";
import Footer from "./layout/header-footer/Footer";
import HomePage from "./layout/homePage/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./layout/About/About";
import FilterPage from "./layout/page/FilterPage";
import BookDetail from "./layout/Products/BookDetail";

function App() {
    const [keywordSearch, setKeywordSearch] = useState("");
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar
                    keywordSearch={keywordSearch}
                    setKeywordSearch={setKeywordSearch}
                ></Navbar>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <HomePage keywordSearch={keywordSearch}></HomePage>
                        }
                    />
                    <Route
                        path="/search/:idGenreParam"
                        element={<FilterPage />}
                    />
                    <Route path="/search" element={<FilterPage />} />
                    <Route path="/about" element={<About></About>} />
                    <Route
                        path="/book/:idBook"
                        element={<BookDetail></BookDetail>}
                    />
                </Routes>
                <Footer></Footer>
            </BrowserRouter>
        </div>
    );
}
export default App;
