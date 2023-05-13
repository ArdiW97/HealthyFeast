import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, useField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import ImageForm from "../../components/ImageForm/ImageForm";
import "./AddFood.css";
import { Card, Container, Row, Col } from "react-bootstrap";

const AddFood = () => {
  const [uploadImage, setUploadImage] = useState("");

  const onSubmit = (values) => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/api/v1/create-food`,
      data: {
        name: values.name,
        description: values.description,
        imageUrl: uploadImage,
        ingredients: values.ingredients,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: `${process.env.REACT_APP_APIKEY}`,
      },
    })
      .then((response) => {
        console.log(response.data.data);
        alert("Food Successfully Created!");
        window.location.href = "/allfood";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const InputText = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <Row className="mb-3">
        <Col className="col-lg-12">
          <label
            className="form-label fw-bold mb-1 label-register"
            htmlFor={props.id || props.name}
          >
            {label}
          </label>
          <input className="form-control" {...field} {...props} />
          {meta.touched && meta.error ? (
            <div className="text-danger">{meta.error}</div>
          ) : null}
        </Col>
      </Row>
    );
  };

  return (
    <>
      <Container fluid className="d-flex align-items-center py-5">
        <Formik
          initialValues={{
            name: "",
            description: "",
            ingredients: [""],
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Required"),
            description: Yup.string().required("Required"),
          })}
          onSubmit={onSubmit}
        >
          <Card className="mx-auto shadow py-3 px-2 crd">
            <Card.Body>
              <h2 className="title text-center mb-4">Add Food</h2>
              <Form className="fom">
                <InputText
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Food Name"
                />
                <InputText
                  label="Description"
                  name="description"
                  type="text"
                  placeholder="Description"
                />
                <ImageForm onChange={(value) => setUploadImage(value)} />

                <Row className="mb-3">
                  <Col className="col-lg-12">
                    <label className="form-label fw-bold mb-1 label-register">
                      Ingredients
                    </label>
                    <FieldArray name="ingredients">
                      {(fieldArrayProps) => {
                        const { push, remove, form } = fieldArrayProps;
                        const { values } = form;
                        const { ingredients } = values;
                        return (
                          <div>
                            {ingredients.map((ingredient, index) => (
                              <div
                                key={index}
                                className="d-flex input-group mb-1"
                              >
                                <Field
                                  name={`ingredients[${index}]`}
                                  placeholder={`Ingredient ${index + 1}`}
                                  className="form-control"
                                />
                                {index > 0 && (
                                  <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={() => remove(index)}
                                  >
                                    <i className="ri-delete-bin-line"></i>
                                  </button>
                                )}
                                <button
                                  type="button"
                                  className="btn btn-success btnnn"
                                  onClick={() => push("")}
                                >
                                  <i className="ri-add-fill"></i>
                                </button>
                              </div>
                            ))}
                          </div>
                        );
                      }}
                    </FieldArray>
                  </Col>
                </Row>
                <div className="text-center mt-3">
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Formik>
      </Container>
    </>
  );
};

export default AddFood;
