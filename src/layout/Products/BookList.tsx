import React, { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import BookProps from "./components/BookProps";
import { getAllBook, searchBook } from "../../api/BookAPI";
import { Pagination } from "../utils/Pagination";
import Skeleton from "react-loading-skeleton";
interface BookListProps {
    paginable?: boolean;
    size?: number;
    keySearch?: string | undefined;
    idGenre?: number;
    filter?: number;
    keywordSearch: string;
}
const DanhSachSanPham: React.FC<BookListProps> = (props) => {
    const [bookList, setBookList] = useState<BookModel[]>([]);
    const [loadData, setLoadData] = useState(true);
    const [errors, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    // Xử lý phân trang
    const handlePagination = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        if (props.keywordSearch !== "") {
            searchBook(props.keywordSearch)
                .then((bookData) => {
                    setBookList(bookData.result);
                    setTotalPages(bookData.totalPage);
                    setLoadData(false);
                })
                .catch((errors) => {
                    setError(errors.message);
                });
        } else {
            getAllBook(currentPage - 1) // size là (tổng sản phẩm được hiện)
                .then((bookData) => {
                    setBookList(bookData.result);
                    setTotalPages(bookData.totalPage);
                    setLoadData(false);
                })
                .catch((errors) => {
                    setError(errors.message);
                });
        }
    }, [currentPage, props.keywordSearch]);

    if (loadData) {
        return (
            <div className="container-book container mb-5 py-5 px-5 bg-light">
                <div className="row">
                    <div className="col-md-6 col-lg-3 mt-3">
                        <Skeleton className="my-3" count={1} height={400} />
                    </div>
                    <div className="col-md-6 col-lg-3 mt-3">
                        <Skeleton className="my-3" count={1} height={400} />
                    </div>
                    <div className="col-md-6 col-lg-3 mt-3">
                        <Skeleton className="my-3" count={1} height={400} />
                    </div>
                    <div className="col-md-6 col-lg-3 mt-3">
                        <Skeleton className="my-3" count={1} height={400} />
                    </div>
                </div>
            </div>
        );
    }
    if (errors) {
        return (
            <div className="container mt-2">
                <h1>Gặp lỗi: {errors}</h1>
            </div>
        );
    }
    if (bookList.length === 0) {
        return (
            <div className="container mt-5">
                <div className="d-flex align-items-center justify-content-center">
                    <h1>Hiện không tìm thấy sách theo yêu cầu!</h1>
                </div>
            </div>
        );
    }
    return (
        <div className="container">
            <div className="row mt-4 mb-4">
                {bookList.map((book) => (
                    <BookProps key={book.idBook} book={book}></BookProps>
                ))}
            </div>
            <Pagination
                handlePagination={handlePagination}
                totalPage={totalPages}
                currentPage={currentPage}
            ></Pagination>
        </div>
    );
};

export default DanhSachSanPham;
