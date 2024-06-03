import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { FadeModal } from "../layout/utils/FadeModal";
import { UserForm } from "./user/UserForm";
import { UserTable } from "./user/UserTable";
import { RequireAdmin } from "./RequireAdmin";
const UserManagement : React.FC = () =>{
    const [keyCountReload, setKeyCountReload] = useState(0);

	const [option, setOption] = useState(""); // Truyền vào là có thể là (add, update, view)
	const [openModal, setOpenModal] = useState(false);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);

    return (
        <div className='conatiner p-5'>
			<div className='shadow-4-strong rounded p-5'>
				<div className='mb-3'>
					<Button
						variant='contained'
						color='success'
						onClick={() => {
							handleOpenModal();
							setOption("add");
						}}
						startIcon={<AddIcon />}
					>
						Thêm người dùng
					</Button>
				</div>
				<div>
					<UserTable
						keyCountReload={keyCountReload}
						setOption={setOption}
						handleOpenModal={handleOpenModal}
						setKeyCountReload={setKeyCountReload}
					/>
				</div>
			</div>
			<FadeModal
				open={openModal}
				handleOpen={handleOpenModal}
				handleClose={handleCloseModal}
			>
				<UserForm option={option} setKeyCountReload={setKeyCountReload} />
			</FadeModal>
		</div>
    )
}
const UserManagementPage = RequireAdmin(UserManagement);
export default UserManagementPage;