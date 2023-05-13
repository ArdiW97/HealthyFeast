import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../Profile/Profile.css";
import ImageForm from "../../components/ImageForm/ImageForm";
import defaultImage from "../../assets/img/default.webp";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const Profile = () => {
  const [profile, setProfile] = useState();
  const [uploadImage, setUploadImage] = useState("");

  const onImageError = (e) => {
    e.target.src = defaultImage;
  };

  const getProfile = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/api/v1/user`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: `${process.env.REACT_APP_APIKEY}`,
      },
    })
      .then((response) => {
        console.log(response.data.user);
        setProfile(response.data.user);
      })
      .catch((error) => {
        console.log(error);
        alert("Error, reload the page!");
      });
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = formik.values;
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/api/v1/update-profile`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: `${process.env.REACT_APP_APIKEY}`,
      },
      data: {
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        profilePictureUrl: uploadImage,
      },
    })
      .then((response) => {
        console.log(response);
        getProfile();
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const formik = useFormik({
    initialValues: {
      name: profile ? profile.name : "",
      email: profile ? profile.email : "",
      phoneNumber: profile ? profile.phoneNumber : "",
      profilePictureUrl: profile ? profile.profilePictureUrl : "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid Email address").required("Required"),
      phoneNumber: Yup.string()
        .matches(/^[0-9]{10,12}$/, "Must be in digit")
        .required("Required"),
    }),
  });

  return (
    <>
      <Container fluid className="py-5">
        <div className="mx-auto profile-detail">
          <h1 className="title text-center">My Profile</h1>
          <Card className="my-3 crd">
            <Card.Body>
              <Row className="g-2">
                <Card.Img
                  src={
                    profile && profile.profilePictureUrl
                      ? profile && profile.profilePictureUrl
                      : defaultImage
                  }
                  className="img-fluid m-0 img-profile-page col-lg-4 col-md-4 col-sm-4 d-flex justify-content-center"
                  alt={profile && profile.name}
                  onError={onImageError}
                />
                <Col className="col-lg-8 col-md-8 col-sm-8">
                  <Card.Title className="text-center text-sm-start fs-4 mb-3 label-register">
                    {profile && profile.name}
                  </Card.Title>
                  <div className="d-flex gap-2 mb-1 d-flex align-items-center label-register">
                    <i className="ri-mail-fill fs-5"></i>
                    <Card.Text>{profile && profile.email}</Card.Text>
                  </div>
                  <div className="d-flex gap-2 mb-1 align-items-center label-register">
                    <i className="ri-phone-fill fs-5"></i>
                    <Card.Text>{profile && profile.phoneNumber}</Card.Text>
                  </div>
                  <div className="d-flex gap-2 mb-1 align-items-center label-register">
                    <i className="ri-account-circle-fill fs-5"></i>
                    <Card.Text className="text-capitalize">
                      {profile && profile.role} account
                    </Card.Text>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <div className="d-flex justify-content-end align-items-center">
                <Button
                  type="button"
                  className="btn text-light btn-success shadow d-flex align-items-center py-1"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Edit Profile
                </Button>
              </div>
            </Card.Footer>
          </Card>

          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header crd">
                  <h5 className="modal-title allfood">Edit Profile</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body p-4 crd">
                  <div className="text-center">
                    <img
                      src={
                        profile && profile.profilePictureUrl
                          ? profile && profile.profilePictureUrl
                          : defaultImage
                      }
                      className="img-fluid img-profile-page mb-3"
                      alt={profile && profile.name}
                      onError={onImageError}
                    />
                  </div>
                  <form onSubmit={(e) => handleSubmit(e, profile.id)}>
                    <div className="row mb-3">
                      <div className="col-lg-12">
                        <label
                          htmlFor="inputName"
                          className="form-label fw-bold mb-1 label-register"
                        >
                          Username
                        </label>
                        <input
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Enter username"
                        />
                      </div>
                      {formik.touched.name && formik.errors.name ? (
                        <div className="text-danger">{formik.errors.name}</div>
                      ) : null}
                    </div>

                    <div className="row mb-3">
                      <div className="col-lg-12">
                        <label
                          htmlFor="inputEmail"
                          className="form-label fw-bold mb-1 label-register"
                        >
                          Email
                        </label>
                        <input
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="text"
                          className="form-control"
                          id="email"
                          placeholder="Enter email"
                        />
                      </div>
                      {formik.touched.email && formik.errors.email ? (
                        <div className="text-danger">{formik.errors.email}</div>
                      ) : null}
                    </div>

                    <div className="row mb-3">
                      <div className="col-lg-12">
                        <label
                          htmlFor="inputPhoneNumber"
                          className="form-label fw-bold mb-1 label-register"
                        >
                          Phone Number
                        </label>
                        <input
                          value={formik.values.phoneNumber}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="text"
                          className="form-control"
                          id="phoneNumber"
                          placeholder="Enter phone number"
                        />
                      </div>
                      {formik.touched.phoneNumber &&
                      formik.errors.phoneNumber ? (
                        <div className="text-danger">
                          {formik.errors.phoneNumber}
                        </div>
                      ) : null}
                    </div>

                    <ImageForm onChange={(value) => setUploadImage(value)} />

                    <div className="text-start mt-3">
                      <Button
                        type="submit"
                        className="btn text-light shadow btn-success"
                      >
                        Save
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Profile;
