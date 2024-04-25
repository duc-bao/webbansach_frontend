import React, { ChangeEvent, useEffect, useState } from "react";
import Category from "../../models/CategoryModel";
import CategoryModel from "../../models/CategoryModel";
import { getAllGenre } from "../../api/GenreAPI";
import { Link, NavLink } from "react-router-dom";
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
    const [genreList, setGenreList] = useState<CategoryModel[]>([]);
    const [erroring, setErroring] = useState(null);
    useEffect(() => {
        getAllGenre()
            .then((response) => {
                setGenreList(response.genreList);
            })
            .catch((error) => {
                setErroring(error.message);
            });
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand mt-2 mt-lg-0" to="/">
                    <img
                        src="https://images.vexels.com/media/users/3/150469/raw/8b434a38a07aa9a18c988088cca1dccc-book-store-logo-template.jpg"
                        width="50"
                        alt="MDB Logo"
                        loading="lazy"
                    />
                </Link>
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
                            <NavLink
                                className="nav-link"
                                aria-current="page"
                                to = '/'
                            >
                                Trang chủ
                            </NavLink>
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
                            <ul className="dropdown-menu">
                                {genreList.map((genre, index) => {
                                    return (
                                        <li key={index}>
                                            <Link
                                                className="dropdown-item"
                                                to={`/search/${genre.idCategory}`}
                                            >
                                                {genre.nameCategory}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>
                        <li className='nav-item'>
							<NavLink className='nav-link' to='/about'>
								Giới thiệu
							</NavLink>
						</li>
                        <li className='nav-item'>
							<NavLink className='nav-link' to='/search'>
								Kho sách
							</NavLink>
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
