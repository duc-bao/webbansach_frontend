import CategoryModel from "./CategoryModel";

class BookModel {
    idBook: number;
    nameBook?: string; //CO the null
    author?: string;
    ISBN?: string;
    listPrice?: number;
    sellPrice?: number;
    quantity?: number;
    description?: string;
    avgRating?: number;
    soldQuantity?: number;
    thumbnail?: string;
    discountPercent?: number;
    relatedImg?: string[];
    idGenres?: number[];
    genresList?: CategoryModel[];
    constructor(
        idBook: number,
        nameBook: string, //CO the null
        author: string,
        ISBN: string,
        listPrice: number,
        sellPrice: number,
        quantity: number,
        description: string,
        avgRating: number,
        soldQuantity: number,
        thumbnail: string,
        discountPercent: number,
        genresList: CategoryModel[]
    ) {
        this.idBook = idBook;
        this.nameBook = nameBook;
        this.author = author;
        this.ISBN = ISBN;
        this.listPrice = listPrice;
        this.sellPrice = sellPrice;
        this.quantity = quantity;
        this.description = description;
        this.avgRating = avgRating;
        this.soldQuantity = soldQuantity;
        this.discountPercent = discountPercent;
        this.thumbnail = thumbnail;
        
    }
}
export default BookModel;
