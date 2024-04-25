class OrderDetailModel{
    idOrderDetail: number
    isReview:boolean
    quantity:number
    price:number
    constructor(idOrderDetail: number,
        isReview:boolean,
        quantity:number,
        price:number){
            this.idOrderDetail = idOrderDetail
            this.isReview = isReview
            this.price = price
            this.quantity = quantity
    }
}
export default OrderDetailModel;