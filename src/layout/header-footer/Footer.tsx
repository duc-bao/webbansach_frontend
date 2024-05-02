import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <div className="container">
            <footer className="py-5">
                <div className="row">
                    <div className="col-6 col-md-2 mb-3">
                        <Link to="/about" style={{ textDecoration: "none" }}>
                            <h5 >
                                Về Chúng Tôi
                            </h5>
                        </Link>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2">
                                <Link
                                    to="/about"
                                    className="nav-link p-0 text-body-secondary"
                                >
                                    Giới thiệu
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <a
                                    href="#"
                                    className="nav-link p-0 text-body-secondary"
                                >
                                    Hệ thống
                                </a>
                            </li>
                            <li className="nav-item mb-2">
                                <a
                                    href="#"
                                    className="nav-link p-0 text-body-secondary"
                                >
                                    Điều Khoản Sử Dụng
                                </a>
                            </li>
                            <li className="nav-item mb-2">
                                <a
                                    href="#"
                                    className="nav-link p-0 text-body-secondary"
                                >
                                    Chính Sách Bảo Mật
                                </a>
                            </li>
                            <li className="nav-item mb-2">
                                <a
                                    href="#"
                                    className="nav-link p-0 text-body-secondary"
                                >
                                    Chính Sách Bán Hàng
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-6 col-md-2 mb-3">
                    <Link to="/about"  style={{ textDecoration: "none" }}>
                        <h5>Hỗ Trợ Khách Hàng</h5>
                    </Link>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2">
                                <a
                                    href="#"
                                    className="nav-link p-0 text-body-secondary"
                                >
                                    Các Câu Hỏi Thường Gặp
                                </a>
                            </li>
                            <li className="nav-item mb-2">
                                <a
                                    href="#"
                                    className="nav-link p-0 text-body-secondary"
                                >
                                    Chính Sách Đổi/Trả Hàng
                                </a>
                            </li>
                            <li className="nav-item mb-2">
                                <a
                                    href="#"
                                    className="nav-link p-0 text-body-secondary"
                                >
                                    Quy Định Viết Bình Luận
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-6 col-md-2 mb-3">
                    <Link to="/about"  style={{ textDecoration: "none" }}>
                        <h5>Liên Hệ Chúng Tôi</h5>
                        </Link>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2">
                                Hotline: 1900 6656
                            </li>
                            <li className="nav-item mb-2">
                                Email: hotro@nhasachphuongnam.com
                            </li>
                        </ul>
                    </div>

                    <div className="col-md-5 offset-md-1 mb-3">
                        <form>
                        <Link to="/about"  style={{ textDecoration: "none" }}>
                            <h5>Theo dõi bản tin của chúng tôi</h5>
                        </Link>
                            <p>
                                Thông báo hàng tháng về những gì mới và thú vị
                                từ chúng ta.
                            </p>
                            <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                                <label className="visually-hidden">
                                    Email address
                                </label>
                                <input
                                    id="newsletter1"
                                    type="text"
                                    className="form-control"
                                    placeholder="Email address"
                                />
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
                    <p>&copy; Công ty 2024, Inc. Mọi quyền được bảo lưu.</p>
                    <ul className="list-unstyled d-flex">
                        <li className="ms-3">
                            <a className="link-body-emphasis" href="#">
                                <i className="fab fa-twitter"></i>
                            </a>
                        </li>
                        <li className="ms-3">
                            <a className="link-body-emphasis" href="#">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </li>
                        <li className="ms-3">
                            <a className="link-body-emphasis" href="#">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
