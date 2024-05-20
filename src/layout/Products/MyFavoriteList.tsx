import Tooltip from "@mui/material/Tooltip";
import React from "react";
import { Link } from "react-router-dom";
import TextEllipsis from "./components/text-elip/TextElipsis";


const FavoriteBooksList: React.FC = () => {
    return (
        <div className="container-book container mb-5 pb-5 px-5 bg-light">
            <h2 className="mt-4 px-3 py-3 mb-0">SÁCH YÊU THÍCH CỦA TÔI</h2>
            <hr className="mt-0" />
            <div className="row">
                <div className="col-md-6 col-lg-3 mt-3">
                    <div className="card position-relative">
                        <h4
                            className="my-0 d-inline-block position-absolute end-0"
                            style={{ top: "15px" }}
                        >
                            <span className="badge bg-primary">15%</span>
                        </h4>
                        <Link to={"/"}>
                            <img
                                src={
                                    "https://cdn0.fahasa.com/media/catalog/product/d/a/dat-rung-phuong-nam_ban-dien-anh_bia.jpg"
                                }
                                className="card-img-top mt-3"
                                alt={"Đất rừng phương nam"}
                                style={{ height: "300px" }}
                            />
                        </Link>
                        <div className="card-body">
                            <Link to={"/"} style={{ textDecoration: "none" }}>
                                <h5 className="card-title">
                                    <Tooltip
                                        title={"Đất rừng phương nam"}
                                        arrow
                                    >
                                        <span>
                                            <TextEllipsis
                                                text={"Đất rừng phương nam"}
                                                limit={20}
                                            />
                                        </span>
                                    </Tooltip>
                                </h5>
                            </Link>
                            <div className="price mb-3">
                                <span className="discounted-price text-danger">
                                    <strong style={{ fontSize: "22px" }}>
                                        {"18000".toLocaleString()}đ
                                    </strong>
                                </span>
                                <span className="original-price ms-3 small">
                                    <del>{"20000".toLocaleString()}đ</del>
                                </span>
                            </div>
                            <div className="row mt-2" role="group">
                                <div className="col-6">
                                    <a
                                        href="#"
                                        className="btn btn-secondary btn-block"
                                    >
                                        <i className="fas fa-heart"></i>
                                    </a>
                                </div>
                                <div className="col-6">
                                    <button className="btn btn-primary btn-block">
                                        <i className="fas fa-shopping-cart"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FavoriteBooksList;
