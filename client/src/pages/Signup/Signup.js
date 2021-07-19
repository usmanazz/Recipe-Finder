import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "./Signup.css";
import { Link } from "react-router-dom";

export const Signup = ({ setAuth }) => {
  const [renderError, setRenderError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const onSubmit = async (values) => {
    console.log("Form data ", values);

    try {
      const response = await fetch("http://localhost:5000/auth/register", {
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
        // save token to local storage
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .required("Required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Must contain at least 8 characters, 1 letter and 1 number"
      ),
  });

  return (
    <div className="Signup">
      <div className="signup-box">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            {
              /* console.log("Formik props", formik); */
            }
            const { name, email, password } = formik.values;
            return (
              <div>
                <h3 className="signup-title">CREATE AN ACCOUNT</h3>

                {/* Field errors */}
                {renderError ? (
                  <div className="main-error-message error-message">
                    Please fill out all of the fields
                  </div>
                ) : null}

                {/* Error signing up */}
                {errorMessage ? (
                  <div className="main-error-message error-message">
                    {errorMessage}
                  </div>
                ) : null}

                <Form className="signup-form">
                  <div className="signup-field">
                    <label htmlFor="name">USERNAME</label>
                    <Field type="text" id="name" name="name" />
                    <ErrorMessage name="name">
                      {(errMessage) => (
                        <div className="error-message">{errMessage}</div>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="signup-field">
                    <label htmlFor="email">EMAIL</label>
                    <Field type="text" id="email" name="email" />
                    <ErrorMessage name="email">
                      {(errMessage) => (
                        <div className="error-message">{errMessage}</div>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="signup-field">
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
                    className="button create-account-btn"
                    onClick={() => {
                      !formik.isValid || !name || !email || !password
                        ? setRenderError(true)
                        : setRenderError(false);
                    }}
                  >
                    CREATE ACCOUNT
                  </button>
                </Form>
              </div>
            );
          }}
        </Formik>

        <div className="login-redirect">
          <p>
            Already registered? <Link to="/login">Sign Into Your Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
