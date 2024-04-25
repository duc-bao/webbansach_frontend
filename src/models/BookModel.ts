class BookModel{
    idBook: number;
    nameBook?: string; //CO the null
    author?: string
    ISBN?: string
    listPrice?: number
    sellPrice?: number
    quantity?:number
    description?: string
    avgRating?: number
    soldQuantity?:number
    discountPercent?: number
    constructor( idBook: number,
        nameBook: string, //CO the null
        author: string,        ISBN: string,        listPrice: number,        sellPrice: number,        quantity:number
,       description: string,        avgRating: number,        soldQuantity:number
,       discountPercent: number){
        this.idBook = idBook;
        this.nameBook  =nameBook;
        this.author = author;
        this.ISBN = ISBN;
        this.listPrice = listPrice;
        this.sellPrice = sellPrice;
        this.quantity = quantity;
        this.description = description;
        this.avgRating = avgRating;
        this.soldQuantity = soldQuantity;
        this.discountPercent = discountPercent; 
}
}
export default BookModel;