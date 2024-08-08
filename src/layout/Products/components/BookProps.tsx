import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GetAllImage } from "../../../api/ImageAPI";
import BookModel from "../../../models/BookModel";
import ImageModel from "../../../models/ImageModel";
import { useCartItem } from "../../utils/CartItemContext";
import { getIdUserByToken, isToken } from "../../utils/JwtService";
import TextEllipsis from "./text-elip/TextElipsis";

interface BookPropInterface {
    book: BookModel;
}
const BookProps: React.FC<BookPropInterface> = (props) => {
	// xử dụng API provider để thay thế cách truyền thủ công

	const { setTotalCart, cartList } = useCartItem();
    const [imageList, setImageList] = useState<ImageModel[]>([]);
    const [loadData, setLoadData] = useState(true);
    const [errors, setError] = useState(null);
    const [isFavoriteBook, setIsFavoriteBook] = useState(false);
    const navigation = useNavigate();
    const maxLines = 2;
    // Lấy tất cả sách yêu thích của người dùng đã đăng nhập ra
	useEffect(() => {
		if (isToken()) {
			fetch(
					`http://localhost:8080/favorite-book/get-favorite-book/${getIdUserByToken()}`
			)
				.then((response) => response.json())
				.then((data) => {
					if (data.includes(props.book.idBook)) {
						setIsFavoriteBook(true);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, []);
    useEffect(() => {
        GetAllImage(props.book.idBook)
            .then((ImageData) => {
                setImageList(ImageData);
                setLoadData(false);
            })
            .catch((errors) => {
                setError(errors.message);
            });
    }, []);
	const [quantity, setQuantity] = useState(1);
    // // Xử lý tăng số lượng
    // const add = () => {
    //     if (quantity < (book?.quantity ? book?.quantity : 1)) {
    //         setQuantity(quantity + 1);
    //     }
    // };

    // // Xử lý giảm số lượng
    // const reduce = () => {
    //     if (quantity > 1) {
    //         setQuantity(quantity - 1);
    //     }
    // };

	// Xử lí thêm vào giỏ hàng
    const handleAddProduct = async (newBook: BookModel) => {
        console.log(newBook.idBook);
        console.log(cartList);
        let isExistBook = cartList.find(
            (cartItem) => cartItem.book.idBook === newBook.idBook
        );

        if (isExistBook) {
            isExistBook.quantity += quantity;

            if (isToken()) {
                const request = {
                    quantity: isExistBook.quantity,
                    idBook: newBook.idBook
                };
                const token = localStorage.getItem("token");
                fetch(`http://localhost:8080/cart-item/update/${isExistBook.idCart}/${getIdUserByToken()}`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(request),
                }).catch((err) => console.log(err));
            }
        } else {
            if (isToken()) {
                try {
                    const request = [
                        {
                            quantity: quantity,
                            idBook: newBook.idBook,
                        },
                    ];
                    const token = localStorage.getItem("token");
                    const response = await fetch(
                        `http://localhost:8080/cart-item/add/${getIdUserByToken()}`,
                        {
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "content-type": "application/json",
                            },
                            body: JSON.stringify(request),
                        }
                    );
                    console.log(111);
                        if (response.ok) {
                            const responseData = await response.json();
                            console.log(responseData);
                            const idCart = responseData.idCart;
                            console.log(idCart);
                            cartList.push({
                                idCart: idCart,
                                quantity: quantity,
                                book: newBook,
                            });
                        }
                } catch (error) {
                    console.log(error); 
                }
            } else {
                cartList.push({
                    quantity: quantity,
                    book: newBook,
                });
            }
        }
        localStorage.setItem("cart", JSON.stringify(cartList));
        toast.success("Thêm vào giỏ hàng thành công");
        setTotalCart(cartList.length);
    };
    // Xử lý chức năng yêu sách
	const handleFavoriteBook = async (newBook: BookModel) => {
		if (!isToken()) {
			toast.info("Bạn phải đăng nhập để sử dụng chức năng này");
			navigation("/login");
			return;
		}
		if (!isFavoriteBook) {
			const token = localStorage.getItem("token");
			fetch( `http://localhost:8080/favorite-book/add-favorite`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"content-type": "application/json",
				},
				body: JSON.stringify({
					idBook: props.book.idBook,
					idUser: getIdUserByToken(),
				}),
			}).catch((err) => console.log(err));
		} else {
			const token = localStorage.getItem("token");
			fetch( `http://localhost:8080/favorite-book/delete-book`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
					"content-type": "application/json",
				},
				body: JSON.stringify({
					idBook: props.book.idBook,
					idUser: getIdUserByToken(),
				}),
			}).catch((err) => console.log(err));
		}
		setIsFavoriteBook(!isFavoriteBook);
	};
    return (
        <div className="col-md-6 col-lg-3 mt-3">
            <div className="card position-relative">
                {props.book.discountPercent !== 0 && (
                    <h4
                        className="my-0 d-inline-block position-absolute end-0"
                        style={{ top: "15px" }}
                    >
                        {props.book.quantity === 0 ? (
                            <span className="badge bg-danger">Hết hàng</span>
                        ) : (
                            <span className="badge bg-primary">
                                {props.book.discountPercent}%
                            </span>
                        )}
                    </h4>
                )}
                <Link to={`/book/${props.book.idBook}`}>
                    {imageList[0] && imageList[0].linkImg && (
                        <img
                            src={`${imageList[0].linkImg}`}
                            className="card-img-top"
                            alt={props.book.nameBook}
                            style={{ height: "300px" }}
                        />
                    )}
                </Link>
                <div className="card-body">
                    <Link
                        to={`/book/${props.book.idBook}`}
                        style={{ textDecoration: "none" }}
                    >
                        <h5 className="card-title">
                            <Tooltip title={props.book.nameBook} arrow>
                                <span>
                                    <TextEllipsis
                                        text={props.book.nameBook + ""}
                                        limit={20}
                                    />
                                </span>
                            </Tooltip>
                        </h5>
                    </Link>
                    <div className="price mb-3 d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                            <span className="discounted-price text-danger">
                                <strong style={{ fontSize: "22px" }}>
                                    {props.book.sellPrice?.toLocaleString()}đ
                                </strong>
                            </span>
                            {props.book.discountPercent !== 0 && (
                                <span className="original-price ms-3 small fw-bolder">
                                    <del>
                                        {props.book.listPrice?.toLocaleString()}đ
                                    </del>
                                </span>
                            )}
                        </div>
                        <span
                            className="ms-2"
                            style={{ fontSize: "12px", color: "#aaa" }}
                        >
                            Đã bán {props.book.soldQuantity}
                        </span>
                    </div>
                    <div className="row mt-2" role="group">
                        <div className="col-6">
                            <Tooltip title="Yêu thích">
                                <IconButton
                                    size="small"
                                    color={isFavoriteBook ? "error" : "default"}
                                    onClick={() => {
                                    	handleFavoriteBook(props.book);
                                    }}
                                >
                                    <FavoriteIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div className="col-6 text-end">
                            {props.book.quantity !== 0 && (
                                <Tooltip title="Thêm vào giỏ hàng">
                                    <button
                                        className="btn btn-primary btn-block"
                                        onClick={() => handleAddProduct(props.book)}
                                    >
                                        <i className="fas fa-shopping-cart"></i>
                                    </button>
                                </Tooltip>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookProps;
