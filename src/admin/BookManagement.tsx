import { Button } from "@mui/material";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { FadeModal } from "../layout/utils/FadeModal";
import { BookTable } from "./book/BookTable";
import { BookForm } from "./book/BookForm";
import { RequireAdmin } from "./RequireAdmin";
const BookManagement: React.FC = () => {
    // Taoj biến để mỗi lần thao tác thì sẽ update lại table
    const [keyCountReload, setKeyCountReload] = useState(0);
    const [option, setOption] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    return (
        <div className="container p-5">
            <div className="shadow-4-strong rounded p-5">
                <div className="mb-3">
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                            handleOpenModal();
                            setOption(true);
                        }}
                        startIcon={<AddIcon></AddIcon>}
                    >Thêm sách</Button>
                </div>
                <div>
                    <BookTable 
                        keyCountReload = {keyCountReload}
                        setOption = {setOption}
                        handleOpenModal = {handleOpenModal}
                        setKeyCountReload = {setKeyCountReload}
                    ></BookTable>
                </div>
            </div>
            <FadeModal
                open = {openModal}
                handleOpen={handleOpenModal}
                handleClose={handleCloseModal}
            >
                <BookForm option = {option} setKeyCountReload = {setKeyCountReload} ></BookForm>
            </FadeModal>
        </div>
    );
};
const BookManagementPage = RequireAdmin(BookManagement);
export default BookManagementPage ;
