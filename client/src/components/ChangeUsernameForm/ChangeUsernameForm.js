import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "./ChangeUsernameForm.css";
import { Link } from "react-router-dom";

export const ChangeUsernameForm = ({ setAuth }) => {
  const [renderError, setRenderError] = useState(false);

  const initialValues = {
    currentUsername: "",
    newUsername: "",
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
    currentUsername: Yup.string().required("Required"),
    newUsername: Yup.string().required("Required"),
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
            const { currentUsername, newUsername } = formik.values;
            return (
              <div>
                <h3 className="change-username-title">Change Username</h3>

                {/* {console.log(renderError)} */}
                {renderError ? (
                  <div className="main-error-message error-message">
                    Please fill out all of the fields
                  </div>
                ) : null}

                <Form className="change-username-form">
                  <div className="change-username-field">
                    <label htmlFor="name">CURRENT USERNAME</label>
                    <Field
                      type="text"
                      id="currentUsername"
                      name="currentUsername"
                    />
                    <ErrorMessage name="currentUsername">
                      {(errMessage) => (
                        <div className="error-message">{errMessage}</div>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="change-username-field">
                    <label htmlFor="name">NEW USERNAME</label>
                    <Field type="text" id="newUsername" name="newUsername" />
                    <ErrorMessage name="newUsername">
                      {(errMessage) => (
                        <div className="error-message">{errMessage}</div>
                      )}
                    </ErrorMessage>
                  </div>

                  <button
                    type="submit"
                    className="button create-account-btn"
                    onClick={() => {
                      !formik.isValid || !currentUsername || !newUsername
                        ? setRenderError(true)
                        : setRenderError(false);
                    }}
                  >
                    CHANGE USERNAME
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
