import BookModel from "./BookModel";

class CartItemModel {
    idCart?: number;
    quantity: number;
    book: BookModel;
    idUser?: number;
    review?: boolean;
    constructor(quantity: number, book: BookModel) {
        this.book = book;
        this.quantity = quantity;
    }
}
export default CartItemModel;
