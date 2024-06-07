import CartItemModel from "./CartItemModel"
import UserModel from "./UserModel"

class OrderModel{
    idOrder: number
    dateOrder: Date
    purchaseAddress?: string
    deliveryAddress: string
    totalPriceProduct: number
    feePayment: number
    status: string
    note?: string
    phoneNumber?: string
    fullName?: string
    feeDelivery: number
    totalPrice: number
    statusPayment?: string
    statusDelivery?: string
    user ?: UserModel
    payment?: string;
    cartItems?: CartItemModel[];
    constructor(idOrder: number,
        deliveryAddress: string,
        totalPrice: number,
        totalPriceProduct: number,
        feeDelivery: number,
        feePayment: number,
        dateOrder: Date,
        user: UserModel,
        status: string,) {
        this.idOrder = idOrder;
        this.deliveryAddress = deliveryAddress;
        this.totalPrice = totalPrice;
        this.dateOrder = dateOrder;
        this.status = status;
        this.feeDelivery = feeDelivery;
        this.feePayment = feePayment;
        this.totalPriceProduct = totalPriceProduct;
        this.user = user;
     }
    

}
export default OrderModel;