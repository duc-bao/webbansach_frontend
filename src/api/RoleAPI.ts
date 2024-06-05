import RoleModel from "../models/RoleModel";
import { my_request, requestAdmin } from "./Request";

export async function getAllRole():Promise<RoleModel[]> {
    const endpoint  = `http://localhost:8080/roles`;

    const response = await requestAdmin(endpoint);
    const rolesList: RoleModel[] = response._embedded.roles.map((role: any) => ({
        ...role,
     }));
     return rolesList;
}

export async function getRoleByIdUser(idUser: any): Promise<RoleModel> {
    const endpoint = `http://localhost:8080/users/${idUser}/roleList`;
    // Gọi phương thức request()
    const response = await my_request(endpoint);
 
    const rolesList: RoleModel[] = response._embedded.roles.map((role: any) => ({
       ...role,
    }));
 
    return rolesList[0];
 }