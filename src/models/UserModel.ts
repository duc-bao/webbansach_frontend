import RoleModel from "./RoleModel";

class UserModel {
    idUser: number;
    firstName: string;
    lastName: string;
    userName: string;
    password?: string;
    dateOfBirth: Date;
    gender: string;
    email: string;
    phoneNumber: string;
    purchaseAdrress?: string;
    deliveryAdress: string;
    avatar: string;
    enabled?: boolean;
    activationCode?: string;
    role?: number;
    constructor(idUser: number,
        dateOfBirth: Date,
        deliveryAddress: string,
        purchaseAddress: string,
        email: string,
        firstName: string,
        lastName: string,
        gender: string,
        password: string,
        phoneNumber: string,
        username: string, avatar: string) {
        this.idUser = idUser;
        this.dateOfBirth = dateOfBirth;
        this.deliveryAdress = deliveryAddress;
        this.purchaseAdrress = purchaseAddress;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.userName = username;
        this.avatar = avatar;
     }
}
export default UserModel;
