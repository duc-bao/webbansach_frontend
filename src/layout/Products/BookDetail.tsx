import React, { useCallback, useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { useParams } from "react-router-dom";
import { ShoppingCartOutlined, X } from "@mui/icons-material";
import { getBookId } from "../../api/BookAPI";
import Skeleton from "react-loading-skeleton";
import ImageModel from "../../models/ImageModel";
import { GetAllImage } from "../../api/ImageAPI";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReactSimpleImageViewer from "react-simple-image-viewer";
import CategoryModel from "../../models/CategoryModel";
import { getGenreByIdBook } from "../../api/GenreAPI";
import { Button, Rating } from "@mui/material";
import RatingStar from "./components/Rating";
import SelectQuantity from "./components/SelectQuantity";
import { Carousel } from "react-responsive-carousel";
import ImageViewer from "react-simple-image-viewer";
import useScrollToTop from "../hooks/ScrollToTop";
import TextEllipsis from "./components/text-elip/TextElipsis";
import Comment from "./components/Comment";
interface BookDetailInterface {}

const BookDetail: React.FC<BookDetailInterface> = (props) => {
    useScrollToTop(); // Mỗi lần vào component này thì sẽ ở trên cùng
    // Lấy mã sách từ param
    const { idBook } = useParams();
    let idBookNumber: number = 0;
    //ep kieu number
    try {
        idBookNumber = parseInt(idBook + "");
        if (Number.isNaN(idBookNumber)) {
            idBookNumber = 0;
        }
    } catch (error) {
        console.error(error);
    }
    const [book, setBook] = useState<BookModel | null>(null);
    const [loadData, setLoading] = useState(true);
    const [error, setErroring] = useState(null);
    // Lấy sách ra
    useEffect(() => {
        if (idBookNumber !== 0) {
            getBookId(idBookNumber)
                .then((response) => {
                    if (response) {
                        // Gán giá trị thuộc tính 'name' cho 'nameBook'
                        response.nameBook = response.nameBook;
                        // Xóa thuộc tính 'name' để tránh trùng lặp
                        delete response.nameBook;
                        setBook(response);
                        setLoading(false);
                    } else {
                        // Xử lý trường hợp 'response' là null
                        // Ví dụ: hiển thị thông báo lỗi hoặc xử lý khác
                        console.error("Response is null");
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    setErroring(error.message);
                });
        }
    }, [idBookNumber]);
    // Lấy ra thể loại của sách
    const [genres, setGenres] = useState<CategoryModel[] | null>(null);
    useEffect(() => {
        getGenreByIdBook(idBookNumber).then((response) => {
            setGenres(response.genreList);
        });
    }, []);
    // Lấy ra hình ảnh của sách
    const [images, setImages] = useState<ImageModel[] | null>(null);
    useEffect(() => {
        GetAllImage(idBookNumber)
            .then((response) => {
                setImages(response);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    const [quantity, setQuantity] = useState(1);
    // Xử lý tăng số lượng
    const add = () => {
        if (quantity < (book?.quantity ? book?.quantity : 1)) {
            setQuantity(quantity + 1);
        }
    };

    // Xử lý giảm số lượng
    const reduce = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    // Viewer hình ảnh
    // Viewer hình ảnh
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    let imageList: string[] = [];
    if (images !== undefined && images !== null) {
        imageList = images.map((image) => {
            return image.linkImg || image.dataImg;
        }) as string[];
    }

    const openImageViewer = useCallback((index: number) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    if (loadData) {
        return (
            <div className="container-book container mb-5 py-5 px-5 bg-light">
                <div className="row">
                    <div className="col-md-6 col-lg-3 mt-3">
                        <Skeleton className="my-3" count={1} height={400} />
                    </div>
                    <div className="col-md-6 col-lg-3 mt-3">
                        <Skeleton className="my-3" count={1} height={400} />
                    </div>
                    <div className="col-md-6 col-lg-3 mt-3">
                        <Skeleton className="my-3" count={1} height={400} />
                    </div>
                    <div className="col-md-6 col-lg-3 mt-3">
                        <Skeleton className="my-3" count={1} height={400} />
                    </div>
                </div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="container mt-2">
                <h1>Gặp lỗi: {error}</h1>
            </div>
        );
    }
    return (
        <>
            <>
                <div className="container p-2 bg-white my-3 rounded">
                    <div className="row mt-4 mb-4">
                        <div className="col-lg-4 col-md-4 col-sm-12">
                            <Carousel
                                emulateTouch={true}
                                swipeable={true}
                                showIndicators={false}
                            >
                                {images?.map((image, index) => (
                                    <div
                                        key={index}
                                        onClick={() => openImageViewer(index)}
                                        style={{
                                            width: "100%",
                                            height: "400px",
                                            objectFit: "cover",
                                        }}
                                    >
                                        <img
                                            alt=""
                                            src={
                                                image.dataImg
                                                    ? image.dataImg
                                                    : image.linkImg
                                            }
                                            // width="300"
                                            // style={{
                                            //     margin: "2px",
                                            //     objectFit: "cover",
                                            // }}
                                        />
                                    </div>
                                ))}
                            </Carousel>
                            {isViewerOpen && (
                                <ReactSimpleImageViewer
                                    src={
                                        images?.map(
                                            (image) =>
                                                image.linkImg || image.dataImg
                                        ) || []
                                    }
                                    currentIndex={currentImage}
                                    disableScroll={false}
                                    closeOnClickOutside={true}
                                    onClose={closeImageViewer}
                                    backgroundStyle={{
                                        backgroundColor: "rgba(0,0,0,0.7)",
                                    }}
                                />
                            )}
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-12 px-5">
                            <h2>{book?.nameBook}</h2>
                            <div className="d-flex align-items-center">
                                <p className="me-5">
                                    Thể loại:{" "}
                                    <strong>
                                        {genres?.map(
                                            (genre) => genre.nameCategory + " "
                                        )}
                                    </strong>
                                </p>
                                <p className="ms-5">
                                    Tác giả: <strong>{book?.author}</strong>
                                </p>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="d-flex align-items-center">
                                    <RatingStar
                                        readonly={true}
                                        ratingPoint={book?.avgRating}
                                    />

                                    <p className="text-danger ms-2 mb-0">
                                        ({book?.avgRating})
                                    </p>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className="mx-3 mb-1 text-secondary">
                                        |
                                    </span>
                                </div>
                                <div className="d-flex align-items-end justify-content-center ">
                                    <span
                                        style={{
                                            color: "rgb(135,135,135)",
                                            fontSize: "16px",
                                        }}
                                    >
                                        Đã bán
                                    </span>
                                    <span className="fw-bold ms-2">
                                        {book?.soldQuantity}
                                    </span>
                                </div>
                            </div>
                            <div className="price">
                                <span className="discounted-price text-danger me-3">
                                    <strong style={{ fontSize: "32px" }}>
                                        {book?.sellPrice?.toLocaleString()}đ
                                    </strong>
                                </span>
                                <span className="original-price small me-3">
                                    <strong>
                                        <del>
                                            {book?.listPrice?.toLocaleString()}đ
                                        </del>
                                    </strong>
                                </span>
                                <h4 className="my-0 d-inline-block">
                                    <span className="badge bg-danger">
                                        {book?.discountPercent}%
                                    </span>
                                </h4>
                            </div>
                            <div className="mt-3">
                                <p>
                                    Vận chuyển tới:{" "}
                                    <strong>Quận Bình Thạnh, TP.HCM</strong>{" "}
                                    <span
                                        className="ms-3 text-primary"
                                        style={{ cursor: "pointer" }}
                                    >
                                        Thay đổi
                                    </span>
                                </p>
                                <div className="d-flex align-items-center mt-3">
                                    <img
                                        src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/d9e992985b18d96aab90969636ebfd0e.png"
                                        height="20"
                                        alt="free ship"
                                    />
                                    <span className="ms-3">
                                        Miễn phí vận chuyển
                                    </span>
                                </div>
                            </div>
                            <div className="d-flex align-items-center mt-3">
                                <strong className="me-5">Số lượng: </strong>
                                <SelectQuantity
                                    max={book?.quantity}
                                    quantity={quantity}
                                    setQuantity={setQuantity}
                                    add={add}
                                    reduce={reduce}
                                />
                                <span className="ms-4">
                                    {book?.quantity} sản phẩm có sẵn
                                </span>
                            </div>
                            <div className="mt-4 d-flex align-items-center">
                                {book?.quantity === 0 ? (
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        className="me-3"
                                        color="error"
                                    >
                                        Hết hàng
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            variant="outlined"
                                            size="large"
                                            startIcon={<ShoppingCartOutlined />}
                                            className="me-3"
                                            // onClick={() => handleAddProduct(book)}
                                        >
                                            Thêm vào giỏ hàng
                                        </Button>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            className="ms-3"
                                            // onClick={() => handleBuyNow(book)}
                                        >
                                            Mua ngay
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container p-4 bg-white my-3 rounded">
                    <h5 className="my-3">Mô tả sản phẩm</h5>
                    <hr />
                    <TextEllipsis
                        isShow={true}
                        text={book?.description + ""}
                        limit={2000}
                    />
                </div>
                <div className="container p-4 bg-white my-3 rounded">
                    <h5 className="my-3">Khách hàng đánh giá</h5>
                    <hr />
                    <Comment idBook={idBookNumber} />
                </div>
            </>
        </>
    );
};
export default BookDetail;
