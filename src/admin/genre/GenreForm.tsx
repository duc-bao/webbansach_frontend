import { FormEvent, useEffect, useState } from "react";
import CategoryModel from "../../models/CategoryModel";
import { getGenreByID } from "../../api/GenreAPI";
import { Box, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";

interface GenreFormProps {
    option: string;
    id: number;
    handleCloseModal: any;
    setKeyCountReload?: any;
}
export const GenreForm: React.FC<GenreFormProps> = (props) => {
    const [genre, setGenre] = useState<CategoryModel>({
        idCategory: 0,
        nameCategory: "",
    });
    useEffect(() => {
        if (props.option === "update") {
            getGenreByID(props.id).then((response) => {
                setGenre({
                    idCategory: response.genre.idCategory,
                    nameCategory: response.genre.nameCategory,
                });
            });
        }
    }, [props.id, props.option]);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        const method = props.option === "add" ? "POST" : "PUT";
        const endpoint =
            props.option === "add"
                ? "http://localhost:8080/genre"
                : `http://localhost:8080/genre/${props.id}`;
        fetch(endpoint, {
            method: method,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(genre),
        })
            .then((response) => {
                if (response.ok) {
                    setGenre({
                        idCategory: 0,
                        nameCategory: "",
                    });
                    {
                        props.option === "add"
                            ? toast.success("Thêm thể loại thành công")
                            : toast.success("Cập nhật thể loại thành công");
                    }
                    props.setKeyCountReload(Math.random());
                    props.handleCloseModal();
                } else {
                    toast.error("Lỗi khi thưc hiện hành động");
                    props.handleCloseModal();
                }
            })
            .catch((e) => {
                toast.error("Lỗi khi thưc hiện hành động");
                props.handleCloseModal();
                console.log(e);
            });
    };
    return (
        <div>
            <Typography className="text-center" variant="h4" component="h2">
                {props.option === "add"
                    ? "TẠO THỂ LOẠI"
                    : props.option === "update"
                    ? "SỬA THỂ LOẠI"
                    : "XEM CHI TIẾT"}
            </Typography>
            <hr />
            <div className="container px-5">
                <form onSubmit={handleSubmit} className="form">
                    <input
                        type="hidden"
                        id="idGenre"
                        value={genre.idCategory}
                        hidden
                    ></input>
                    <Box
                        sx={{
                            "& .MuiTextField-root": { mb: 3 },
                        }}
                    >
                        <TextField
                            required
                            id="filled-required"
                            label="Tên thể loại"
                            style={{ width: "100%" }}
                            value={genre.nameCategory}
                            onChange={(e) =>
                                setGenre({
                                    ...genre,
                                    nameCategory: e.target.value,
                                })
                            }
                            size="small"
                        />
                    </Box>
                    {props.option !== "view" && (
                        <button
                            className="btn btn-primary w-100 my-3"
                            type="submit"
                        >
                            {props.option === "add"
                                ? "TẠO THỂ LOẠI"
                                : "LƯU THỂ LOẠI"}
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};
