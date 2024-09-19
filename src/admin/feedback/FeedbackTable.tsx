import { Box, CircularProgress, IconButton, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";

import CheckIcon from "@mui/icons-material/Check";
import { VisibilityOutlined } from "@mui/icons-material";
import FeedbackModel from "../../models/FeedbackModel";
import { getAllFeedBack } from "../../api/FeedbackAPI";
import { DataTable } from "../../layout/utils/DataTable";


export const FeedbackTable: React.FC = (props) => {
	const [loading, setLoading] = useState(true);

	// Tạo biến để lấy tất cả data
	const [data, setData] = useState<FeedbackModel[]>([]);
	useEffect(() => {
		const fetchData = async () => {
		  try {
			const feedbacks = await getAllFeedBack();
			setData(feedbacks.map(feedback => ({
			  ...feedback,
			  id: feedback.idFeedback,
			})));
			setLoading(false);
		  } catch (error) {
			console.error("Error fetching feedback:", error);
			toast.error("Failed to load feedback data");
			setLoading(false);
		  }
		};
	
		fetchData();
	  }, []);

	  const handleChangeIsReaded = async (idFeedback: any) => {
		const token = localStorage.getItem("token");
		const feedback = data.find((f) => f.idFeedback === idFeedback);
	
		if (!feedback) {
		  toast.error("Feedback not found");
		  return;
		}
	
		if (feedback.readed) {
		  toast.warning("Feedback này đã duyệt rồi");
		  return;
		}
	
		try {
		  const response = await fetch(
			`http://localhost:8080/feedback/update-feedback/${idFeedback}`,
			{
			  method: "PUT",
			  headers: {
				Authorization: `Bearer ${token}`,
			  },
			}
		  );
	
		  if (response.ok) {
			toast.success("Duyệt thành công");
			setData(prevData =>
			  prevData.map(f =>
				f.idFeedback === idFeedback ? { ...f, readed: true } : f
			  )
			);
		  } else {
			toast.error("Lỗi khi duyệt");
		  }
		} catch (error) {
		  toast.error("Lỗi khi duyệt");
		  console.error(error);
		}
	  };

	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID", width: 50 },
		{ field: "title", headerName: "TIÊU ĐỀ", width: 150 },
		{ field: "comment", headerName: "NHẬN XÉT", width: 300 },
		{ field: "dateCreated", headerName: "NGÀY TẠO", width: 100 },
		{ field: "user", headerName: "NGƯỜI DÙNG", width: 100 },
		{
			field: "readed",
			headerName: "ĐÃ ĐỌC",
			width: 100,
			renderCell: (params) => {
				return params.value === true ? (
					<Tooltip title='Đã đọc'>
						<CheckIcon color='success' />
					</Tooltip>
				) : (
					""
				);
			},
		},
		{
			field: "action",
			headerName: "HÀNH ĐỘNG",
			width: 120,
			type: "actions",
			renderCell: (item) => {
				return (
					<div>
						<Tooltip title={"Duyệt"}>
							<IconButton
								color='secondary'
								onClick={() => handleChangeIsReaded(item.id)}
							>
								<VisibilityOutlined />
							</IconButton>
						</Tooltip>
					</div>
				);
			},
		},
	];

	if (loading) {
		return (
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<CircularProgress />
			</Box>
		);
	}

	return <DataTable columns={columns} rows={data} />;
};