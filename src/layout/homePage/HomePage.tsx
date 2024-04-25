import React from "react";
import Banner from "./components/Banner";
import Carousel from "./components/Carousel";
import BookList from "../Products/BookList";
interface HomePageProps{
    keywordSearch:string;
}

function HomePage({keywordSearch}:HomePageProps){
    
    return(
        <>
        <Banner></Banner>
        <Carousel></Carousel>
        <BookList
        keywordSearch = {keywordSearch}
        ></BookList>
        </>
    )
}

export default HomePage;