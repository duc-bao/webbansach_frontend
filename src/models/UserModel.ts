class UserModel{
    idUser: number
    firstName:string
    lastName: string
    userName:string
    password: string
    dateOfBirth: Date
    gender: string
    email: string
    phoneNumber:string
    purchaseAdrress :string
    deliveryAdress:string
    avatar:string
    enabled:boolean
    activationCode:string
    constructor(idUser: number,
        firstName:string,
        lastName:string,
        userName:string,
        password: string,
        dateOfBirth: Date,
        gender: string,
        email: string,
        phoneNumber:string,
        purchaseAdrress :string,
        deliveryAdress:string,
        avatar:string,
        enabled:boolean,
        activationCode:string){
            this.idUser = idUser
            this.firstName = firstName
            this.lastName = lastName
            this.userName = userName
            this.password = password 
            this.dateOfBirth = dateOfBirth
            this.gender = gender
            this.email = email
            this.phoneNumber = phoneNumber
            this.purchaseAdrress = purchaseAdrress
            this.deliveryAdress = deliveryAdress
            this.avatar = avatar
            this.enabled = enabled
            this.activationCode = activationCode
    }
}
export default UserModel;