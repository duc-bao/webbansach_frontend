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
}
const DanhSachSanPham: React.FC<BookListProps> = (props) => {
    const [bookList, setBookList] = useState<BookModel[]>([]);
    const [loadData, setLoadData] = useState(true);
    const [errors, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState<boolean>(true);

    // Xử lý phân trang
    const handlePagination = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };
    // Chỗ này xử lý khi thực hiện chức năng hiện số sản phẩm
	const [totalPagesTemp, setTotalPagesTemp] = useState(totalPages);
	if (totalPagesTemp !== totalPages) {
		setCurrentPage(1);
		setTotalPagesTemp(totalPages);
	}
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                let response;
                if (
                    (props.keySearch === "" &&
                        props.idGenre === 0 &&
                        props.filter === 0) ||
                    props.keySearch === undefined
                ) {
                    response = await getAllBook(props.size, currentPage - 1);
                } else {
                    response = await searchBook(
                        props.keySearch,
                        props.idGenre,
                        props.filter,
                        props.size,
                        currentPage - 1
                    );
                }
                setBookList(response.result);
                setTotalPages(response.totalPage);
                setLoading(false);
                setLoadData(false);
            } catch (errors) {
                setLoading(false);
                setLoadData(false);
            }
        };
        fetchData();
	}, [currentPage, props.keySearch, props.idGenre, props.filter, props.size]);
    // console.log(bookList);
    if (loading) {
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
				{bookList && bookList.map((book) => (
					<BookProps
                    key={book.idBook}
                    book={book}
                />
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
