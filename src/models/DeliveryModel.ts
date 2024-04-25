class DeliveryModel {
    idDelivery: number;
    nameDelivery: string;
    description: string;
    feeDelivery: number;
    constructor(
        idDelivery: number,
        nameDelivery: string,
        description: string,
        feeDelivery: number
    ) {
        this.idDelivery = idDelivery;
        this.nameDelivery = nameDelivery;
        this.description = description;
        this.feeDelivery = feeDelivery;
    }
}
export default DeliveryModel;
