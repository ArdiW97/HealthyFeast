import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import ImageForm from "../../components/ImageForm/ImageForm";
import "../Register/Register.css";
import { Card, Col, Container, Form, Row } from "react-bootstrap";

const Register = () => {
  const [uploadImage, setUploadImage] = useState("");

  const formSignup = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordRepeat: "",
      role: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid Email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .matches(
          /^.*(?=.*\d)((?=.*[a-zA-Z]){1}).*$/,
          "Password must consist letter and a number"
        )
        .required("Required"),
      passwordRepeat: Yup.string()
        .oneOf([Yup.ref("password")], "Password does not match")
        .required("Required"),
      role: Yup.string()
        .oneOf(["admin", "user"], "Select Role")
        .required("Required"),
      phoneNumber: Yup.string()
        .matches(/^[0-9]{10,12}$/, "Must be in digit")
        .required("Required"),
    }),

    onSubmit: (values) => {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_BASEURL}/api/v1/register`,
        headers: {
          apiKey: `${process.env.REACT_APP_APIKEY}`,
        },
        data: {
          name: values.name,
          email: values.email,
          password: values.password,
          passwordRepeat: values.passwordRepeat,
          role: values.role,
          phoneNumber: values.phoneNumber,
          profilePictureUrl: uploadImage,
        },
      })
        .then((response) => {
          console.log(response);
          alert("Registration Success!");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          alert("Registration failed. Try Again!");
        });
    },
  });

  return (
    <>
      <Container
        fluid
        className="background-sign-up d-flex align-items-center py-5"
      >
        <Card className="mx-auto shadow py-3 px-2 crd">
          <Card.Body>
            <h2 className="txt text-center mb-4">Sign Up</h2>
            <Form className="fom" onSubmit={formSignup.handleSubmit}>
              <Row className="mb-2">
                <Col className="col-6">
                  <Form.Label className="fw-bold mb-0 label-register">
                    Username
                  </Form.Label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter Username"
                    className="form-control fs-12px"
                    onChange={formSignup.handleChange}
                    onBlur={formSignup.handleBlur}
                    value={formSignup.values.name}
                  />
                  {formSignup.touched.name && formSignup.errors.name ? (
                    <div className="text-danger">{formSignup.errors.name}</div>
                  ) : null}
                </Col>
                <Col className="col-6">
                  <Form.Label className="fw-bold mb-0 label-register">
                    Email
                  </Form.Label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="form-control fs-12px"
                    onChange={formSignup.handleChange}
                    onBlur={formSignup.handleBlur}
                    value={formSignup.values.email}
                  />

                  {formSignup.touched.email && formSignup.errors.email ? (
                    <div className="text-danger">{formSignup.errors.email}</div>
                  ) : null}
                </Col>
              </Row>

              <Row className="mb-2">
                <Col className="col-6">
                  <Form.Label className="form-label fw-bold mb-0 label-register">
                    Password
                  </Form.Label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                    className="form-control fs-12px"
                    onChange={formSignup.handleChange}
                    onBlur={formSignup.handleBlur}
                    value={formSignup.values.password}
                  />

                  {formSignup.touched.password && formSignup.errors.password ? (
                    <div className="text-danger">
                      {formSignup.errors.password}
                    </div>
                  ) : null}
                </Col>
                <Col className="col-6">
                  <Form.Label className="form-label fw-bold mb-0 label-register">
                    Confirm Password
                  </Form.Label>
                  <input
                    id="passwordRepeat"
                    name="passwordRepeat"
                    type="password"
                    placeholder="Confirm Password"
                    className="form-control fs-12px"
                    onChange={formSignup.handleChange}
                    onBlur={formSignup.handleBlur}
                    value={formSignup.values.passwordRepeat}
                  />

                  {formSignup.touched.passwordRepeat &&
                  formSignup.errors.passwordRepeat ? (
                    <div className="text-danger">
                      {formSignup.errors.passwordRepeat}
                    </div>
                  ) : null}
                </Col>
              </Row>
              <Row className="mb-2">
                <Col className="col-6">
                  <Form.Label className="form-label fw-bold mb-0 label-register">
                    Phone
                  </Form.Label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    placeholder="Enter Phone Number"
                    className="form-control fs-12px"
                    onChange={formSignup.handleChange}
                    onBlur={formSignup.handleBlur}
                    value={formSignup.values.phoneNumber}
                  />

                  {formSignup.touched.phoneNumber &&
                  formSignup.errors.phoneNumber ? (
                    <div className="text-danger">
                      {formSignup.errors.phoneNumber}
                    </div>
                  ) : null}
                </Col>
                <Col className="col-6">
                  <Form.Label className="form-label fw-bold mb-0 label-register">
                    Select Role
                  </Form.Label>
                  <select
                    onChange={formSignup.handleChange}
                    onBlur={formSignup.handleBlur}
                    value={formSignup.values.role}
                    component="select"
                    id="role"
                    name="role"
                    multiple={false}
                    className="form-select fs-12px"
                  >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </Col>
              </Row>
              <ImageForm onChange={(value) => setUploadImage(value)} />
              <div className="mt-3">
                <input type="submit" value="Register" className="btn fs-12px" />
              </div>
              <p className="fw-bold text-center tx">
                Already have an account ?
                <span className="ms-1">
                  <Link className="text-decoration-none tex nv" to="/login">
                    back to login
                  </Link>
                </span>
              </p>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Register;
