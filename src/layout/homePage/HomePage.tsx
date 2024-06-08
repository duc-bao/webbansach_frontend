import React from "react";
import Banner from "./components/Banner";
import Carousel from "./components/Carousel";
import BookList from "../Products/BookList";
import HotBookList from "../Products/BookHot";
import { useParams } from "react-router-dom";
import DanhSachSanPham from "../Products/BookList";
interface HomePageProps {
    keywordSearch: string;
    totalCart: any;
    setTotalCart: any;
}

const HomePage: React.FC<HomePageProps> = (props) => {
    const { idGenre } = useParams();

    let idGenreNumber = 0;

    try {
        idGenreNumber = parseInt(idGenre + ""); // Có thể nó làm object nên phải + thêm chuỗi rỗng vào

        if (Number.isNaN(idGenreNumber)) {
            idGenreNumber = 0;
        }
    } catch (error) {
        console.error("Error: ", error);
    }
    return (
        <>
            <div className="d-md-none d-sm-none d-lg-block">
                {/* Banner */}
                <Banner />
                {/* Underline */}
                <div className="d-flex justify-content-center align-items-center pb-4">
                    <hr className="w-100 mx-5" />
                </div>
            </div>
            {/* <Carousel></Carousel> */}
            {/* Sách hót */}
            <HotBookList
                setTotalCart={props.setTotalCart}
                totalCart={props.totalCart}
            />
            <DanhSachSanPham size={12} />
        </>
    );
};

export default HomePage;
