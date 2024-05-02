import UserModel from "../models/UserModel";
import { my_request } from "./Request";


async function getUser(url:string):Promise<UserModel>{
    // Gọi phương thức request()
    const response = await my_request(url);
    return response;
}
export async function getUserByIdReview(idReview:number) {
    const url:string = `http://localhost:8080/reviews/${idReview}/user`;
    return getUser(url);
}