class PaymentModel{
    idPayment: number
    namePayment: string
    description: string
    feePayment: number
    constructor(idPayment: number,
        namePayment: string,
        description: string,
        feePayment: number){
            this.idPayment = idPayment
            this.description = description;
            this.namePayment = namePayment;
            this.feePayment = feePayment
    }
}
export default PaymentModel;