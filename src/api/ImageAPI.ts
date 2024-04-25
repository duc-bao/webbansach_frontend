import React from "react";
import ImageModel from "../models/ImageModel";
import { my_request } from "./Request";
import BookModel from "../models/BookModel";

export async function GetImage(endpoint: string) {
    const result: ImageModel[] = [];

    const response = await my_request(endpoint);

    // Lấy ra json sach
    const responseData = response._embedded.images;
    // console.log(responseData);

    for (const key in responseData) {
        result.push({
            idImage: responseData[key].idImage,
            nameImg: responseData[key].nameImg,
            icon: responseData[key].icon,
            dataImg: responseData[key].dataImg,
            linkImg: responseData[key].linkImg,
        });
    }

    return result;
}

export async function GetAllImage(idBook: number): Promise<ImageModel[]> {
    const url: string = `http://localhost:8080/books/${idBook}/imageList`;
    return GetImage(url);
}

export async function GetOneImage(idBook: number): Promise<ImageModel[]> {
    const url: string = `http://localhost:8080/books/${idBook}/imageList?sort=idBook,asc&page=0&size=1`;
    return GetImage(url);
}
