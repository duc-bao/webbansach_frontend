import { useEffect, useState } from "react";
import ReviewModel from "../../../models/ReviewModel";
import User from "./user/User";
import { getAllReview } from "../../../api/ReviewAPI";
import RatingStar from "./Rating";

interface CommentInterface {
    idBook: number;
}
const Comment: React.FC<CommentInterface> = (props) => {
    const [reviews, setReviews] = useState<ReviewModel[] | null>(null);
    useEffect(() => {
        getAllReview(props.idBook).then((respose) => {
            setReviews(respose);
        });
    }, []);

    if (reviews?.length === 0) {
        return <p>Không có đánh giá nào</p>;
    }

    return (
        <>
            {reviews?.map((review, index) => {
                return (
                    <div className="mb-3" key={index}>
                        <div className="d-flex">
                            <User review={review}>
                                <div>
                                    <RatingStar
                                        readonly={true}
                                        ratingPoint={review.ratingPoint}
                                    />
                                    <p className="mb-0">{review.comment}</p>
                                </div>
                            </User>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default Comment;
