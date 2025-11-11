import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function ListContact() {
  const [data, setData] = useState([]);

  const fetchContacts = async () => {
    const token = localStorage.getItem("token");
    const ans = await api.get("contact/all");
    setData(ans.data.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const columns = [
    { field: "display_name", headerName: "Name" },
    { field: "given_name", headerName: "First Name" },
    { field: "family_name", headerName: "Last Name" },
    { field: "job_title", headerName: "Job Title" },
    { field: "notes", headerName: "Notes" },
    {
      field: "phones",
      headerName: "Phone Number",
      width: 160,
      valueGetter: (value, row) => value[0]?.phone_number || "No data",
    },
  ];

  console.log("data = ", data);
  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}

export default ListContact;
