import React, { useState } from "react";
import Navbar from "./layout/header-footer/Navbar";
import Footer from "./layout/header-footer/Footer";
import HomePage from "./layout/homePage/HomePage";

function App() {
    const [keywordSearch, setKeywordSearch] = useState('');
    return (
        <div className="App">
            <Navbar
                keywordSearch= {keywordSearch}
                setKeywordSearch={setKeywordSearch}
            ></Navbar>
            <HomePage
                keywordSearch = {keywordSearch}
            ></HomePage>
            <Footer></Footer>
        </div>
    );
}
export default App;
