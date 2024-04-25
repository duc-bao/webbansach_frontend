class OrderModel{
    idOrder: number
    dateOrder: Date
    purchaseAddress: string
    deliveryAddress: string
    totalPriceProduct: number
    feePayment: number
    status: string
    note: string
    phoneNumber: string
    fullName: string
    feeDelivery: number
    totalPrice: number
    statusPayment: string
    statusDelivery: string
    constructor(idOrder: number,
        dateOrder: Date,
        purchaseAddress: string,
        deliveryAddress: string,
        totalPriceProduct: number,
        feePayment: number,
        status: string,
        note: string,
        phoneNumber: string,
        fullName: string,
        feeDelivery: number,
        totalPrice: number,
        statusPayment: string,
        statusDelivery: string){
            this.idOrder = idOrder
            this.dateOrder = dateOrder
            this.purchaseAddress = purchaseAddress
            this.deliveryAddress = deliveryAddress
            this.totalPriceProduct = totalPriceProduct
            this.feePayment = feePayment
            this.status = status
            this.note = note
            this.phoneNumber = phoneNumber
            this.fullName = fullName
            this.feeDelivery = feeDelivery
            this.totalPrice = totalPrice
            this.statusPayment = statusPayment
            this.statusDelivery = statusDelivery
    }

}
export default OrderModel;