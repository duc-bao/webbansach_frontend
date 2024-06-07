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
// Hàm lấy danh sách user của từng role
async function getUsersByRole(userListUrl: string, roleName: number): Promise<UserModel[]> {
    const response = await requestAdmin(userListUrl);

    if (!response || !response._embedded || !response._embedded.users) {
        return [];
    }
    const users = response._embedded.users.map((userData: any) => {
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
            role: roleName, 
        };
        return user;
    });

    return users;
}

export async function getAllUser(): Promise<UserModel[]> {
    const url = `http://localhost:8080/roles`;
    const response = await requestAdmin(url);
    
    if (!response || !response._embedded || !response._embedded.roles) {
        throw new Error('Invalid response structure');
    }
    
    const roles = response._embedded.roles;
    let allUsers: UserModel[] = [];
    const userIdSet = new Set<number>();

    for (const roleData of roles) {
        const roleName = roleData.idRole;
        const userListUrl = roleData._links.userList.href;

        const users = await getUsersByRole(userListUrl, roleName);
       // Filter out duplicate users based on idUser
       users.forEach(user => {
        if (!userIdSet.has(user.idUser)) {
            userIdSet.add(user.idUser);
            allUsers.push(user);
        }
    });
    }
    console.log(allUsers);
    return allUsers;
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