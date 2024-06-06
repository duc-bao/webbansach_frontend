import React, { useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";

import { Button, Chip } from "@mui/material";
import RateReviewRoundedIcon from "@mui/icons-material/RateReviewRounded";
import DoneIcon from "@mui/icons-material/Done";
import { FadeModal } from "../../utils/FadeModal";

import { Link } from "react-router-dom";
import CartItemModel from "../../../models/CartItemModel";
import ImageModel from "../../../models/ImageModel";
import { GetAllImage } from "../../../api/ImageAPI";
import TextEllipsis from "./text-elip/TextElipsis";
import { ReviewForm } from "./review/ReviewFomr";

interface BookHorizontalProps {
	cartItem: CartItemModel;
	type?: any;
	idOrder?: number;
	handleCloseModalOrderDetail?: any;
	statusOrder?: string;
}

export const BookHorizontal: React.FC<BookHorizontalProps> = (props) => {
	// Mở/Đóng modal
	const [openModal, setOpenModal] = React.useState(false);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);

	const [cartItem, setCartItem] = useState<CartItemModel>(props.cartItem);

	const [imageList, setImageList] = useState<ImageModel[]>([]);
	// Lấy ảnh ra từ BE
	useEffect(() => {
		GetAllImage(props.cartItem.book.idBook)
			.then((response) => {
				setImageList(response);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [props.cartItem.book.idBook]);
	// Loading ảnh thumbnail
	let dataImage;
	if (imageList[0]) {
		const thumbnail = imageList.filter((i) => i.icon);
		dataImage = thumbnail[0].linkImg || thumbnail[0].dataImg;
	}
	return (
		<div className='row'>
			<div className='col'>
				<div className='d-flex'>
					<img
						src={dataImage}
						className='card-img-top'
						alt={props.cartItem.book.nameBook}
						style={{ width: "100px" }}
					/>
					<div className='d-flex flex-column pb-2'>
						<Tooltip title={props.cartItem.book.nameBook} arrow>
							<Link
								to={`/book/${props.cartItem.book.idBook}`}
								className='d-inline text-black'
							>
								<TextEllipsis
									text={props.cartItem.book.nameBook + " "}
									limit={100}
								/>
							</Link>
						</Tooltip>
						<div className='mt-auto'>
							<span className='discounted-price text-danger'>
								<strong style={{ fontSize: "22px" }}>
									{props.cartItem.book.sellPrice.toLocaleString()}đ
								</strong>
							</span>
							<span
								className='original-price ms-3 small'
								style={{ color: "#000" }}
							>
								<del>
									{props.cartItem.book.listPrice.toLocaleString()}đ
								</del>
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className='col-2 text-center'>
				<strong>{props.cartItem.quantity}</strong>
			</div>
			<div className='col-2 text-center'>
				<span className='text-danger'>
					<strong>
						{(
							props.cartItem.quantity * props.cartItem.book.sellPrice
						).toLocaleString()}
						đ
					</strong>
				</span>
			</div>
			{props.type === "view-customer" &&
				props.statusOrder === "Thành công" && (
					<div className='d-flex flex-row-reverse'>
						{props.cartItem.review === false ? (
							<>
								<Button
									variant='outlined'
									size='small'
									startIcon={<RateReviewRoundedIcon />}
									style={{ width: "150px" }}
									onClick={handleOpenModal}
								>
									Viết đánh giá
								</Button>
							</>
						) : (
							<>
								<Button
									className='mx-3'
									variant='outlined'
									size='small'
									startIcon={<RateReviewRoundedIcon />}
									style={{ width: "150px" }}
									onClick={handleOpenModal}
								>
									Xem đánh giá
								</Button>
								<Chip
									color='primary'
									label='Bạn đã đánh giá sản phẩm này rồi'
									icon={<DoneIcon />}
								/>
							</>
						)}
						<FadeModal
							open={openModal}
							handleOpen={handleOpenModal}
							handleClose={handleCloseModal}
						>
							<ReviewForm
								idOrder={props.idOrder ? props.idOrder : 0}
								idBook={props.cartItem.book.idBook}
								handleCloseModal={handleCloseModal}
								handleCloseModalOrderDetail={
									props.handleCloseModalOrderDetail
								}
								cartItem={cartItem}
								setCartItem={setCartItem}
							/>
						</FadeModal>
					</div>
				)}
			<hr className='mt-3' />
		</div>
	);
};