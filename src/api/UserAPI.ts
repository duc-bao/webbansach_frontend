import UserModel from "../models/UserModel";
import { my_request, requestAdmin } from "./Request";


async function getUser(url:string):Promise<UserModel>{
    // Gọi phương thức request()
    const response = await my_request(url);
    return response;
}
export async function getUserByIdReview(idReview:number) {
    const url:string = `http://localhost:8080/reviews/${idReview}/user`;
    return getUser(url);
}
export async function getAllUser() : Promise<UserModel[]> {
    const url = `http://localhost:8080/roles`
    const response =   await requestAdmin(url);
    const data  = response._embedded.roles.map((role:any) =>{
        const users =  role._embedded.users.map((userData:any) =>{
            const user : UserModel = {
                idUser: userData.idUser,
                avatar: userData.avatar,
                dateOfBirth: userData.dateOfBirth,
                deliveryAdress: userData.deliveryAddress,
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                gender: userData.gender,
                phoneNumber: userData.phoneNumber,
                userName: userData.username,
                role: role.nameRole,
             };
             return user;
        })
        return users;
    })
    return data;
}