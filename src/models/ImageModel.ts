class ImageModel{
    idImage: number
    nameImg: string
    icon: boolean
    linkImg: string
    dataImg: string
    constructor(
        idImage: number,
    nameImg: string,
    icon: boolean,
    linkImg: string,
    dataImg: string,
    ){
        this.idImage = idImage;
        this.nameImg = nameImg;
        this.icon = icon;
        this.linkImg = linkImg;
        this.dataImg = dataImg;
    }

    
}

export default ImageModel;