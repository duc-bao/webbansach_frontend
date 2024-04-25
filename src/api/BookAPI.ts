import React from "react";
import BookModel from "../models/BookModel";
import { my_request } from "./Request";
import { GetAllImage } from "./ImageAPI";
interface resultInterface { // Tạo ra các biến trả về
    result: BookModel[];
    totalPage: number;
    size: number;
 }
export async function getBook(endpoint:string):Promise<resultInterface> {
    // Xác định endpoint
    const url :string = endpoint;
    // Gọi phương thức request
    const result: BookModel[] = [];
    const response  = await my_request(url);
    const responseData = response._embedded.books; 
    const totalPage: number = response.page.totalPages;
    const size: number = response.page.totalElements;
    for (const key in responseData) {
        result.push(
            {
                idBook: responseData[key].idBook,
                nameBook: responseData[key].name,
                listPrice:responseData[key].listPrice,
                sellPrice: responseData[key].sellPrice,
                quantity: responseData[key].quantity,
                description:responseData[key].description,
                avgRating: responseData[key].avgRating,
                soldQuantity: responseData[key].soldQuantity,
                discountPercent: responseData[key].discountPercent  
            }
        )
    }
    const bookList1 = await Promise.all(
        result.map(async (book: BookModel) => {
           const responseImg = await GetAllImage(book.idBook);
           const thumbnail = responseImg.filter(image => image.icon);
           return {
              ...book,
              thumbnail: thumbnail[0].linkImg,
           };
        })
     );

    return {result :result, totalPage: totalPage, size: size};
}


export async function getAllBook( page:number = 0):Promise<resultInterface> {

    const url: string = `http://localhost:8080/books?sort=idBook,desc&size=12&page=${page}`;
    return getBook(url);
}
export async function get3Book():Promise<resultInterface> {
    const url: string = "http://localhost:8080/books?sort=idBook,desc&page=0&size=3";
    return getBook(url);
}

export async function searchBook(nameBook:string) {
    let url: string = `http://localhost:8080/books?sort=idBook,desc&size=12&page=0`;
    if(nameBook !== ""){
        url = `http://localhost:8080/books/search/findByNameContaining?sort=idBook,desc&size=8&page=0&nameBook=${nameBook}`
    }
    return getBook(url);
}