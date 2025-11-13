import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import api from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";

function AddContact() {
  const [data, setData] = useState({});

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      api.get(`/contact/${id}`).then((res) => {
        setData(res.data.data[0]);
        setPhones(res.data.data[0].phones);
        setEmails(res.data.data[0].emails);
      });
    }
  }, []);

  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const [phones, setPhones] = useState([
    { phone_number: "", phone_type: "Office", is_primary: true },
  ]);
  const [emails, setEmails] = useState([
    { email: "", email_type: "Office", is_primary: true },
  ]);

  const validationSchema = yup.object({
    display_name: yup.string().required("Display name is required"),
    given_name: yup.string().required("Given name is required"),
  });

  const handleSave = () => {
    validationSchema
      .validate(data, { abortEarly: false })
      .then(() => {
        const mergedData = {
          ...data,
          phones,
          emails,
        };

        if (id) {
          //edit
          api
            .put(`/contact/update/${id}`, mergedData)
            .then(() => {
              navigate("/contacts");
            })
            .catch(() => {
              console.log("Failed to update data");
            });
        } else {
          //add
          api
            .post("/contact/create", mergedData)
            .then(() => {
              navigate("/contacts");
            })
            .catch(() => {
              console.log("Failed to insert data");
            });
        }
      })
      .catch((err) => {
        console.log(err.inner);
        const tempError = {};
        for (let temp of err.inner) {
          tempError[temp.path] = temp.message;
        }
        setErrors(tempError);
      });
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
              error={errors.display_name}
              helperText={errors.display_name}
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
              error={errors.given_name}
              helperText={errors.given_name}
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
              error={errors.family_name}
              helperText={errors.family_name}
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
              error={errors.company}
              helperText={errors.company}
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
              error={errors.job_title}
              helperText={errors.job_title}
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
              error={errors.notes}
              helperText={errors.notes}
            />
          </td>
        </tr>
        {phones.map((ph, index) => {
          return (
            <tr>
              <td>Phone : </td>
              <td>
                <TextField
                  name="phone_number"
                  defaultValue={phones[index].phone_number}
                  onChange={(e) => {
                    const oldPhones = phones;
                    oldPhones[index].phone_number = e.target.value;
                    setPhones(oldPhones);
                  }}
                />
              </td>
              <td>
                <Button
                  onClick={() => {
                    setPhones([
                      ...phones,
                      {
                        phone_number: "",
                        phone_type: "personal",
                        is_primary: false,
                      },
                    ]);
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
                <TextField
                  name="email"
                  defaultValue={emails[index].email}
                  onChange={(e) => {
                    const oldEmails = emails;
                    oldEmails[index].email = e.target.value;
                    setEmails(oldEmails);
                  }}
                />
              </td>
              <td>
                <Button
                  onClick={() => {
                    setEmails([
                      ...emails,
                      { email: "", email_type: "personal", is_primary: false },
                    ]);
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
