import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import React from "react";
interface ToastProps {
	status: boolean; // status để biết là success hay error
	statusToast: boolean; // để biết khi nào tắt/mở
	setstatusToast: any; // gán lại để tắt/mở toast
	message: string; // câu thông báo lên toast
}

const Toast: React.FC<ToastProps> = (props) => {
	const handleClose = () => {
		props.setstatusToast(false);
	};
	return (
		<Box sx={{ width: 500 }}>
			<Snackbar
				autoHideDuration={5000}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
				open={props.statusToast}
				onClose={handleClose}
			>
				<Alert
					onClose={handleClose}
					severity={props.status ? "success" : "error"}
					sx={{ boxShadow: "0 0 50px #b3b1b1" }}
				>
					{props.message}
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default Toast;