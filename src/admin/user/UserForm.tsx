import { FormEvent, useState } from "react";
import UserModel from "../../models/UserModel";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

interface UserFormProps {
    option : string
    setKeyCountReload?:any
}

export const UserForm : React.FC<UserFormProps> = (props) =>{
    const [user, setUser] = useState<UserModel>({
		idUser: 0,
		dateOfBirth: new Date("01/01/1990"),
		deliveryAdress: "",
		purchaseAdrress: "",
		email: "",
		firstName: "",
		lastName: "",
		gender: "M",
		phoneNumber: "",
		userName: "",
		password: "",
		avatar: "",
	});

    const [avatar , setAvatar] = useState<File| null> (null);
    const [previewAvatar, setPreviewAvatar] = useState("");

    const hanleSubmit = (event:FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        const token = localStorage.getItem("token")
        const data = new FormData();
        data.append("user", JSON.stringify(user));
        // Nếu mà có upload ảnh thì cho thumbnail vào data
		if (user.avatar) {
			data.append("avatar", user.avatar);
		}

        fetch ("http://localhost:8080/",{
            method : "POST",
            headers:{
                Authorization: `Bearer ${token}`
            },
            body: data
        }).then((response) => {
            if (response.ok) {
                setUser({
                    idUser: 0,
                    dateOfBirth: new Date(),
                    deliveryAdress: "",
                    purchaseAdrress: "",
                    email: "",
                    firstName: "",
                    lastName: "",
                    gender: "M",
                    phoneNumber: "",
                    userName: "",
                    password: "",
                    avatar: "",
                });
                setAvatar(null);
                setPreviewAvatar("");
                alert("Thêm người dùng thành công!");
                props.setKeyCountReload(Math.random());
            } else {
                alert("Gặp lỗi trong quá trình thêm người dùng");
            }
        }).catch((error) =>{
            console.log(error);
        })
    }

    const handleImageUpload =(event : React.ChangeEvent<HTMLInputElement>)=>{
        const inputElement = event.target as HTMLInputElement;
        if(inputElement.files && inputElement.files.length > 0){
            const selectedFile = inputElement.files[0];
			// Tiếp tục xử lý tệp đã chọn
			setAvatar(selectedFile);
			const dataAvatar = URL.createObjectURL(selectedFile);
			setPreviewAvatar(dataAvatar);
        }
    }
    return (
		<div>
			<Typography className='text-center' variant='h4' component='h2'>
				{props.option === "add"
					? "TẠO NGƯỜI DÙNG"
					: props.option === "update"
					? "SỬA NGƯỜI DÙNG"
					: "XEM CHI TIẾT"}
			</Typography>
			<hr />
			<div className='container px-5'>
				<form
					onSubmit={hanleSubmit}
					className='form'
					encType='multipart/form-data'
				>
					<input type='hidden' value={user.idUser} hidden />
					<div className='row'>
						<div className='col-6'>
							<Box
								sx={{
									"& .MuiTextField-root": { mb: 3 },
								}}
							>
								<TextField
									required
									id='filled-required'
									label='Tên tài khoản'
									style={{ width: "100%" }}
									value={user.userName}
									onChange={(e) =>
										setUser({ ...user, userName: e.target.value })
									}
									size='small'
								/>

								<TextField
									required
									id='filled-required'
									label='Mật khẩu'
									style={{ width: "100%" }}
									value={user.password}
									onChange={(e) =>
										setUser({ ...user, password: e.target.value })
									}
									size='small'
								/>

								<TextField
									required
									id='filled-required'
									label='Email'
									style={{ width: "100%" }}
									value={user.email}
									onChange={(e) =>
										setUser({ ...user, email: e.target.value })
									}
									size='small'
								/>
								<TextField
									required
									id='filled-required'
									label='Số điện thoại'
									style={{ width: "100%" }}
									value={user.phoneNumber}
									onChange={(e) =>
										setUser({ ...user, phoneNumber: e.target.value })
									}
									size='small'
								/>

								<TextField
									required
									id='filled-required'
									label='Số điện thoại'
									style={{ width: "100%" }}
									type='date'
									value={user.dateOfBirth
										.toISOString()
										.substring(0, 10)}
									onChange={(e) =>
										setUser({
											...user,
											dateOfBirth: new Date(e.target.value),
										})
									}
									size='small'
								/>
							</Box>
						</div>
						<div className='col-6'>
							<Box
								sx={{
									"& .MuiTextField-root": { mb: 3 },
								}}
							>
								<TextField
									required
									id='filled-required'
									label='Họ đệm'
									style={{ width: "100%" }}
									value={user.firstName}
									onChange={(e) =>
										setUser({ ...user, firstName: e.target.value })
									}
									size='small'
								/>

								<TextField
									required
									id='filled-required'
									label='Tên'
									style={{ width: "100%" }}
									value={user.lastName}
									onChange={(e) =>
										setUser({ ...user, lastName: e.target.value })
									}
									size='small'
								/>

								<TextField
									required
									id='filled-required'
									label='Địa chỉ'
									style={{ width: "100%" }}
									value={user.deliveryAdress}
									onChange={(e) =>
										setUser({
											...user,
											deliveryAdress: e.target.value,
										})
									}
									size='small'
								/>

								<TextField
									required
									id='filled-required'
									label='Số điện thoại'
									style={{ width: "100%" }}
									value={user.phoneNumber}
									onChange={(e) =>
										setUser({ ...user, phoneNumber: e.target.value })
									}
									size='small'
								/>

								<FormControl fullWidth size='small'>
									<InputLabel id='demo-simple-select-label'>
										Giới tính
									</InputLabel>
									<Select
										labelId='demo-simple-select-label'
										id='demo-simple-select'
										value={user.gender}
										label='Giới tính'
										onChange={(e) =>
											setUser({ ...user, gender: e.target.value })
										}
									>
										<MenuItem value={"M"}>Nam</MenuItem>
										<MenuItem value={"F"}>Nữ</MenuItem>
									</Select>
								</FormControl>
							</Box>
						</div>
						<div className='d-flex align-items-center mt-3'>
							<Button
								size='small'
								component='label'
								variant='outlined'
								startIcon={<CloudUpload />}
							>
								Tải ảnh avatar
								<input
									style={{ opacity: "0", width: "10px" }}
									// required
									type='file'
									accept='image/*'
									onChange={handleImageUpload}
									alt=''
								/>
							</Button>
							<span className='ms-3'>{avatar?.name}</span>
							<img src={previewAvatar} alt='' width={100} />
						</div>
					</div>
					{props.option !== "view" && (
						<button className='btn btn-primary w-100 my-3' type='submit'>
							{props.option === "add"
								? "Tạo người dùng"
								: "Lưu người dùng"}
						</button>
					)}
				</form>
			</div>
		</div>
    )
}