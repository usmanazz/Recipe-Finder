import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import "./ChangePasswordForm.css";
import { Link } from "react-router-dom";

export const ChangePasswordForm = ({ setAuth }) => {
  const [renderError, setRenderError] = useState(false);
  const [resMessage, setResMessage] = useState("");

  const initialValues = {
    currentPassword: "",
    newPassword: "",
  };

  const onSubmit = async (values, { resetForm }) => {
    // console.log("Form data ", values);

    try {
      const response = await fetch(
        "http://localhost:5000/dashboard/change-password",
        {
          method: "POST",
          headers: {
            token: localStorage.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const parseRes = await response.json();
      if (parseRes === "Successfully changed password!") {
        // setResMessage(parseRes);
        toast.success(parseRes, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
        resetForm({ values: "" });
      } else {
        // setResMessage(parseRes);
        toast.error(parseRes, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Required"),
    newPassword: Yup.string()
      .required("Required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Must contain at least 8 characters, 1 letter and 1 number"
      ),
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
            const { currentPassword, newPassword } = formik.values;
            return (
              <div>
                <h3 className="change-username-title">Change Password</h3>

                {renderError ? (
                  <div className="main-error-message message error-color">
                    Please fill out all of the fields
                  </div>
                ) : null}

                {/* Render res sent from backend */}
                {resMessage ? (
                  <div
                    className={`main-error-message message ${
                      resMessage === "Successfully changed password!"
                        ? "success-color"
                        : "error-color"
                    }`}
                  >
                    {resMessage}
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
                      setResMessage("");
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
