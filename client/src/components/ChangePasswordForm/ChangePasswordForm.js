import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "./ChangePasswordForm.css";
import { Link } from "react-router-dom";

export const ChangePasswordForm = ({ setAuth }) => {
  const [renderError, setRenderError] = useState(false);

  const initialValues = {
    currentPassword: "",
    newPassword: "",
  };

  const onSubmit = async (values) => {
    console.log("Form data ", values);

    // try {
    //   const response = await fetch("http://localhost:5000/auth/register", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(values),
    //   });

    //   const parseRes = await response.json();
    //   // console.log(parseRes);

    //   // save token to local storage
    //   localStorage.setItem("token", parseRes.token);
    //   setAuth(true);
    // } catch (err) {
    //   console.log(err.message);
    // }
  };

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Required"),
    newPassword: Yup.string().required("Required"),
  });

  return (
    <div className="ChangeUsernameForm">
      <div className="change-username-box">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            {
              /* console.log("Formik props", formik); */
            }
            const { currentPassword, newPassword } = formik.values;
            return (
              <div>
                <h3 className="change-username-title">Change Password</h3>

                {/* {console.log(renderError)} */}
                {renderError ? (
                  <div className="main-error-message error-message">
                    Please fill out all of the fields
                  </div>
                ) : null}

                <Form className="change-username-form">
                  <div className="change-username-field">
                    <label htmlFor="name">CURRENT PASSWORD</label>
                    <Field
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                    />
                    <ErrorMessage name="currentPassword">
                      {(errMessage) => (
                        <div className="error-message">{errMessage}</div>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="change-username-field">
                    <label htmlFor="name">NEW PASSWORD</label>
                    <Field
                      type="password"
                      id="newPassword"
                      name="newPassword"
                    />
                    <ErrorMessage name="newPassword">
                      {(errMessage) => (
                        <div className="error-message">{errMessage}</div>
                      )}
                    </ErrorMessage>
                  </div>

                  <button
                    type="submit"
                    className="button create-account-btn"
                    onClick={() => {
                      !formik.isValid || !currentPassword || !newPassword
                        ? setRenderError(true)
                        : setRenderError(false);
                    }}
                  >
                    CHANGE PASSWORD
                  </button>
                </Form>
              </div>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
