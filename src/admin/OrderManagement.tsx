import { useState } from "react"
import { FadeModal } from "../layout/utils/FadeModal";
import { OrderForm } from "./order/OrderForm";
import { OrderTable } from "./order/OrderTable";
import { RequireAdmin } from "./RequireAdmin";

interface OrderManagementProps{}

const OrderManagement : React.FC = () =>{
    const [keyCountReload, setKeyCountReload] = useState(0);
    const [option, setOption] = useState("");
    const [id, setId] = useState(0);
    const [openModal, setOpenModal] = useState(false);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);
    return (
        <div className="container p-5">
            <div className="shadow-4-strong rounded p-5">
                <div>
                    <OrderTable
                        keyCountReload = {keyCountReload}
                        setOption = {setOption}
                        handleOpenModal = {handleOpenModal}
                        setKeyCountReload = {setKeyCountReload}
                        setId={setId}

                    ></OrderTable>
                </div>
            </div>
            <FadeModal 
                open = {openModal}
                handleOpen={handleOpenModal}
                handleClose={handleCloseModal}
            >
                <OrderForm id={id}
					option={option}
					setKeyCountReload={setKeyCountReload}
					handleCloseModal={handleCloseModal}></OrderForm>  
            </FadeModal>
        </div>
    )
}
const OrderManagementPage = RequireAdmin(OrderManagement);
export default OrderManagementPage;