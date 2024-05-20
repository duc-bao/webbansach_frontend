import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Form.css";
import { toast } from "react-toastify";
import useScrollToTop from "../hooks/ScrollToTop";
const RegisterPage: React.FC = () => {
    useScrollToTop(); // Mỗi lần vào component này thì sẽ ở trên cùng

    // const { isLoggedIn } = useAuth();
    // const navigation = useNavigate();

    // useEffect(() => {
    // 	if (isLoggedIn) {
    // 		navigation("/");
    // 	}
    // });
    //Khai báo các biến cần đăng kí
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    //Khai báo các lỗi
    const [errorUsername, setErrorUsername] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorRepeatPassword, setErrorRepeatPassword] = useState("");
    const [errorPhoneNumber, setErrorPhoneNumber] = useState("");
    // Khai báo biến thông báo
    const [status, setStatus] = useState<boolean | null>(null);

    // Khi submit thì btn loading ...
    const [statusBtn, setStatusBtn] = useState(false);
    const [notification, setNotification] = useState("");
    const handleSubmit = async (e: React.FormEvent) => {
        setErrorEmail("");
        setErrorPassword("");
        setErrorRepeatPassword("");
        setErrorUsername("");
        setStatusBtn(true);
        e.preventDefault();

        const isUserNameValid = !(await checkExistUsername(username));
        const isEmailValid = !(await checkExistEmail(email));
        const isPasswordValid = !(await checkPassword(password));
        const isRePasswordValid = !(await checkRepeatPassword(repeatPassword));
        if (
            isUserNameValid &&
            isEmailValid &&
            isPasswordValid &&
            isRePasswordValid
        ) {
            try {
                const endpoint = `http://localhost:8080/user/register`;
                const response = await toast.promise(
                    fetch(endpoint, {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify({
                            username,
                            password,
                            email,
                            firstName,
                            lastName,
                            phoneNumber,
                            gender: "M",
                        }),
                    }),
                    { pending: "Đang trong quá trình xử lý ..." }
                );
                if (response.ok) {
                    // toast.success("Đăng ký tài khoản thành công.");
                    // toast.info("Vui lòng kiểm tra email để kích hoạt tài khoản");
                    // navigation("/login");
                    // setStatusBtn(false);
                    setStatus(true);
                    setNotification("Vui lòng kiểm tra email để kích hoạt");
                    return true;
                } else {
                    setStatus(false);
                    setNotification(
                        "Đã xảy ra lỗi trong quá trình đăng kí vui lòng kiểm tra lại"
                    );
                }
            } catch (error) {
                setNotification(
                    "Đã xảy ra lỗi trong quá trình đăng kí vui lòng kiểm tra lại"
                );
            }
        }
    };

    //Check username tồn tại hay chưa
    const checkExistUsername = async (username: string) => {
        if (username.trim() === "") {
            return false;
        }
        if (username.trim().length < 8) {
            setErrorUsername("Tên đăng nhập phải chứa ít nhất 8 ký tự.");
            return true;
        }
        const endpoint = `http://localhost:8080/users/search/existsByUsername?username=${username}`;
        // call API
        try {
            const response = await fetch(endpoint);
            const data = await response.text();
            if (data === "true") {
                setErrorUsername("UserName đã tồn tại");
                return true;
            }
            return false;
        } catch (error) {
            console.log("Lỗi khi cacll api");
        }
    };

    const handleUsernameChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setUsername(e.target.value);
        setErrorUsername("");
    };
    // Check email da ton tai hay chua
    const checkExistEmail = async (email: string) => {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setErrorEmail("Email Không đúng định dạng");
            return true;
        }
        const endpoint = `http://localhost:8080/users/search/existsByEmail?email=${email}`;
        try {
            const response = await fetch(endpoint);
            const data = await response.text();
            if (data === "true") {
                setErrorEmail("Email đã tồn tại");
                return true;
            }
            return false;
        } catch (error) {
            console.log("Lỗi khi cacll api");
        }
    };
    const handleEmailChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setEmail(e.target.value);
        setErrorEmail("");
    };
    // Check password
    const checkPassword = async (password: string) => {
        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            setErrorPassword(
                "Mật khẩu phải có ít nhất 8 ký tự và bao gồm ít nhất 1 ký tự đặc biệt (!@#$%^&*) "
            );
        } else {
            setErrorPassword("");
            return false;
        }
    };
    const handleChangePassword = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPassword(e.target.value);
        setErrorPassword("");
    };
    // Check RepeatPassword
    const checkRepeatPassword = async (repeatPassword: string) => {
        if (repeatPassword !== password) {
            setErrorRepeatPassword("Mật khẩu không trùng khớp.");
            return true;
        }
        setErrorRepeatPassword("");
    };
    const handleChangeRepeatPassword = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRepeatPassword(e.target.value);
        setErrorRepeatPassword("");
    };
    // Hàm check số điện thoại có đúng định dạng không
    const checkPhoneNumber = (phoneNumber: string) => {
        const phoneNumberRegex = /^(0[1-9]|84[1-9])[0-9]{8}$/;
        if (phoneNumber.trim() === "") {
            return false;
        } else if (!phoneNumberRegex.test(phoneNumber.trim())) {
            setErrorPhoneNumber("Số điện thoại không đúng.");
            return true;
        } else {
            setErrorPhoneNumber("");
            return false;
        }
    };
    const handlePhoneNumberChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPhoneNumber(e.target.value);
        setErrorPhoneNumber("");
    };
    return (
        <div className="container my-5 py-4 rounded-5 shadow-5 bg-light w-50">
            <h1 className="text-center">ĐĂNG KÝ</h1>
            <form action="" onSubmit={handleSubmit} className="form">
                <div className="row px-5 mt-3">
                    <div className="col-lg-6 col-md-12 col-12">
                        <TextField
                            fullWidth
                            error={errorUsername.length > 0 ? true : false}
                            helperText={errorUsername}
                            required={true}
                            id="outlined-required"
                            label="Tên đăng nhập"
                            placeholder="Nhập tên đăng nhập"
                            value={username}
                            onChange={handleUsernameChange}
                            onBlur={(e) => {
                                checkExistUsername(e.target.value);
                            }}
                            className="input-field"
                        />
                        <TextField
                            error={errorPassword.length > 0 ? true : false}
                            helperText={errorPassword}
                            required={true}
                            fullWidth
                            type="password"
                            id="outlined-required"
                            label="Mật khẩu"
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChange={handleChangePassword}
                            onBlur={(e) => {
                                checkPassword(e.target.value);
                            }}
                            className="input-field"
                        />
                        <TextField
                            fullWidth
                            error={
                                errorRepeatPassword.length > 0 ? true : false
                            }
                            required={true}
                            helperText={errorRepeatPassword}
                            type="password"
                            id="outlined-required"
                            label="Xác nhận mật khẩu"
                            placeholder="Nhập lại mật khẩu"
                            value={repeatPassword}
                            onChange={handleChangeRepeatPassword}
                            onBlur={(e) => {
                                checkRepeatPassword(e.target.value);
                            }}
                            className="input-field"
                        ></TextField>
                    </div>
                    <div className="col-lg-6 col-md-12 col-12">
                        <TextField
                            fullWidth
                            helperText={""}
                            required={true}
                            id="outlined-required"
                            label="Họ đệm"
                            placeholder="Nhập họ đệm"
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value);
                            }}
                            className="input-field"
                        />
                        <TextField
                            fullWidth
                            helperText={""}
                            required={true}
                            id="outlined-required"
                            label="Tên"
                            placeholder="Nhập tên"
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value);
                            }}
                            className="input-field"
                        />
                        <TextField
                            fullWidth
                            error={errorPhoneNumber.length > 0 ? true : false}
                            helperText={errorPhoneNumber}
                            required={true}
                            id="outlined-required"
                            label="Số điện thoại"
                            placeholder="Nhập số điện thoại"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            onBlur={(e) => {
                                checkPhoneNumber(e.target.value);
                            }}
                            className="input-field"
                        />
                    </div>
                    <TextField
                        fullWidth
                        error={errorEmail.length > 0 ? true : false}
                        helperText={errorEmail}
                        required={true}
                        id="outlined-required"
                        label="Email"
                        placeholder="Nhập email"
                        value={email}
                        onChange={handleEmailChange}
                        onBlur={(e) => {
                            checkExistEmail(e.target.value);
                        }}
                        className="input-field"
                    ></TextField>
                </div>
                <div className="d-flex justify-content-end mt-2 px-3">
                    <span>
                        Bạn có tài khoản rồi?{" "}
                        <Link to={"/login"}>Đăng nhập</Link>
                    </span>
                </div>
                <div className="text-center my-5">
                    <Button
                        variant="outlined"
                        type="submit"
                        sx={{ width: "25%", padding: "10px" }}
                    >
                        Đăng Ký
                    </Button>
                    {status !== null && (
                        <div
                            className={
                                "text-" + (status ? "success" : "danger")
                            }
                        >
                            {notification}
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
