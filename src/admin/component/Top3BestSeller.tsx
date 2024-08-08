import { useEffect, useState } from "react";

import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import BookModel from "../../models/BookModel";
import TextEllipsis from "../../layout/Products/components/text-elip/TextElipsis";
import { get3BestSellerBooks } from "../../api/BookAPI";

const Top3BestSeller = () => {
	// Lấy dữ liệu top 4 sách được mua nhiều nhất
	const [top3BestSeller, setTop3BestSeller] = useState<BookModel[]>([]);
	useEffect(() => {
		get3BestSellerBooks()
			.then((response) => {
				setTop3BestSeller(response);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	return (
		<table className='table table-striped table-hover'>
			<thead>
				<tr>
					<th scope='col'>ID</th>
					<th scope='col'>ẢNH</th>
					<th scope='col'>TÊN SÁCH</th>
					<th scope='col'>ĐÃ BÁN</th>
				</tr>
			</thead>
			<tbody>
				{top3BestSeller.map((book) => {
					return (
						<tr key={book.idBook}>
							<th scope='row'>{book.idBook}</th>
							<td>
								<Link
									to={`/book/${book.idBook}`}
									className='d-inline text-black'
								>
									<img src={book.thumbnail} alt='' width={30} />
								</Link>
							</td>
							<Tooltip title={book.nameBook} arrow>
								<td>
									<Link
										to={`/book/${book.idBook}`}
										className='d-inline text-black'
									>
										<TextEllipsis
											text={book.nameBook + ""}
											limit={25}
										/>
									</Link>
								</td>
							</Tooltip>
							<td>{book.soldQuantity}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default Top3BestSeller;