    import React, { useEffect, useState } from "react";
    import BookModel from "../../../models/BookModel";
    import ImageModel from "../../../models/ImageModel";
    import Tooltip from "@mui/material/Tooltip";
    import { IconButton } from "@mui/material";
    import { GetAllImage } from "../../../api/ImageAPI";
    import FavoriteIcon from "@mui/icons-material/Favorite";

    interface BookPropInterface {
        book: BookModel;
    }
    const BookProps: React.FC<BookPropInterface> = ({ book }) => {
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
        return (
            <div className="col-md-3 mt-2">
                <div className="card" style={{height: "100%"}}>
                    {imageList[0] && imageList[0].linkImg && (
                        <img
                            src={`${imageList[0].linkImg}`}
                            className="card-img-top"
                            alt={book.nameBook}
                            style={{ height: "300px" }}
                        />
                    )}
                    <div className="card-body">
                        <h5 className="card-title">{book.nameBook}</h5>
                        <p
                            className="card-text"
                            style={{
                                display: "-webkit-box",
                                WebkitLineClamp: maxLines,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                            }}
                        >
                            {book.description}
                        </p>
                        <div className="price d-flex justify-content-between">
                            <span className="original-price">
                                <del>{book.listPrice}</del>
                            </span>
                            <span className="discounted-price  ml-2">
                                <strong>{book.sellPrice}</strong>
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
									<FavoriteIcon   />
								</IconButton>
							</Tooltip>
						</div>
						<div className='col-6'>
							{book.quantity !== 0 && (
								<Tooltip title='Thêm vào giỏ hàng'>
									<button
										className='btn btn-primary btn-block'
										// onClick={() => handleAddProduct(book)}
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
