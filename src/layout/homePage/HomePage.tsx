import React from "react";
import Banner from "./components/Banner";
import Carousel from "./components/Carousel";
import BookList from "../Products/BookList";
import HotBookList from "../Products/BookHot";
interface HomePageProps{
    keywordSearch:string;
}

function HomePage({keywordSearch}:HomePageProps){
    
    return(
        <>
        <div className='d-md-none d-sm-none d-lg-block'>
				{/* Banner */}
				<Banner />
				{/* Underline */}
				<div className='d-flex justify-content-center align-items-center pb-4'>
					<hr className='w-100 mx-5' />
				</div>
			</div>
        {/* <Carousel></Carousel> */}
        {/* Sách hót */}
        {/* <HotBookList></HotBookList> */}
        <BookList
        keywordSearch = {keywordSearch}
        ></BookList>
        </>
    )
}

export default HomePage;