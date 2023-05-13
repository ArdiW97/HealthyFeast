import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import "./ImageForm.css";

const ImageForm = ({ onChange }) => {
  const [image, setImage] = useState("");

  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleApi = () => {
    const url = `${process.env.REACT_APP_BASEURL}/api/v1/upload-image`;
    const formData = new FormData();
    formData.append("image", image);
    const headersApi = {
      headers: {
        apiKey: `${process.env.REACT_APP_APIKEY}`,
        Authorization: `Bearer${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(url, formData, headersApi)
      .then((response) => {
        console.log(response);
        onChange(response.data.url);
        alert(`${response.data.message}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label className="fw-bold mb-1 label-register">Image</Form.Label>
        <div className="d-flex">
          <Form.Control
            type="file"
            onChange={handleChange}
            accept="image/*"
            className="file-upload"
          />
          <Button
            onClick={handleApi}
            className="btn btn-success btn-upload"
            type="button"
          >
            <i className="ri-upload-2-line"></i>
          </Button>
        </div>
      </Form.Group>
    </>
  );
};

export default ImageForm;
