import React from "react";
import BookModel from "../models/BookModel";
import { my_request } from "./Request";
import { GetAllImage } from "./ImageAPI";
import { getAllGenre, getGenreByID } from "./GenreAPI";
import CategoryModel from "../models/CategoryModel";
interface resultInterface {
    // Tạo ra các biến trả về
    result: BookModel[];
    totalPage: number;
    size: number;
}
export async function getBook(endpoint: string): Promise<resultInterface> {
    // Xác định endpoint
    const url: string = endpoint;
    // Gọi phương thức request
    const result: BookModel[] = [];
    const response = await my_request(url);
    const responseData = response._embedded.books;
    const totalPage: number = response.page.totalPages;
    const size: number = response.page.totalElements;
    for (const key in responseData) {
        result.push({
            idBook: responseData[key].idBook,
            nameBook: responseData[key].nameBook,
            listPrice: responseData[key].listPrice,
            sellPrice: responseData[key].sellPrice,
            quantity: responseData[key].quantity,
            description: responseData[key].description,
            avgRating: responseData[key].avgRating,
            soldQuantity: responseData[key].soldQuantity,
            discountPercent: responseData[key].discountPercent,
            author: responseData[key].author,
        });
    }
    const bookList1 = await Promise.all(
        result.map(async (book: BookModel) => {
            const responseImg = await GetAllImage(book.idBook);
            const thumbnail = responseImg.filter((image) => image.icon);
            return {
                ...book,
                thumbnail: thumbnail[0].linkImg,
            };
        })
    );

    return { result: result, totalPage: totalPage, size: size };
}

export async function getAllBook(size?: number, page?: number): Promise<resultInterface> {
    if (!size) {
        size = 12;
     }
    const url: string = `http://localhost:8080/books?sort=idBook,desc&size=${size}&page=${page}`;
    return getBook(url);
}
export async function get3Book(): Promise<resultInterface> {
    const url: string =
        "http://localhost:8080/books?sort=idBook,desc&page=0&size=3";
    return getBook(url);
}
export async function searchBookAll(
    keywordSearch?: string
): Promise<resultInterface> {
    let url = `http://localhost:8080/books?sort=idBook,desc&size=8&page=0`;
    if (keywordSearch !== "") {
        url = `http://localhost:8080/books/search/findByNameContaining?sort=idBook,desc&size=8&page=0&nameBook=${keywordSearch}`;
    }
    return getBook(url);
}
export async function searchBook(
    keySearch?: string,
    idGenre?: number,
    filter?: number,
    size?: number,
    page?: number
): Promise<resultInterface> {
    // Nếu key search không undifined
    if (keySearch) {
        keySearch = keySearch.trim();
    }
    const optionsShow = `size=${size}&page=${page}`;
    let url: string = `http://localhost:8080/books?${optionsShow}`;
    let filterEndpoint = "";
    if (filter === 1) {
        filterEndpoint = "sort=nameBook";
    } else if (filter === 2) {
        filterEndpoint = "sort=nameBook,desc";
    } else if (filter === 3) {
        filterEndpoint = "sort=sellPrice";
    } else if (filter === 4) {
        filterEndpoint = "sort=sellPrice,desc";
    } else if (filter === 5) {
        filterEndpoint = "sort=soldQuantity,desc";
    }
    // Nếu có key search và không có lọc thể loại

    if (keySearch !== "") {
        url = `http://localhost:8080/books/search/findByNameBookContaining?nameBook=${keySearch}&${optionsShow}&${filterEndpoint}`;
    }
    // Nếu idGenre không undifined
    if (idGenre !== undefined) {
        // Nếu có không có key search và có lọc thể loại
        if (keySearch === "" && idGenre > 0) {
            url = `http://localhost:8080/books/search/findByCategoryList_IdCategory?idCategory=${idGenre}&${optionsShow}`;
        }
        // Chỉ lọc filter
        if (
            keySearch === "" &&
            (idGenre === 0 || typeof idGenre === "string")
        ) {
            url = `http://localhost:8080/books?${optionsShow}&${filterEndpoint}`;
        }
    }
    return getBook(url);
}

//Lấy danh sách sách hot ra
export async function getHotBook(): Promise<resultInterface> {
    const url = "http://localhost:8080/books?sort=avgRating,desc&size=4";
    return getBook(url);
}

export async function getBookId(idBook: number): Promise<BookModel | null> {
    let bookResponse: BookModel = {
        idBook: 0,
        nameBook: "",
        author: "",
        description: "",
        listPrice: NaN,
        sellPrice: NaN,
        quantity: NaN,
        avgRating: NaN,
        soldQuantity: NaN,
        discountPercent: NaN,
        thumbnail: "",
    };
    const url: string = `http://localhost:8080/books/${idBook}`;
    try {
        // Gọi phương thức request()
        const request = await my_request(url);
       
        // Kiểm tra xem dữ liệu endpoint trả về có dữ liệu không
        if (request) {
            bookResponse = request;
            // Trả về quyển sách
            const responseImg = await GetAllImage(request.idBook);
            const thumbnail = responseImg.filter((image) => image.icon);
            return {
                ...bookResponse,
                thumbnail: thumbnail[0].linkImg,
            };
        } else {
            throw new Error("Sách không tồn tại");
        }
    } catch (error) {
        console.error("Error: ", error);
        return null;
    }
}

export async function getBookByIdAllInformation(
    idBook: number
): Promise<BookModel | null> {
    let bookResponse: BookModel = {
        idBook: 0,
        nameBook: "",
        author: "",
        description: "",
        listPrice: NaN,
        sellPrice: NaN,
        quantity: NaN,
        avgRating: NaN,
        soldQuantity: NaN,
        discountPercent: NaN,
        thumbnail: "",
        relatedImg: [],
        idGenres: [],
        genresList: [],
    };
    try{
        const response = await getBookId(idBook);
        if(response){
            bookResponse = response;
            const imageList = await GetAllImage(response.idBook);
            const thumbnail = imageList.find((image) =>image.icon);
            const relatedImg =imageList.map((image) =>{
                return !image.icon ? image.linkImg || image.dataImg : null
            }).filter(Boolean);
            bookResponse = { ...bookResponse, relatedImg: relatedImg as string[], thumbnail: thumbnail?.linkImg || thumbnail?.dataImg };
            // Lấy tất cả các thể loại
            const genresList = await getGenreByID(response.idBook);
            genresList.genreList.forEach((genre) =>{
                const dataGenre : CategoryModel = {idCategory: genre.idCategory, nameCategory: genre.nameCategory}
                bookResponse = {...bookResponse, genresList:[...bookResponse.genresList || [], dataGenre]};
            })
            return bookResponse;
        }else {
            throw new Error("Sách không tồn tại");
         }
    }catch (error) {
        console.error('Error: ', error);
        return null;
     }
}

export async function getBookByIdCartItem(idCart: number): Promise<BookModel | null> {
    const endpoint: string = `http://localhost:8080/cart-items/${idCart}/book`;
    try {
         // Gọi phương thức request()
      const response = await my_request(endpoint);

      // Kiểm tra xem dữ liệu endpoint trả về có dữ liệu không
      if (response) {

         // Trả về quyển sách
         return response;
      } else {
         throw new Error("Sách không tồn tại");
      }
    }catch (error) {
        console.log('Error: ', error);
        return null;    
    }
}
