import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import "../Login/Login.css";


const Login = () => {
  const formLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(process.env.REACT_APP_APIKEY);
      axios({
        method: "post",
        url: `${process.env.REACT_APP_BASEURL}/api/v1/login`,
        headers: {
          apiKey: `${process.env.REACT_APP_APIKEY}`,
        },
        data: {
          email: values.email,
          password: values.password,
        },
      })
        .then((response) => {
          const token = response.data.token;
          localStorage.setItem("token", token);

          const role = response.data.user.role;
          localStorage.setItem("role", role);

          const name = response.data.user.name;
          localStorage.setItem("name", name);

          const email = values.email;
          localStorage.setItem("email", email);
          window.location.href = "/";
        })
        .catch((error) => {
          console.log(error.response.data);
          alert(
            "The password that you've entered is incorrect. Please try again."
          );
        });
    },
  });

  return (
    <>
      <form className="foorm" onSubmit={formLogin.handleSubmit}>
        <h2 className="txt text-center mb-3">Log in</h2>
        <div className="mb-3">
          <label className="form-label fw-bold mb-0 inp">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            className="form-control"
            onChange={formLogin.handleChange}
            onBlur={formLogin.handleBlur}
            value={formLogin.values.email}
            placeholder="Email"
          />
          {formLogin.touched.email && formLogin.errors.email ? (
            <div className="text-danger">{formLogin.errors.email}</div>
          ) : null}
        </div>
        <div className="m3">
          <label className="form-label fw-bold mb-0 inp">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control"
            onChange={formLogin.handleChange}
            onBlur={formLogin.handleBlur}
            value={formLogin.values.password}
            placeholder="Password"
          />
          {formLogin.touched.password && formLogin.errors.password ? (
            <div className="text-danger">{formLogin.errors.password}</div>
          ) : null}
        </div>
        <div className="my-3">
          <input
            type="submit"
            value="Login"
            className="btn btn-success w-100"
          />
        </div>
        <p className="fw-bold text-center tx">
          Not Registered Yet ?
          <span className="ms-1">
            <Link
              className="text-decoration-none text-successs nv"
              to="/register"
            >
              Create an Account
            </Link>
          </span>
        </p>
      </form>
    </>
  );
};

export default Login;
