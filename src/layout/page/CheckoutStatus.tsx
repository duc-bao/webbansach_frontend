import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthorizationContext";
import { getIdUserByToken } from "../utils/JwtService";
import { CheckoutSuccess } from "./components/CheckoutSucces";
import { CheckoutFail } from "./components/CheckoutFail";


const CheckoutStatus: React.FC = () => {
	const { isLoggedIn } = useAuth();
	const navigation = useNavigate();

	useEffect(() => {
		if (!isLoggedIn) {
			navigation("/login");
		}
	});

	const location = useLocation();
	const [isSuccess, setIsSuccess] = useState(false);

	useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch("http://localhost:8080/vnpay/payment_info", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(parseURLParams(location.search)),
                });
                const data = await response.json();
                console.log(location.search);
                if (data.status === "success") {
                    setIsSuccess(true);
                } else if (data.status === "failed") {
                    await fetch("http://localhost:8080/order/cancel-order", {
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            idUser: getIdUserByToken(),
                        }),
                    });
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, [location.search]);

	return <>{isSuccess ? <CheckoutSuccess /> : <CheckoutFail />}</>;
};
    function parseURLParams(search: string) {
        const params = new URLSearchParams(search);
        return {
        vnp_Amount: params.get("vnp_Amount"),
        vnp_BankCode: params.get("vnp_BankCode"),
        vnp_BankTranNo: params.get("vnp_BankTranNo"),
        vnp_CardType: params.get("vnp_CardType"),
        vnp_OrderInfo: params.get("vnp_OrderInfo"),
        vnp_PayDate: params.get("vnp_PayDate"),
        vnp_ResponseCode: params.get("vnp_ResponseCode"),
        vnp_TmnCode: params.get("vnp_TmnCode"),
        vnp_TransactionNo: params.get("vnp_TransactionNo"),
        vnp_TransactionStatus: params.get("vnp_TransactionStatus"),
        vnp_TxnRef: params.get("vnp_TxnRef"),
        vnp_SecureHash: params.get("vnp_SecureHash"),
        };
    }

export default CheckoutStatus;

