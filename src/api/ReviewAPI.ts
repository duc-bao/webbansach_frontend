import ReviewModel from "../models/ReviewModel";
import { my_request, requestAdmin } from "./Request";

async function getReview(url:string):Promise<ReviewModel[]> {
    const response = await my_request(url);
    return response._embedded.reviews.map((reviewData:any)=>({
        ...reviewData
    }))
}

export async function getAllReview(idBook:number):Promise<ReviewModel[]> {
    const url:string = `http://localhost:8080/books/${idBook}/reviewList`;
    return getReview(url);
}
export async function getTotalNumberOfReviews(): Promise<number> {
    const endpoint = "http://localhost:8080/reviews/search/countBy";
    try {
       const response = await requestAdmin(endpoint);
       if (response) {
          return response;
       }
    } catch (error) {
       throw new Error("Lỗi không gọi được endpoint lấy tổng review\n" + error);
    }
    return 0;
 }