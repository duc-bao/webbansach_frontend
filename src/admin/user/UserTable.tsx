import { useEffect, useState } from "react";
import { getAllUser } from "../../api/UserAPI";
import UserModel from "../../models/UserModel";

import { GridColDef } from "@mui/x-data-grid";
import { Chip, IconButton, Tooltip } from "@mui/material";
import { DeleteOutlineOutlined, VisibilityOutlined } from "@mui/icons-material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { DataTable } from "../../layout/utils/DataTable";
import { confirm } from "material-ui-confirm";
import { toast } from "react-toastify";
interface UserTableProps {
    setOption: any;
    handleOpenModal: any;
    setKeyCountReload?: any;
    keyCountReload?: any;
    setId: any;
}

export const UserTable: React.FC<UserTableProps> = (props) => {
    const [data, setData] = useState<UserModel[]>([]);
    useEffect(() => {
        getAllUser()
            .then((response) => {
                let users = response
                    .flat()
                    .map((user) => ({ ...user, id: user.idUser }));
                users = users.sort((u1, u2) => u1.idUser - u2.idUser);
                setData(users);
                setData(users);
                console.log(response);
            })
            .catch((error) => console.log(error));
    }, [props.keyCountReload]);

    const handleDeleteUser = (id: any) => {
        const token = localStorage.getItem("token");
        confirm({
            title: "Xóa người dùng",
            description: "Bạn có chắc chắn muốn xóa người dùng này",
            confirmationText: ["Xóa"],
            cancellationText: ["Hủy"],
        })
            .then(() => {
                fetch(`http://localhost:8080/users/${id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((response) => {
                        if (response.ok) {
                            toast.success("Xóa người dùng thành công");
                            props.setKeyCountReload(Math.random());
                        } else {
                            toast.error("Xóa người dùng thất bại");
                        }
                    })
                    .catch((error) => {
                        toast.error("Lỗi khi xóa thể loại");
                        console.log(error);
                    });
            })
            .catch(() => {});
    };
    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 50 },
        {
            field: "userName",
            headerName: "TÊN TÀI KHOẢN",
            width: 120,
            renderCell: (params) => {
                const userName = params.row.userName;
                const email = params.row.email;

                const displayName =
                    userName || (email ? email.split("@")[0] : "Unknown");

                return <span>{displayName}</span>;
            },
        },
        {
            field: "role",
            headerName: "VAI TRÒ",
            width: 150,
            renderCell: (params) => {
                let label = "";
                let color: "success" | "error" | "default" = "default";

                switch (params.value) {
                    case 1:
                        label = "ADMIN";
                        color = "error";
                        break;
                    case 2:
                        label = "STAFF";
                        color = "error";
                        break;
                    case 3:
                        label = "CUSTOMER";
                        color = "success";
                        break;
                    default:
                        label = "UNKNOWN";
                        color = "default";
                }

                return <Chip label={label} color={color} variant="outlined" />;
            },
        },
        { field: "lastName", headerName: "TÊN", width: 100 },
        {
            field: "dateOfBirth",
            headerName: "NGÀY SINH",
            width: 100,
        },
        { field: "email", headerName: "EMAIL", width: 200 },
        { field: "phoneNumber", headerName: "SỐ ĐIỆN THOẠI", width: 120 },

        {
            field: "action",
            headerName: "HÀNH ĐỘNG",
            width: 200,
            type: "actions",
            renderCell: (item) => {
                return (
                    <div>
                        {/* <Tooltip title={"Xem chi tiết"}>
                            <IconButton
                                color="secondary"
                                onClick={() => {
                                    props.setOption("view");
                                    props.handleOpenModal();
                                }}
                            >
                                <VisibilityOutlined />
                            </IconButton>
                        </Tooltip> */}
                        <Tooltip title={"Chỉnh sửa"}>
                            <IconButton
                                color="primary"
                                onClick={() => {
                                    props.setId(item.id);
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
                                onClick={() => {
                                    handleDeleteUser(item.id);
                                }}
                            >
                                <DeleteOutlineOutlined />
                            </IconButton>
                        </Tooltip>
                    </div>
                );
            },
        },
    ];

    return <DataTable columns={columns} rows={data} />;
};
