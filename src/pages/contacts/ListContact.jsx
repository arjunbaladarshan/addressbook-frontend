import React, { useEffect, useState } from "react";
import api from "../../api/axios";

function ListContact() {
  const [data, setData] = useState([]);

  const fetchContacts = async () => {
    const token = localStorage.getItem("token");
    const ans = await api.get("contact/all");
    console.log(ans);
    setData(ans.data.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  console.log("data = ", data);

  return <>all contacts will be dispkayed here</>;
}

export default ListContact;
