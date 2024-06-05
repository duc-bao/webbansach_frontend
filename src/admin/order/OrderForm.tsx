import { FormEvent, useState } from "react";
import OrderModel from "../../models/OrderModel";
import { Box, TextField, Typography } from "@mui/material";

interface OrderFormProps {
	id: any;
	option?: string;
	setKeyCountReload?: any;
	handleCloseModal?: any;
}

export const OrderForm: React.FC<OrderFormProps> = (props) => {
    const [order, setOrder] = useState<OrderModel>({
		idOrder: 0,
		deliveryAddress: "",
		totalPrice: 0,
		totalPriceProduct: 0,
		feeDelivery: 0,
		feePayment: 0,
		dateOrder: new Date(),
		status: "",
	});
    const handleSubmit = (event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        const token = localStorage.getItem("token");
        fetch("http://localhost:8080/",{
            method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(order),
        }).then((response) =>{
            if(response.ok){
                props.setKeyCountReload(Math.random());
            }else {
                alert("Gặp lỗi trong quá trình cập nhật hoá đơn");
            }
        }).catch((error) => console.log(error));
    }
    return (
        <div>
            <Typography
                className="text-center" variant="h4" component= "h2"
            >{props.option === "update" ? "CẬP NHẬT ĐƠN HÀNG" : "XEM CHI TIẾT"}</Typography>
            <hr />
            <div className="container p-5">
            <form onSubmit={handleSubmit} className='form'>
					<input type='hidden' value={order.idOrder} hidden />
					<Box
						sx={{
							"& .MuiTextField-root": { mb: 3 },
						}}
					>
						<TextField
							required
							id='filled-required'
							label='Ngày tạo'
							style={{ width: "100%" }}
							value={order.dateOrder.toISOString().substring(0, 10)}
							type='date'
							onChange={(e) =>
								setOrder({
									...order,
									dateOrder: new Date(e.target.value),
								})
							}
							size='small'
						/>

						<TextField
							required
							id='filled-required'
							label='Địa chỉ giao hàng'
							style={{ width: "100%" }}
							value={order.deliveryAddress}
							onChange={(e) =>
								setOrder({
									...order,
									deliveryAddress: e.target.value,
								})
							}
							size='small'
						/>
					</Box>
					{props.option !== "view" && (
						<button className='btn btn-primary w-100 my-3' type='submit'>
							Lưu đơn hàng
						</button>
					)}
				</form>
			</div>
            </div>
    )

}