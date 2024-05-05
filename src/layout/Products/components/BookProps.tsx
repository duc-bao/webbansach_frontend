import React, { useEffect, useState } from "react";
import BookModel from "../../../models/BookModel";
import ImageModel from "../../../models/ImageModel";
import Tooltip from "@mui/material/Tooltip";
import { IconButton } from "@mui/material";
import { GetAllImage } from "../../../api/ImageAPI";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TextEllipsis from "./text-elip/TextElipsis";
import { Link } from "react-router-dom";
import CartItemModel from "../../../models/CartItemModel";

interface BookPropInterface {
    book: BookModel;
	setTotalCart: any; 
}
const BookProps: React.FC<BookPropInterface> = ({ book ,setTotalCart}) => {
    const [imageList, setImageList] = useState<ImageModel[]>([]);
    const [loadData, setLoadData] = useState(true);
    const [errors, setError] = useState(null);
    const maxLines = 2;
    useEffect(() => {
        GetAllImage(book.idBook)
            .then((ImageData) => {
                setImageList(ImageData);
                setLoadData(false);
            })
            .catch((errors) => {
                setError(errors.message);
            });
    }, []);
	const handleAddProduct = (newBook: BookModel) => {
		const cartData: string | null = localStorage.getItem("cart");
		const cart: CartItemModel[] = cartData ? JSON.parse(cartData) : [];
		// cái isExistBook này sẽ tham chiếu đến cái cart ở trên, nên khi update thì cart nó cũng update theo
		let isExistBook = cart.find(
			(cartItem) => cartItem.book.idBook === newBook.idBook
		);
		// Thêm 1 sản phẩm vào giỏ hàng
		if (isExistBook) {
			// nếu có rồi thì sẽ tăng số lượng
			isExistBook.quantity += 1;
		} else {
			cart.push({
				quantity: 1,
				book: newBook,
			});
		}
		// Lưu vào localStorage
		localStorage.setItem("cart", JSON.stringify(cart));
		setTotalCart(cart.length);
	};
    return (
        <div className='col-md-6 col-lg-3 mt-3'>
			<div className='card position-relative'>
				{book.discountPercent !== 0 && (
					<h4
						className='my-0 d-inline-block position-absolute end-0'
						style={{ top: "15px" }}
					>
						{book.quantity === 0 ? (
							<span className='badge bg-danger'>Hết hàng</span>
						) : (
							<span className='badge bg-primary'>
								{book.discountPercent}%
							</span>
						)}
					</h4>
				)}
				<Link to={`/book/${book.idBook}`}>
					{
                        imageList[0] && imageList[0].linkImg &&(
                            <img
                            src={`${imageList[0].linkImg}`}
                            className="card-img-top"
                            alt={book.nameBook}
                            style={{ height: "300px" }}
                        />
                        )
                    }
				</Link>
				<div className='card-body'>
					<Link
						to={`/book/${book.idBook}`}
						style={{ textDecoration: "none" }}
					>
						<h5 className='card-title'>
							<Tooltip title={book.nameBook} arrow>
								<span>
									<TextEllipsis text={book.nameBook + ""} limit={20} />
								</span>
							</Tooltip>
						</h5>
					</Link>
					<div className='price mb-3 d-flex align-items-center justify-content-between'>
						<div className='d-flex align-items-center'>
							<span className='discounted-price text-danger'>
								<strong style={{ fontSize: "22px" }}>
									{book.sellPrice?.toLocaleString()}đ
								</strong>
							</span>
							{book.discountPercent !== 0 && (
								<span className='original-price ms-3 small fw-bolder'>
									<del>{book.listPrice?.toLocaleString()}đ</del>
								</span>
							)}
						</div>
						<span
							className='ms-2'
							style={{ fontSize: "12px", color: "#aaa" }}
						>
							Đã bán {book.soldQuantity}
						</span>
					</div>
					<div className='row mt-2' role='group'>
						<div className='col-6'>
							<Tooltip title='Yêu thích'>
								<IconButton
									size='small'
									// color={isFavoriteBook ? "error" : "default"}
									// onClick={() => {
									// 	handleFavoriteBook(book);
									// }}
								>
									<FavoriteIcon />
								</IconButton>
							</Tooltip>
						</div>
						<div className='col-6 text-end'>
							{book.quantity !== 0 && (
								<Tooltip title='Thêm vào giỏ hàng'>
									<button
										className='btn btn-primary btn-block'
										onClick={() => handleAddProduct(book)}
									>
										<i className='fas fa-shopping-cart'></i>
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
