import { useEffect, useState } from "react"
import { getAllOrder } from "../../api/OrderAPI"
import OrderModel from "../../models/OrderModel"
import { Chip, IconButton, Tooltip } from "@mui/material"
import { GridColDef } from "@mui/x-data-grid"
import { DeleteOutlineOutlined, VisibilityOutlined } from "@mui/icons-material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { DataTable } from "../../layout/utils/DataTable"

interface OrderTableProps {
    keyCountReload ?: any
    setOption: any
    handleOpenModal : any
    setKeyCountReload?: any
}

export  const OrderTable : React.FC<OrderTableProps> = (props) =>{
    // Tạo biến để lấy tất cả data
	const [data, setData] = useState<OrderModel[]>([]);
	useEffect(() => {
		getAllOrder()
			.then((response) => {
				const orders = response.map((order) => ({
					...order,
					id: order.idOrder,
					nameCustomer: order.user?.lastName,
				}));

				setData(orders);
			})
			.catch((error) => console.log(error));
	}, [props.keyCountReload]);

    const columns: GridColDef[] = [
		{ field: "id", headerName: "ID", width: 80 },
		{ field: "nameCustomer", headerName: "TÊN KHÁC HÀNG", width: 200 },
		{ field: "dateCreated", headerName: "NGÀY TẠO", width: 100 },
		{ field: "totalPrice", headerName: "TỔNG TIỀN", width: 120 },
		{
			field: "status",
			headerName: "TRẠNG THÁI",
			width: 150,
			renderCell: (params) => {
				return (
					<Chip
						label={params.value}
						color={
							params.value === "Thành công"
								? "success"
								: params.value === "Đang xử lý"
								? "info"
								: params.value === "Đang giao hàng"
								? "warning"
								: "error"
						}
						variant='outlined'
					/>
				);
			},
		},
        { field: "payment", headerName: "THANH TOÁN", width: 150 },
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
								color='secondary'
								onClick={() => {
									props.setOption("view");
									props.handleOpenModal();
								}}
							>
								<VisibilityOutlined />
							</IconButton>
						</Tooltip>
						<Tooltip title={"Chỉnh sửa"}>
							<IconButton
								color='primary'
								onClick={() => {
									props.setOption("update");
									props.handleOpenModal();
								}}
							>
								<EditOutlinedIcon   />
							</IconButton>
						</Tooltip>
						<Tooltip title={"Xoá"}>
							<IconButton
								color='error'
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
	return <DataTable columns={columns} rows={data} />;
}