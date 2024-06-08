import FeedbackModel from "../models/FeedbackModel";
import { my_request } from "./Request";

export async function getAllFeedBack() : Promise<FeedbackModel[]> {
    const url = `http://localhost:8080/feedbacks`;
    const response = await my_request(url); 
    
    // let feedbacks : FeedbackModel[];
    if(response){
        const feedbacks = Promise.all( response._embedded.feedBacks.map( async (item:any) =>{
            const responseUser = await my_request(`http://localhost:8080/feedbacks/${item.idFeedback}/user`)
            const feedback : FeedbackModel = {
                idFeedback: item.idFeedback,
                title: item.title,
                comment: item.comment,
                dateCreated: item.dateCreated,
                readed: item.readed,
                user: responseUser.username
            }
            return feedback;
        }))
        return feedbacks;
    }else{
        return []; // <-- Return an empty array when response is falsy
    }

}