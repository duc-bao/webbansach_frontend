    import React, { useEffect, useState } from "react";
import { GetOneImage } from "../../../api/ImageAPI";
import BookModel from "../../../models/BookModel";
import ImageModel from "../../../models/ImageModel";

    interface CarouselItemInterface {
        book: BookModel;
    }
    const CarouselItem: React.FC<CarouselItemInterface> = ({book}) => {
        const [imageList, setImageList] = useState<ImageModel[]>([]);
        const [loadData, setLoadData] = useState(true);
        const [errors, setError] = useState(null);
        useEffect(() => {
            if(book){
                GetOneImage(book.idBook)
                .then((ImageData) => {    
                    
                    setImageList(ImageData);
                    setLoadData(false);
                })
                .catch((errors) => {
                    setError(errors.message);
                });
            }
           
        }, [book]);
       
        return (
            <div>
            {imageList[0] && imageList[0].linkImg && <img
                src={`${imageList[0].linkImg}`}
                className="card-img-top img-fluid"
                alt={book.nameBook}
                style={{ maxHeight: "500px" }}  
            />}
        </div>
        );
    };

    export default CarouselItem;