import { useEffect, useState } from "react";
import { getHotBook } from "../../api/BookAPI";
import BookModel from "../../models/BookModel";
import { Skeleton } from "@mui/material";
import BookProps from "./components/BookProps";
interface HotBookListInterface {}
const HotBookList: React.FC<HotBookListInterface> = (props) => {
    const [bookList, setBookList] = useState<BookModel[]>([]);
    const [loadData, setLoadData] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getHotBook().then(
            bookData =>{
                setBookList(bookData.result);
                setLoadData(false);
            }
        ).catch(
            error =>{
                setError(error.message);
                setLoadData(false);
            }
        );
    });
    if(loadData){
        return (
			<div className='container-book container mb-5 py-5 px-5 bg-light'>
				<div className='row'>
					<div className='col-md-6 col-lg-3 mt-3'>
						<Skeleton
							className='my-3'
							variant='rectangular'
							height={400}
						/>
					</div>
					<div className='col-md-6 col-lg-3 mt-3'>
						<Skeleton
							className='my-3'
							variant='rectangular'
							height={400}
						/>
					</div>
					<div className='col-md-6 col-lg-3 mt-3'>
						<Skeleton
							className='my-3'
							variant='rectangular'
							height={400}
						/>
					</div>
					<div className='col-md-6 col-lg-3 mt-3'>
						<Skeleton
							className='my-3'
							variant='rectangular'
							height={400}
						/>
					</div>
				</div>
			</div>
		);
    }
    if (error) {
		return (
			<div>
				<h1>Gặp lỗi: {error}</h1>
			</div>
		);
	}
    return(
        <div className='container-book container mb-5 pb-5 px-5 bg-light'>
			<h2 className='mt-4 px-3 py-3 mb-0'>SÁCH HOT</h2>
			<hr className='mt-0' />
			<div className='row'>
				{bookList.map((book) => (
					<BookProps key={book.idBook} book={book} />
				))}
			</div>
		</div>
    )
};

export default HotBookList;