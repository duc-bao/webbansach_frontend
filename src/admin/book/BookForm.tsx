import React, { FormEvent, useState } from "react";
import BookModel from "../../models/BookModel";
import { Box, Button, TextField, Typography } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { isToastActive } from "react-toastify/dist/core/store";
import { toast } from "react-toastify";
import { error } from "console";

interface BookFormProps {
    option: any;
    setKeyCountReload?: any;
}

export const BookForm: React.FC<BookFormProps> = (props) => {
    const [book, setBook] = useState<BookModel>({
        idBook: 0,
        nameBook: "",
        author: "",
        description: "",
        listPrice: NaN,
        sellPrice: NaN,
        quantity: NaN,
        avgRating: NaN,
        soldQuantity: NaN,
        discountPercent: NaN,
        thumbnail: "",
    });
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [previewthumbnail, setPreviewthumbnail] = useState("");
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const token = localStorage.getItem("token");

        fetch("http://localhost:8080/book/add-book", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "content-type": "application/json",
            },
            body: JSON.stringify(book),
        })
            .then((response) => {
                if (response.ok) {
                    setBook({
                        idBook: 0,
                        nameBook: "",
                        author: "",
                        description: "",
                        listPrice: NaN,
                        sellPrice: NaN,
                        quantity: NaN,
                        avgRating: NaN,
                        soldQuantity: NaN,
                        discountPercent: NaN,
                        thumbnail: "",
                    });
                    setThumbnail(null);
                    setPreviewthumbnail("");
                    toast.success("Thêm sách thành công");
                } else {
                    toast.error("Gặp lỗi trong quá trình xử lí sách");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputElement = event.target as HTMLInputElement;
        if (inputElement.files && inputElement.files.length > 0) {
            const selectedFile = inputElement.files[0];
            const reader = new FileReader();
            // Xử lí sự kiện khi tệp đã chọn thành công
            reader.onload = (e) => {
                const thumbnailBase64 = e.target?.result as string;
                setBook({ ...book, thumbnail: thumbnailBase64 });
                setThumbnail(selectedFile);
                setPreviewthumbnail(URL.createObjectURL(selectedFile));
            };

            // Đọc tệp dưới dạng chuỗi base64
            reader.readAsDataURL(selectedFile);
        }
    };
    return (
        <div>
            <Typography className="text-center" variant="h4" component="h2">
                {props.option === "add"
                    ? "TẠO SÁCH"
                    : props.option === "update"
                    ? "SỬA"
                    : "XEM CHI TIẾT"}
            </Typography>
            <hr />
            <div className="container px-5">
                <form
                    action=""
                    className="form"
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                >
                    <input
                        type="hidden"
                        id="idBook"
                        value={book?.idBook}
                        hidden
                    ></input>
                    <div className="row">
                        <div className="col-6">
                            <Box
                                sx={{
                                    "& .MuiTextField-root": { mb: 3 },
                                }}
                            >
                                <TextField
                                    required
                                    id="filled-required"
                                    label="Tên sách"
                                    style={{ width: "100%" }}
                                    value={book.nameBook}
                                    onChange={(e) => {
                                        setBook({
                                            ...book,
                                            nameBook: e.target.value,
                                        });
                                    }}
                                    size="small"
                                ></TextField>
                                <TextField
                                    required
                                    id="filled-required"
                                    label="Tên tác giả"
                                    style={{ width: "100%" }}
                                    value={book.author}
                                    onChange={(e) =>
                                        setBook({
                                            ...book,
                                            author: e.target.value,
                                        })
                                    }
                                    size="small"
                                />

                                <TextField
                                    required
                                    id="filled-required"
                                    label="Giá niêm yết"
                                    style={{ width: "100%" }}
                                    type="number"
                                    value={
                                        Number.isNaN(book.listPrice)
                                            ? ""
                                            : book.listPrice
                                    }
                                    onChange={(e) =>
                                        setBook({
                                            ...book,
                                            listPrice: parseInt(e.target.value),
                                        })
                                    }
                                    size="small"
                                />
                            </Box>
                        </div>
                        <div className="col-6">
                            <Box
                                sx={{
                                    "& .MuiTextField-root": { mb: 3 },
                                }}
                            >
                                <TextField
                                    required
                                    id="filled-required"
                                    label="Số lượng"
                                    style={{ width: "100%" }}
                                    type="number"
                                    value={
                                        Number.isNaN(book.quantity)
                                            ? ""
                                            : book.quantity
                                    }
                                    onChange={(e) =>
                                        setBook({
                                            ...book,
                                            quantity: parseInt(e.target.value),
                                        })
                                    }
                                    size="small"
                                />

                                <TextField
                                    id="filled-required"
                                    label="Giảm giá (%)"
                                    style={{ width: "100%" }}
                                    type="number"
                                    value={
                                        Number.isNaN(book.discountPercent)
                                            ? ""
                                            : book.discountPercent
                                    }
                                    onChange={(e) =>
                                        setBook({
                                            ...book,
                                            discountPercent: parseInt(
                                                e.target.value
                                            ),
                                        })
                                    }
                                    size="small"
                                />
                            </Box>
                        </div>
                        <div className="col-12">
                            <Box
                                sx={{
                                    "& .MuiTextField-root": { mb: 3 },
                                }}
                            >
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Mô tả sách"
                                    style={{ width: "100%" }}
                                    multiline
                                    maxRows={5}
                                    value={book.description}
                                    onChange={(e) => {
                                        setBook({
                                            ...book,
                                            description: e.target.value,
                                        });
                                    }}
                                ></TextField>
                            </Box>
                        </div>
                        <div className="d-flex align-items-center mt-3">
                            <Button
                                size="small"
                                component="label"
                                variant="outlined"
                                startIcon={<CloudUpload></CloudUpload>}
                            >
                                Tải ảnh thumbnail
                                <input
                                    style={{ opacity: "0", width: "10px" }}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    alt=""
                                ></input>
                            </Button>
                            <span className="ms-3">{thumbnail?.name}</span>
                            <img src={previewthumbnail} alt="" width={100} />
                        </div>
                    </div>
                    {props.option !== "view" && (
                        <button
                            className="btn btn-primary w-100 my-3"
                            type="submit"
                        >
                            {props.option === "add" ? "Tạo sách" : "Lưu sách"}
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};
