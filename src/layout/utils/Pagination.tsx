import React from "react";
import BookModel from "../../models/BookModel";
interface PaginationInterface {
    currentPage: number;
    totalPage: number;
    handlePagination: any;
}
export const Pagination: React.FC<PaginationInterface> = (props) => {
    const showListPage = [];
    if (props.currentPage === 1) {
        showListPage.push(props.currentPage);
        if (props.totalPage >= 2) {
            showListPage.push(props.currentPage + 1);
        }
        if (props.totalPage >= 3) {
            showListPage.push(props.currentPage + 2);
        }
    } else if (props.currentPage > 1) {
        if (props.currentPage >= 3) {
            showListPage.push(props.currentPage - 2);
        }
        if (props.currentPage >= 2) {
            showListPage.push(props.currentPage - 1);
        }
        // Trang hien tai
        showListPage.push(props.currentPage);
        // trang 1
        if (props.totalPage >= props.currentPage + 1) {
            showListPage.push(props.currentPage + 1);
        }
        // trang 2
        if (props.totalPage >= props.currentPage + 2) {
            showListPage.push(props.currentPage + 2);
        }
    }

    return (
        <nav aria-label="Page navigation example" className="mt-5 fs-5">
            <ul className="pagination justify-content-center">
                <li
                    className={
                        "page-item " +
                        (props.currentPage === 1 ? "disabled" : "")
                    }
                    onClick={
                        props.currentPage === 1
                            ? () => {}
                            : () =>
                                  props.handlePagination(props.currentPage - 1)
                    }
                >
                    <button className="page-link">Previous</button>
                </li>
                {/* Hiện trang đầu */}
                {props.currentPage >= 4 && (
                    <>
                        <li
                            className="page-item"
                            onClick={() => props.handlePagination(1)}
                        >
                            <button className="page-link">1</button>
                        </li>
                    </>
                )}
                {/* Hiện các trang tiếp theo */}
                {showListPage.map((pageNumber, index) => (
                    <li
                        className={
                            "page-item" +
                            (props.currentPage === pageNumber ? " active" : "")
                        }
                        key={pageNumber}
                        onClick={() => props.handlePagination(pageNumber)}
                    >
                        <button className="page-link">{pageNumber}</button>
                    </li>
                ))}
                {/* Hiện trang cuối cùng */}
                {props.currentPage < props.totalPage - 2 && (
                    <>
                        <li className="page-item">
                            <button className="page-link">...</button>
                        </li>
                        <li
                            className={"page-item"}
                            onClick={() =>
                                props.handlePagination(props.totalPage)
                            }
                        >
                            <button className="page-link">
                                {props.totalPage}
                            </button>
                        </li>
                    </>
                )}
                <li
                    className={
                        "page-item" +
                        (props.totalPage === props.currentPage
                            ? "disabled"
                            : "")
                    }
                    onClick={props.totalPage === props.currentPage?() =>{} : () =>props.handlePagination(props.currentPage+1)}

                ><button className='page-link'>Next</button></li>
            </ul>
        </nav>
    );
};
