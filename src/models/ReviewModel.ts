class ReviewModel{
    idReview: number
    comment: string
    ratingPoint:number
    dateCreated:Date
    constructor(idReview: number,
        comment: string,
        ratingPoint:number,
        dateCreated:Date){
        this.idReview = idReview
        this.comment = comment
        this.dateCreated = dateCreated
        this.ratingPoint  =ratingPoint
    }
}
export default ReviewModel