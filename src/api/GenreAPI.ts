import React from "react";  
import { my_request } from "./Request";
import CategoryModel from "../models/CategoryModel";
interface resultInterface {
    genreList: CategoryModel[];
    genre: CategoryModel;
 }
export async function getGenre(endpoint:string):Promise<resultInterface> {
    const response = await my_request(endpoint);
    // Lấy ra danh sách quyển sách
    const genreList: any = response._embedded.categories.map((genreData:any) =>({
        ...genreData,
    }))
    return {genreList:genreList, genre:response.categories};
}

export async function getAllGenre():Promise<resultInterface> {
    const url = "http://localhost:8080/categories?sort=idCategory";
    return getGenre(url);
}
export async function getGenreByIdBook(idBook:number):Promise<resultInterface>{
    const url = `http://localhost:8080/books/${idBook}/categoryList`;
    return getGenre(url);
}
export async function getGenreByID(id : number) {
    const url = `http://localhost:8080/categories/${id}`
    return getGenre(url);
}