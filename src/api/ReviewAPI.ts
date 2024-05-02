import ReviewModel from "../models/ReviewModel";
import { my_request } from "./Request";

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