import { Button } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { FadeModal } from "../layout/utils/FadeModal";
import { GenreForm } from "./genre/GenreForm";
import GenreTable from "./genre/GenreTable";
import { RequireAdmin } from "./RequireAdmin";
const GenreManagement = () => {
    // Tạo ra biến để mỗi khi thao tác CRUD thì sẽ update lại table
    const [keyCountReload, setKeyCountReload] = useState(0);
    const [option, setOption] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const [id, setId] = useState<number>(0);

    return (
        <div className="container p-5">
            <div className="shadow-4-strong rounded p-5">
                <div className="mb-3">
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                            handleOpenModal();
                            setOption("add");
                        }}
                        startIcon={<AddIcon></AddIcon>}
                    >Thêm thể loại</Button>
                </div>
                <div>
                    <GenreTable
                        keyCountReload= {keyCountReload}
                        setOption = {option}
                        setId = {setId}
                        handleOpenModal= {handleOpenModal}
                        setKeyCountReload = {setKeyCountReload}
                    ></GenreTable>
                </div>
            </div>
            <FadeModal 
                open = {openModal}
                handleOpen={handleOpenModal}
                handleClose={handleCloseModal}
            >
                <GenreForm
                    option = {option}
                    id = {id}
                    handleCloseModal = {handleCloseModal}
                    setKeyCountReload = {setKeyCountReload}
                ></GenreForm>
            </FadeModal>
        </div>
    );
};

const GenreManagementPage = RequireAdmin(GenreManagement);
export default GenreManagementPage;