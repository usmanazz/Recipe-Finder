import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "./Signup.css";
import { Link } from "react-router-dom";

export const Signup = () => {
  const [renderError, setRenderError] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const onSubmit = (values) => {
    console.log("Form data ", values);
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
            console.log("Formik props", formik);
            const { name, email, password } = formik.values;
            return (
              <div>
                <h3 className="signup-title">CREATE AN ACCOUNT</h3>

                {console.log(renderError)}
                {renderError ? (
                  <div className="main-error-message error">
                    Please fill out all of the fields
                  </div>
                ) : null}

                <Form className="signup-form">
                  <div className="signup-field">
                    <label htmlFor="name">NAME</label>
                    <Field type="text" id="name" name="name" />
                    <ErrorMessage name="name">
                      {(errMessage) => (
                        <div className="error">{errMessage}</div>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="signup-field">
                    <label htmlFor="email">EMAIL</label>
                    <Field type="email" id="email" name="email" />
                    <ErrorMessage name="email">
                      {(errMessage) => (
                        <div className="error">{errMessage}</div>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="signup-field">
                    <label htmlFor="password">PASSWORD</label>
                    <Field type="password" id="password" name="password" />
                    <ErrorMessage name="password">
                      {(errMessage) => (
                        <div className="error">{errMessage}</div>
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
