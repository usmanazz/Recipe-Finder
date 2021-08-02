import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import "./Login.css";
import { Link } from "react-router-dom";

export const Login = ({ setAuth }) => {
  const [renderError, setRenderError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {
    console.log("form values ", values);

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const parseRes = await response.json();
      console.log(parseRes);

      // credentials are incorrect, save error message and display
      if (!parseRes.token) {
        setErrorMessage(parseRes);
      } else {
        // login successfull, save token to local storage
        localStorage.setItem("token", parseRes.token);
        localStorage.setItem("userName", parseRes.user_name);
        setAuth(true);
        toast.success(`Login Successful, Welcome back ${parseRes.user_name}!`, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="Login">
      <div className="login-box">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            const { email, password } = formik.values;
            return (
              <div>
                <h3 className="login-title">LOGIN INTO MY ACCOUNT</h3>

                {errorMessage ? (
                  <div className="main-error-message error-message">
                    {errorMessage}
                  </div>
                ) : null}

                <Form className="login-form">
                  <div className="login-field">
                    <label htmlFor="email">EMAIL</label>
                    <Field type="text" id="email" name="email" />
                    <ErrorMessage name="email">
                      {(errMessage) => (
                        <div className="error-message">{errMessage}</div>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="login-field">
                    <label htmlFor="password">PASSWORD</label>
                    <Field type="password" id="password" name="password" />
                    <ErrorMessage name="password">
                      {(errMessage) => (
                        <div className="error-message">{errMessage}</div>
                      )}
                    </ErrorMessage>
                  </div>

                  <button
                    type="submit"
                    className="button login-btn"
                    onClick={() => {
                      !formik.isValid || !email || !password
                        ? setRenderError(true)
                        : setRenderError(false);
                    }}
                  >
                    LOG IN
                  </button>
                </Form>

                <div className="login-redirect">
                  <p>
                    New to Recipe Finder?{" "}
                    <Link to="/signup">Create An Account</Link>
                  </p>
                </div>
              </div>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
