import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";

interface ConfirmDialogProps {
    open: boolean;
    setOpen: any;
    handleClickOpenConfirm: any;
    handleCloseConfirm: any;
    handleStateConfirm?: any;
    notification: string;
    children: React.ReactNode;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = (props) => {
    return (
        <React.Fragment>
            <button
                style={{
                    outline: 0,
                    backgroundColor: "transparent",
                    border: 0,
                }}
                onClick={props.handleClickOpenConfirm}
            >
                {props.children}
            </button>
            <Dialog
                open={props.open}
                onClose={props.handleCloseConfirm}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {props.notification}
                </DialogTitle>
                <DialogActions>
                    <Button
                        variant="outlined"
                        color="inherit"
                        onClick={() => props.handleStateConfirm(false)}
                    >
                        Huỷ
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => props.handleStateConfirm(true)}
                        autoFocus
                    >
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default ConfirmDialog;
