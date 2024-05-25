import { Button, TextField } from "@mui/material";
import { light } from "@mui/material/styles/createPalette";
import { error } from "console";
import { jwtDecode } from "jwt-decode";
import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthorizationContext";
import { JwtPayLoad } from "../../admin/RequireAdmin";
import { toast } from "react-toastify";

const LoginPage: React.FC = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigation = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    useEffect(() => {
        if (isLoggedIn) {
            navigation("/");
        }
    });
    // Biến thông báo lỗi
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
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
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Đăng nhập thất bại");
                }
            })
            .then( async (data) => {
                const { jwt } = data;
                console.log(jwt);
                const decodedToken = jwtDecode(jwt) as JwtPayLoad;
                if (decodedToken.enabled === false) {
                    toast.warning(
                        "Tài khoản của bạn  chưa kích hoạt vui lòng kích hoạt trước khi sử dụng"
                    );
                    return;
                }
                toast.success("Đăng nhập thành công");
                
                localStorage.setItem("token", jwt);
                if (decodedToken.role === "ADMIN") {
                    navigation("/about");
                } else {
                    navigation("/");
                }
                
                setIsLoggedIn(true); // Đã đăng nhập
            })
            .catch((error) => {
                console.log(error);
                setError("Thông tin mật khẩu hoặc tài khoản không chính xác");
                toast.error("Tài khoản hoặc mật khẩu không đúng");
            });
    };
    return (
        <div
            className="container my-5 py-4 rounded-5 shadow-5 bg-light"
            style={{ width: "450px" }}
        >
            <h1 className="text-center">ĐĂNG NHẬP</h1>
            <form
                onSubmit={handleSubmit}
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
                {error && <div style={{ color: "red" }}>{error}</div>}
            </form>
        </div>
    );
};
export default LoginPage;
