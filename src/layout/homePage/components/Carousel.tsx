import React, { useEffect, useState } from "react";
import BookModel from "../../../models/BookModel";
import { get3Book } from "../../../api/BookAPI";
import CarouselItem from "./CarouselItem";

const Carousel: React.FC = () => {
    const [bookList, setBookList] = useState<BookModel[]>([]);
    const [loadData, setLoadData] = useState(true);
    const [errors, setError] = useState(null);
    useEffect(() => {
        get3Book()
            .then((bookData) => {
                setBookList(bookData.result);
                setLoadData(false);
            })
            .catch((errors) => {
                setError(errors.message);
            });
    }, []);
    return (
        <div id="carouselExampleIndicators" className="carousel slide">
            <div className="carousel-indicators">
                <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                ></button>
                <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                ></button>
                <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                ></button>
            </div>
            <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="10000">
                        <CarouselItem key={0} book={bookList[0]} />
                    </div>
                    <div className="carousel-item " data-bs-interval="10000">
                        <CarouselItem key={1} book={bookList[1]} />
                    </div>
                    <div className="carousel-item " data-bs-interval="10000">
                        <CarouselItem key={2} book={bookList[2]} />
                    </div>
                </div>
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
            >
                <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
            >
                <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default Carousel;
