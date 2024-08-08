import CartItemModel from "../models/CartItemModel";
import OrderModel from "../models/OrderModel";
import UserModel from "../models/UserModel";
import { my_request } from "./Request";

// Hàm để lấy thông tin người dùng
async function fetchUser(url: string): Promise<UserModel | undefined> {
    try {
        const response = await my_request(url);
        if (response) {
            return response; // Assuming response is already of type UserModel
        }
    } catch (error) {
        console.error(`Failed to fetch user data from ${url}`, error);
    }
    return undefined;
}
export async function getAllOrders(): Promise<OrderModel[]> {
    try {
       const endpoint: string = "http://localhost:8080/orders?sort=idOrder,desc&size=100000";
       const response = await my_request(endpoint);
 
       const datas = await Promise.all(response._embedded.orders.map(async (data: any) => {
          const responsePayment = await my_request( `http://localhost:8080/orders/${data.idOrder}/payment`);
          const responseUser = await my_request(`http://localhost:8080/orders/${data.idOrder}/user`)
          return {
             idOrder: data.idOrder,
             deliveryAddress: data.deliveryAddress,
             totalPrice: data.totalPrice,
             totalPriceProduct: data.totalPriceProduct,
             feeDelivery: data.feeDelivery,
             feePayment: data.feePayment,
             dateCreated: data.dateOrder,
             status: data.status,
             user: responseUser.lastName,
             fullName: data.fullName,
             note: data.note,
             payment: responsePayment.namePayment,
          };
          
       }));
       
       return datas;
    } catch (error) {
       console.error("Error while fetching orders:", error);
       throw error;
    }
 }

export async function getAllOrderByIdUser(idUser:any): Promise<OrderModel[]>{
    const endpoint = `http://localhost:8080/users/${idUser}/orderList?sort=idOrder,desc`;

    const response = await my_request(endpoint);
    const datas = Promise.all(response._embedded.orders.map(async(data:any) =>{
        const responsePayment = await my_request(`http://localhost:8080/orders/${data.idOrder}/payment`);
        const respnseUser = await my_request(`http://localhost:8080/orders/${data.idOrder}/user`);
        const order: OrderModel = {
            idOrder: data.idOrder,
            deliveryAddress: data.deliveryAddress,
            totalPrice: data.totalPrice,
            totalPriceProduct: data.totalPriceProduct,
            feeDelivery: data.feeDelivery,
            feePayment: data.feePayment,
            dateCreated: data.dateOrder,
            status: data.status,
            user: respnseUser,
            fullName: data.fullName,
            note: data.note,
            payment: responsePayment.namePayment,
         }
         return order;
    }))
    return datas;
}

export async function get1Order(id:any):Promise<OrderModel> {
    const url = `http://localhost:8080/orders/${id}`;
    const responseOrder = await my_request(url);
    const respnseUser = await my_request(`http://localhost:8080/orders/${id}/user`)
    const responsePayment = await my_request(`http://localhost:8080/orders/${id}/payment`);
    const responseOD = await my_request(`http://localhost:8080/orders/${id}/orderDetailList`);
    let cartItem : CartItemModel[] = [];
    await Promise.all(responseOD._embedded.orderDetails.map(async(orderDetail : any) =>{
        const responseBook = await my_request(`http://localhost:8080/order-details/${orderDetail.idOrderDetail}/book`);
        cartItem.push({book : responseBook, quantity : orderDetail.quantity, review : orderDetail.review});
    }))
    const order: OrderModel = {
        idOrder: responseOrder.idOrder,
        deliveryAddress: responseOrder.deliveryAddress,
        totalPrice: responseOrder.totalPrice,
        totalPriceProduct: responseOrder.totalPriceProduct,
        feeDelivery: responseOrder.feeDelivery,
        feePayment: responseOrder.feePayment,
        dateCreated: responseOrder.dateOrder,
        status: responseOrder.status,
        user: respnseUser.user,
        fullName: responseOrder.fullName,
        phoneNumber: responseOrder.phoneNumber,
        note: responseOrder.note,
        cartItems: cartItem,
        payment: responsePayment.namePayment,
     }
     return order;
}