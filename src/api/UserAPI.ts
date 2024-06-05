import UserModel from "../models/UserModel";
import { my_request, requestAdmin } from "./Request";
import { getRoleByIdUser } from "./RoleAPI";


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
    const data = response._embedded.roles.map((roleData: any) => {
        // Duyệt qua mảng listUsers trong mỗi vai trò (role)
        const users = roleData._embedded.listUsers.map( async(userData: any) => {
           // Xử lý các trường dữ liệu trong userData tại đây
           const user: UserModel = {
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
              role: roleData.nameRole,
           };
           return user;
        });
        return users;
     });
  
     return data;
}

export async function get1User(idUser : any): Promise<UserModel> {

    const url = `http://localhost:8080/users/${idUser}`
    const response = await my_request(url);
    const responseRole = await getRoleByIdUser(idUser);
    const user: UserModel = {
        idUser: response.idUser,
        avatar: response.avatar,
        dateOfBirth: response.dateOfBirth,
        deliveryAdress: response.deliveryAddress,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
        gender: response.gender,
        phoneNumber: response.phoneNumber,
        userName: response.username,
        role: responseRole.idRole,
     };
     return user;

}