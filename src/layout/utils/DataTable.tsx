import { DataGrid } from "@mui/x-data-grid/DataGrid";
import React from "react";

interface DataTableProps {
	rows: any;
	columns: any;
}

export const DataTable: React.FC<DataTableProps> = (props) => {
	return (
		<div style={{ height: "100%", width: "100%" }}>
			<DataGrid
				rows={props.rows}
				columns={props.columns}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 10 },
					},
				}}
				pageSizeOptions={[10, 20, 30, 100]}
			/>
		</div>
	);
};