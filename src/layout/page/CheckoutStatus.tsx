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
		
		const token = localStorage.getItem("token");
		fetch("http://localhost:8080/vnpay/payment/infor", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then(response => response.json())
		.then(data => {
            if (data.status === "success") {
                console.log(data.status)
                setIsSuccess(true);
            } else if(data.status === "failed") {
                fetch("http://localhost:8080/order/cancel-order", {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        idUser: getIdUserByToken(),
                    }),
                }).catch((error) => {
                    console.log(error);
                });
            }
        })
        .catch(error => console.log(error));
	}, [location.search]);

	return <>{isSuccess ? <CheckoutSuccess /> : <CheckoutFail />}</>;
};

export default CheckoutStatus;