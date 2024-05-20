import { Button, TextField } from "@mui/material";
import { light } from "@mui/material/styles/createPalette";
import { error } from "console";
import { jwtDecode } from "jwt-decode";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    // Biến thông báo lỗi
    const handleSubmit = () => {
        const loginRequest = {
            username: username, 
            password: password,
        };
        fetch("http://localhost:8080/user/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(loginRequest),
        }).then(
            (response) =>{
                if(response.ok){
                    return response.json();
                }else {
                    throw new Error("Đăng nhập thất bại")
                }
            }
        ).then(
            (data) =>{
                const {jwt} = data;
                localStorage.setItem('token', jwt);

            }
        ).catch((error) =>{
            console.log(error);
            setError("Thông tin mật khẩu hoặc tài khoản không chính xác")
        })
        ;
    };
    return (
        <div
            className="container my-5 py-4 rounded-5 shadow-5 bg-light"
            style={{ width: "450px" }}
        >
            <h1 className="text-center">ĐĂNG NHẬP</h1>
            <form
                onSubmit={handleSubmit}
                className="form"
                style={{ padding: "0 20px" }}
            >
                <TextField
                    fullWidth
                    required={true}
                    id="outlined-required"
                    label="Tên đăng nhập"
                    placeholder="Nhập tên đăng nhập"
                    value={username}
                    onChange={(e) => {
                        setUserName(e.target.value);
                    }}
                    className="input-field"
                ></TextField>
                <TextField
                    fullWidth
                    required={true}
                    type="password"
                    id="outlined-required"
                    label="Mật khẩu"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                />
                <div className="d-flex justify-content-end mt-2 px-3">
                    <span>
                        Bạn chưa có tài khoản?{" "}
                        <Link to={"/register"}>Đăng ký</Link>
                    </span>
                </div>
                <div className="text-center my-3">
                    <Button
                        fullWidth
                        variant="outlined"
                        type="submit"
                        sx={{ padding: "10px" }}
                    >
                        Đăng nhập
                    </Button>
                </div>
                {error && <div style={{color:"red"}}>{error}</div>}
            </form>
        </div>
    );
};
export default LoginPage;
