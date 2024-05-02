import React, { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import BookProps from "./components/BookProps";
import { getAllBook, searchBook, searchBookAll } from "../../api/BookAPI";
import { Pagination } from "../utils/Pagination";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
interface BookListProps {
    paginable?: boolean;
    size?: number;
    keySearch?: string | undefined;
    idGenre?: number;
    filter?: number;
    keywordSearch?: string;
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
        if (props.keywordSearch !== undefined && props.keywordSearch !== "") {
            searchBookAll(props.keywordSearch)
                .then((bookData) => {
                    setBookList(bookData.result);
                    setTotalPages(bookData.totalPage);
                    setLoadData(false);
                })
                .catch((errors) => {
                    setError(errors.message);
                });
        } else if (
            (props.keySearch === "" &&
                props.idGenre === 0 &&
                props.filter === 0) ||
            props.keySearch === undefined
        ) {
            getAllBook(currentPage - 1) // size là (tổng sản phẩm được hiện)
                .then((bookData) => {
                    setBookList(bookData.result);
                    setTotalPages(bookData.totalPage);
                    setLoadData(false);
                })
                .catch((errors) => {
                    setError(errors.message);
                });
        } else {
            searchBook(
                props.keySearch,
                props.idGenre,
                props.filter,
                props.size,
                currentPage - 1
            )
                .then((response) => {
                    setBookList(response.result);
                    setTotalPages(response.totalPage);
                    setLoadData(false);
                })
                .catch((error) => {
                    setLoadData(false);
                    setError(error.message);
                });
        }
    }, [
        currentPage,
        props.keywordSearch,
        props.idGenre,
        props.filter,
        props.size,
        props.keywordSearch,
    ]);

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
            <div className="container-book container mb-5 px-5 px-5 bg-light">
                <h2 className="mt-4 px-3 py-3 mb-0">
                    Không tìm thấy sách! "{props.keySearch}"
                </h2>
            </div>
        );
    }
    return (
        <div className="container">
            <div className='container-book container mb-5 pb-5 px-5 bg-light'>
			<h2 className='mt-4 px-3 py-3 mb-0'>DANH SÁCH SẢN PHẨM</h2>
			<hr className='mt-0' />
			<div className='row'>
				{bookList.map((book) => (
					<BookProps key={book.idBook} book={book} />
				))}
			</div>
		</div>
            {props.paginable ? (
                <>
                    <hr className="mt-5" style={{ color: "#aaa" }} />
                    <Pagination
                        currentPage={currentPage}
                        totalPage={totalPages}
                        handlePagination={handlePagination}
                    />
                </>
            ) : (
                <Link to={"/search"}>
                    <div className="d-flex align-items-center justify-content-center">
                        <Button
                            variant="outlined"
                            size="large"
                            className="text-primary mt-5 w-25"
                        >
                            Xem Thêm
                        </Button>
                    </div>
                </Link>
            )}
        </div>
    );
};

export default DanhSachSanPham;
