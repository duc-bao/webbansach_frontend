import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PersonIcon from "@mui/icons-material/Person";
export const ParameterDigital:React.FC = ()=>{
    return(
        <div className='conatiner p-4'>
			<div className='shadow-4 rounded p-5'>
				<div className='row'>
					<div className='col-lg-4 col-md-6 col-sm-12'>
						<Card
							sx={{ minWidth: 275, borderRadius: 4 }}
							style={{
								background:
									"linear-gradient(90deg, rgba(254,222,0,0.7590685932576156) 45%, rgba(253,234,0,0.46495094619879207) 77%)",
							}}
						>
							<CardContent>
								<Typography
									sx={{ fontSize: 14 }}
									color='text.secondary'
									gutterBottom
								>
									TỔNG TIỀN KIẾM ĐƯỢC
								</Typography>
								<div className='d-flex align-item-center justify-content-between'>
									<Typography
										sx={{
											fontSize: 32,
											fontWeight: "bolder",
											marginTop: "10px",
										}}
										gutterBottom
									>
										{(12530000).toLocaleString("vi")} đ
									</Typography>

									<div className='d-flex align-item-center justify-content-center flex-column '>
										<span
											className='rounded-circle p-3'
											style={{
												color: "black",
												fontWeight: "bold",
											}}
										>
											<AttachMoneyIcon />
										</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
					<div className='col-lg-4 col-md-6 col-sm-12'>
						<Card
							sx={{ minWidth: 275, borderRadius: 4 }}
							style={{
								background:
									"linear-gradient(90deg, rgba(0,171,255,0.7338585092240021) 47%, rgba(42,180,247,0.6442226548822654) 61%)",
							}}
						>
							<CardContent>
								<Typography
									sx={{ fontSize: 14 }}
									color='text.secondary'
									gutterBottom
								>
									TÀI KHOẢN
								</Typography>
								<div className='d-flex align-item-center justify-content-between'>
									<Typography
										sx={{
											fontSize: 32,
											fontWeight: "bolder",
											marginTop: "10px",
										}}
										gutterBottom
									>
										{(125).toLocaleString("vi")}
									</Typography>

									<div className='d-flex align-item-center justify-content-center flex-column '>
										<span
											className='rounded-circle p-3'
											style={{
												color: "black",
												fontWeight: "bold",
											}}
										>
											<PersonIcon />
										</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
					<div className='col-lg-4 col-md-6 col-sm-12'>
						<Card
							sx={{ minWidth: 275, borderRadius: 4 }}
							style={{
								background:
									"linear-gradient(90deg, rgba(0,255,47,0.7338585092240021) 47%, rgba(54,249,78,0.6022058481595763) 61%)",
							}}
						>
							<CardContent>
								<Typography
									sx={{ fontSize: 14 }}
									color='text.secondary'
									gutterBottom
								>
									TỔNG HOÁ ĐƠN
								</Typography>
								<div className='d-flex align-item-center justify-content-between'>
									<Typography
										sx={{
											fontSize: 32,
											fontWeight: "bolder",
											marginTop: "10px",
										}}
										gutterBottom
									>
										{(43).toLocaleString("vi")}
									</Typography>

									<div className='d-flex align-item-center justify-content-center flex-column '>
										<span
											className='rounded-circle p-3'
											style={{
												color: "black",
												fontWeight: "bold",
											}}
										>
											<LocalMallIcon />
										</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
    )
}