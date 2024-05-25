import React, { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { getAllBook } from "../../api/BookAPI";
import { GetAllImage } from "../../api/ImageAPI";
import { GridColDef } from "@mui/x-data-grid";
import { IconButton, Tooltip } from "@mui/material";
import { DeleteOutlineOutlined, VisibilityOutlined } from "@mui/icons-material";
import { DataTable } from "../../layout/utils/DataTable";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
interface BookTableProps {
    setOption: any;
    handleOpenModal: any;
    setKeyCountReload?: any;
    keyCountReload?: any;
}

export const BookTable: React.FC<BookTableProps> = (props) => {
    const [data, setBookData] = useState<BookModel[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookResponse = await getAllBook();
                const promises = bookResponse.result.map(async (book) => {
                    const imagesList = await GetAllImage(book.idBook);
                    const thumbnail = imagesList.find((image) => image.icon);
                    return {
                        ...book,
                        id: book.idBook,
                        thumbnail: thumbnail?.linkImg,
                    };
                });
                // Promise.all(promises) nghĩa là đợi cho những Promise trên kia hoàn thành hết thì mới tới
                // câu lệnh này
                const books = await Promise.all(promises);
                setBookData(books);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [props.keyCountReload]);
    const colums: GridColDef[] = [
        { field: "id", headerName: "ID", width: 80 },
        {
            field: "thumbnail",
            headerName: "Ảnh",
            width: 100,
            renderCell: (param) => {
                return <img src={param.value} alt="" width={70}></img>;
            },
        },
        {
            field: "nameBook",
            headerName: "TÊN SÁCH",
            width: 350,
        },
        {
            field: "quantity",
            headerName: "SỐ LƯỢNG",
            width: 100,
        },
        {
            field: "sellPrice",
            headerName: "GIÁ BÁN",
            width: 120,
            renderCell: (param) => {
                return (
                    <span>
                        {Number.parseInt(param.value).toLocaleString("vi-vn")}đ
                    </span>
                );
            },
        },
        { field: "author", headerName: "TÁC GIẢ", width: 150 },
        {
            field: "action",
            headerName: "HÀNH ĐỘNG",
            width: 200,
            type: "actions",
            renderCell: (item) => {
                return (
                    <div>
                        <Tooltip title={"Xem chi tiết"}>
                            <IconButton
                                color="secondary"
                                onClick={() => {
                                    props.setOption("view");
                                    props.handleOpenModal();
                                }}
                            >
                                <VisibilityOutlined></VisibilityOutlined>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={"Chỉnh sửa"}>
                            <IconButton
                                color="primary"
                                onClick={() => {
                                    props.setOption("update");
                                    props.handleOpenModal();
                                }}
                            >
                                <EditOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={"Xoá"}>
                            <IconButton
                                color="error"
                                onClick={() => console.log("Xoá: " + item.id)}
                            >
                                <DeleteOutlineOutlined />
                            </IconButton>
                        </Tooltip>
                    </div>
                );
            },
        },
    ];

    return <DataTable columns={colums} rows={data} />;
};
