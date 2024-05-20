import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ActiveCodeUser: React.FC = () => {
    const { email } = useParams();
    const { activeCode } = useParams();
    const [enable, setEnable] = useState(false);
    const [notification, setNotification] = useState("");

    useEffect(() => {
        if (email && activeCode) {
            handleactiveCode();
        }
    }, []);
    const handleactiveCode = async () => {
        console.log("Email:", email);
        console.log("MaKichHoat:", activeCode);
        try {
            const endpoint = `http://localhost:8080/user/active-account?email=${email}&activeCode=${activeCode}`;
            const response = await fetch(endpoint, { method: "GET" });

            if (response.ok) {
                setEnable(true);
            } else {
                setNotification(response.text + "");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <h1 className="text-center">KÍCH HOẠT TÀI KHOẢN</h1>
            {!enable ? (
                <p className="text-center">
                    Tài khoản kích hoạt thành công. Vui lòng{" "}
                    <Link to={"/login"}>Đăng nhập</Link>
                </p>
            ) : (
                <p>Tài khoản kích hoạt thất bại. Lỗi: {notification}</p>
            )}
        </div>
    );
};
export default ActiveCodeUser;
