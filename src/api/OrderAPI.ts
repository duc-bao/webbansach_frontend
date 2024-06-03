import OrderModel from "../models/OrderModel";
import { my_request } from "./Request";


export async function getOrder(url:string) {
    const response = await my_request(url);
    const orderList: any = response._embedded.orders.map((data : any) =>{
       const order: OrderModel = {
        idOrder: data.id,
        deliveryAddress: data.deliveryAddress,
         totalPrice: data.totalPrice,
         totalPriceProduct: data.totalPriceProduct,
         feeDelivery: data.feeDelivery,
         feePayment: data.feePayment,
         dateOrder: data.dateCreated,
         status: data.status,
         user: data._embedded.user,
       }
       return order;
    })
    return orderList;
}

export async function getAllOrder():Promise<OrderModel[]> {
    const url = 'http://localhost:8080/orders?sort=idOrder,asc'
    return getOrder(url);
}