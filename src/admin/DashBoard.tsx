

import { useEffect, useState } from "react";
import { getAllUser } from "../api/UserAPI";
import OrderModel from "../models/OrderModel";
import { getAllOrders } from "../api/OrderAPI";
import { getTotalNumberOfBooks } from "../api/BookAPI";
import { getTotalNumberOfFeedbacks } from "../api/FeedbackAPI";
import { getTotalNumberOfReviews } from "../api/ReviewAPI";
import { ParameterDigital } from "./component/ParameterDigital";
import { Chart } from "./component/Chart";
import { RequireAdmin } from "./RequireAdmin";


const Dashboard = () => {
	const [totalPrice, setTotalPrice] = useState(0);
	const [numberOfAccount, setNumberOfAccount] = useState(0);
	const [numberOfOrder, setNumberOfOrder] = useState(0);
	const [totalNumberOfBooks, setTotalNumberOfBooks] = useState(0);
	const [totalNumberOfFeedbacks, setTotalNumberOfFeedbacks] = useState(0);
	const [totalNumberOfReviews, setTotalNumberOfReviews] = useState(0);
	const [orders, setOrders] = useState<OrderModel[]>([]);

	// Lấy tổng số account
	useEffect(() => {
		getAllUser()
			.then((response) => {
				setNumberOfAccount(response.flat().length);
			})
			.catch((error) => console.log(error));
	}, []);

	// Lấy tổng số hoá đơn và tổng tiền kiếm được
	useEffect(() => {
		getAllOrders()
			.then((response) => {
				setOrders(response);
				const numberOfOrders = response.length;
				setNumberOfOrder(numberOfOrders);
				const totalPriceResponse = response.reduce((prevValue, order) => {
					if (order.status === "Thành công") {
						return prevValue + order.totalPrice;
					}
					return prevValue;
				}, 0);
				setTotalPrice(totalPriceResponse);
			})
			.catch((error) => console.log(error));
	}, []);

	// Lấy tổng số sách
	useEffect(() => {
		getTotalNumberOfBooks()
			.then((response) => {
				setTotalNumberOfBooks(response);
			})
			.catch((error) => console.log(error));
	}, []);

	// Lấy tổng số feedback
	useEffect(() => {
		getTotalNumberOfFeedbacks()
			.then((response) => {
				setTotalNumberOfFeedbacks(response);
			})
			.catch((error) => console.log(error));
	}, []);

	// Lấy tổng số review
	useEffect(() => {
		getTotalNumberOfReviews()
			.then((response) => {
				setTotalNumberOfReviews(response);
			})
			.catch((error) => console.log(error));
	}, []);
	return (
		<div>
			<ParameterDigital
				totalPrice={totalPrice}
				numberOfAccount={numberOfAccount}
				numberOfOrder={numberOfOrder}
				totalNumberOfBooks={totalNumberOfBooks}
				totalNumberOfFeedbacks={totalNumberOfFeedbacks}
				totalNumberOfReviews={totalNumberOfReviews}
			/>
			<Chart orders={orders} />
		</div>
	);
};

const DashboardPage = RequireAdmin(Dashboard);
export default DashboardPage;