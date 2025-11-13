import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

function AddContact() {
  const [data, setData] = useState({});

  const [phones, setPhones] = useState([
    { phone_number: "", phone_type: "Office", is_primary: true },
  ]);
  const [emails, setEmails] = useState([
    { email: "", email_type: "Office", is_primary: true },
  ]);

  const handleSave = () => {
    console.log(data);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <table>
        <tr>
          <td>Enter Display Name</td>
          <td>
            <TextField
              name="display_name"
              value={data.display_name}
              onChange={handleChange}
            />
          </td>
        </tr>
        <tr>
          <td>Enter Given Name</td>
          <td>
            <TextField
              name="given_name"
              value={data.given_name}
              onChange={handleChange}
            />
          </td>
        </tr>
        <tr>
          <td>Enter Family Name</td>
          <td>
            <TextField
              name="family_name"
              value={data.family_name}
              onChange={handleChange}
            />
          </td>
        </tr>
        <tr>
          <td>Enter Company Name</td>
          <td>
            <TextField
              name="company"
              value={data.company}
              onChange={handleChange}
            />
          </td>
        </tr>
        <tr>
          <td>Enter Job Title</td>
          <td>
            <TextField
              name="job_title"
              value={data.job_title}
              onChange={handleChange}
            />
          </td>
        </tr>
        <tr>
          <td>Notes</td>
          <td>
            <TextField
              name="notes"
              value={data.notes}
              onChange={handleChange}
            />
          </td>
        </tr>
        {phones.map((ph, index) => {
          return (
            <tr>
              <td>Phone : </td>
              <td>
                <TextField name="phone_number" />
              </td>
              <td>
                <Button
                  onClick={() => {
                    setPhones([...phones, { phone_number: "" }]);
                  }}
                >
                  +
                </Button>
              </td>
            </tr>
          );
        })}

        {emails.map((ph, index) => {
          return (
            <tr>
              <td>Email : </td>
              <td>
                <TextField name="email" />
              </td>
              <td>
                <Button
                  onClick={() => {
                    setEmails([...emails, { email: "" }]);
                  }}
                >
                  +
                </Button>
              </td>
            </tr>
          );
        })}
        <tr>
          <td colSpan={2}>
            <Button onClick={handleSave} variant="contained" color="primary">
              Save
            </Button>
          </td>
        </tr>
      </table>
    </>
  );
}

export default AddContact;
