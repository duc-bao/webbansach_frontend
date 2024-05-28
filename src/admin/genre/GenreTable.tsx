import { useConfirm } from "material-ui-confirm"
import { useEffect, useState } from "react"
import CategoryModel from "../../models/CategoryModel"
import { getAllGenre } from "../../api/GenreAPI"
import { GridColDef } from "@mui/x-data-grid"
import { EditOutlined } from "@mui/icons-material"
import { DeleteOutlineOutlined } from "@mui/icons-material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { IconButton, Tooltip } from "@mui/material";
import { toast } from "react-toastify"
import { DataTable } from "../../layout/utils/DataTable"

interface GenreTableProps {
    setOption: any
    setId : any
    keyCountReload ?: any
    setKeyCountReload ?: any
    handleOpenModal : any
}

const GenreTable : React.FC<GenreTableProps> = (props) =>{
    
    const confirm = useConfirm();
    const [data, setData] = useState<CategoryModel[]>([]);
    useEffect (()=>{
        getAllGenre().then(
            (response) =>{
                const genre = response.genreList.map((item) =>({
                   ...item,
                   id:item.idCategory
                }))
                setData(genre);
            } 
        ).catch((error) =>{
            console.log(error); 
        })
    }, [props.keyCountReload])
    const handleDeleteGenre = (id:any) =>{
        const token = localStorage.getItem('token');
        confirm({
            title:"Xoá thể lọai",
            description:"Bạn có chắc chắn xóa thể loại này chứ?",
            confirmationText:["Xóa"],
            cancellationText:["Hủy"],
        }).then(() =>{
            fetch(`http://localhost:8080/genre/${id}`,{
                method:"DELETE",
                headers:{
                    Authorization: `Bearer ${token}`
                },
            }).then(
                (response) =>{
                    if(response.ok){
                        toast.success("Xóa thể loại thành công");
                        props.setKeyCountReload(Math.random());
                    }else{
                        toast.error("Lỗi khi xóa thể loại");
                    }
                }
            ).catch((error) =>{
                toast.error("Lỗi khi xóa thể loại");
                console.log(error);
            })
        }).catch(()=>{})
    }
    const colums :GridColDef[] = [
        {field:"id", headerName:"ID", width:150}
        ,{field:"nameCategory", headerName: "TÊN THỂ LOẠI", width:300},
        {
            field:"action",
            headerName:"HÀNH ĐỘNG",
            width:300,
            type:"actions",
            renderCell: (item) =>{
                return (
                    <div>
                        <Tooltip title = {"Chỉnh sửa"}>
                            <IconButton 
                                color="primary"
                                onClick = {() =>{
                                    props.setOption("update");
                                    props.setId(item.id);
                                    props.handleOpenModal();
                                }}
                            >
                                <EditOutlinedIcon></EditOutlinedIcon>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title = {"Xóa"}>
                            <IconButton 
                               color='error'
                               onClick={() => handleDeleteGenre(item.id)}
                            >
                                <DeleteOutlineOutlined></DeleteOutlineOutlined>
                            </IconButton>
                        </Tooltip>
                    </div>
                )
            }
        }
    ]
    return (
        <DataTable columns={colums} rows={data} ></DataTable>
    )
}
export default GenreTable;