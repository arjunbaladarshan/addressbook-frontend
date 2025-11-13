import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { Button, Paper, Snackbar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

function ListContact() {
  const [data, setData] = useState([]);
  const [isDeleteEnable, setIsDeleteEnable] = useState(true);
  const [isEditEnable, setIsEditEnable] = useState(true);
  const [idsToDelete, setIdsToDelete] = useState([]);
  const navigate = useNavigate();

  const [stateMsg, setStateMsg] = React.useState({
    openMsg: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, openMsg } = stateMsg;

  const handleCloseMsg = () => {
    setStateMsg({ ...stateMsg, openMsg: false });
  };

  const fetchContacts = async () => {
    const ans = await api.get("contact/all");
    setData(ans.data.data);
  };

  useEffect(() => {
    fetchContacts();
  }, [openMsg]);

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

  const paginationModel = { page: 0, pageSize: 5 };

  const handleSelectedRow = (rows) => {
    if (rows.ids.size > 0) {
      setIsDeleteEnable(false);
    } else {
      setIsDeleteEnable(true);
    }
    if (rows.ids.size == 1) {
      setIsEditEnable(false);
    } else {
      setIsEditEnable(true);
    }
    for (let temp of rows.ids) {
      setIdsToDelete([...idsToDelete, temp]);
    }
  };

  const handleDelete = async () => {
    for (const id of idsToDelete) {
      const result = await api.delete(`/contact/${id}`);
      console.log("Result = ", result.data.message);
      setStateMsg({ ...stateMsg, openMsg: true });
    }
  };

  const handleEdit = async () => {
    navigate(`/contact/edit/${idsToDelete[0]}`);
  };

  return (
    <>
      <Paper sx={{ height: 400, width: "100%" }}>
        <Button
          onClick={() => handleDelete()}
          variant="outlined"
          color="error"
          disabled={isDeleteEnable}
        >
          DELETE
        </Button>
        <Button
          onClick={() => handleEdit()}
          variant="outlined"
          color="error"
          disabled={isEditEnable}
        >
          EDIT
        </Button>
        <Button
          onClick={() => navigate("/contact/add")}
          variant="outlined"
          color="primary"
        >
          Add Contact
        </Button>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          onRowSelectionModelChange={(rows) => handleSelectedRow(rows)}
          sx={{ border: 0 }}
        />
      </Paper>
      <Snackbar
        open={openMsg}
        autoHideDuration={6000}
        onClose={handleCloseMsg}
        message="Contact Deleted SUccessfully"
      />
    </>
  );
}

export default ListContact;
