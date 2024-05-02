	import { useEffect, useState } from "react";
	import ReviewModel from "../../../../models/ReviewModel";
	import UserModel from "../../../../models/UserModel";
	import { getUserByIdReview } from "../../../../api/UserAPI";
	import { Avatar } from "@mui/material";

	interface CommentProps{
		review: ReviewModel
		children: React.ReactNode;
	}

	const User:React.FC<CommentProps> = (props) =>{
		const [user, setUser] = useState<UserModel |null>(null);
		//Lấy user review sách
		useEffect(()=>{
			getUserByIdReview(props.review.idReview).then(
				(response) =>{
					setUser(response);
				}
			).catch()
		},[])
		const formatDate = (timestamp: string) => {
			const date = new Date(timestamp);

			const year = date.getFullYear();
			const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
			const day = date.getDate();
			const hours = date.getHours();
			const minutes = date.getMinutes();
			const seconds = date.getSeconds();

			return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
		};
		return(
			<>
				<div className='me-4 mt-1'>
					<Avatar>{user?.lastName[0]}</Avatar>
				</div>
				<div>
					<strong>{user?.userName}</strong>
					<span className='ms-2' style={{ fontSize: "12px", color: "#aaa" }}>
						{formatDate(props.review.dateCreated + "")}
					</span>
					{props.children}
				</div>
			</>
		)
	}

	export default User