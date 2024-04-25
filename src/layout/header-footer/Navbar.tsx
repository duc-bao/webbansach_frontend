import React, { ChangeEvent, useState } from "react";
interface NavbarProps {
    keywordSearch: string;
    setKeywordSearch: (keyword: string) => void;
}

function Navbar({ keywordSearch, setKeywordSearch }: NavbarProps) {
    const [temporary, setTemporary] = useState("");
    const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTemporary(e.target.value);
    };
    const handleSearch = () => {
        setKeywordSearch(temporary);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    Bookstore
                </a>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a
                                href="#"
                                className="nav-link active"
                                aria-current="page"
                            >
                                Trang chủ
                            </a>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                id="navbarDropdown1"
                                className="nav-link dropdown-toggle"
                            >
                                Thể loại sách
                            </a>
                            <ul
                                className="dropdown-menu"
                                aria-labelledby="navbarDropdown1"
                            >
                                <li>
                                    <a href="#" className="dropdown-item">
                                        Thể loại 1
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        Thể loại 2
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        Thể loại 3
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                href="#"
                                className="nav-link dropdown-toggle"
                                id="navbarDropdown2"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Chính sách
                            </a>
                            <ul
                                className="dropdown-menu"
                                aria-labelledby="navbarDropdown2"
                            >
                                <li>
                                    <a href="#" className="dropdown-item">
                                        Quy định 1
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        Quy định 2
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        Quy định 3
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                Liên hệ
                            </a>
                        </li>
                    </ul>
                </div>
                {/* Tim kiem */}
                <div className="d-flex" role="search">
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        onChange={onSearchInputChange}
                        value={temporary}
                    />
                    <button
                        className="btn btn-outline-success"
                        type="submit"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
                {/* Shopping Cart Icon */}
                <ul className="navbar-nav me-1">
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <i className="fas fa-shopping-cart"></i>
                        </a>
                    </li>
                </ul>

                {/* User Login Icon */}
                <ul className="navbar-nav me-1">
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <i className="fas fa-user"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
