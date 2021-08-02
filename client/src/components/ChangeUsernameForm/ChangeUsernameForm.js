import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import "./ChangeUsernameForm.css";

export const ChangeUsernameForm = ({
  setAuth,
  usernameFormikRef,
  renderUsernameError,
  setRenderUsernameError,
  usernameResMessage,
  setUsernameResMessage,
  userName,
  setUserName,
}) => {
  const initialValues = {
    currentUsername: "",
    newUsername: "",
  };

  const onSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch(
        "http://localhost:5000/dashboard/change-username",
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

      if (!parseRes.includes("Successfully")) {
        setUsernameResMessage(parseRes);
      } else {
        toast.success(parseRes, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
        localStorage.setItem("userName", values.newUsername);
        setUserName(localStorage.getItem("userName"));
        resetForm({ values: "" });
      }
    } catch (err) {
      console.log(err);
    }
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
          innerRef={usernameFormikRef}
        >
          {(formik) => {
            const { currentUsername, newUsername } = formik.values;
            return (
              <div>
                <h3 className="change-username-title">Change Username</h3>

                {renderUsernameError ? (
                  <div className="main-error-message message error-color">
                    Please fill out all of the fields
                  </div>
                ) : null}

                {/* Render res sent from backend */}
                {usernameResMessage ? (
                  <div className="main-error-message message error-color">
                    {usernameResMessage}
                  </div>
                ) : null}
                <Form className="change-username-form">
                  <div className="change-username-field">
                    <label htmlFor="name">CURRENT USERNAME</label>
                    <Field
                      type="text"
                      id="currentUsername"
                      name="currentUsername"
                    >
                      {({ field, meta: { touched, error } }) => (
                        <input
                          className={touched && error ? "invalid" : ""}
                          {...field}
                        />
                      )}
                    </Field>
                    <ErrorMessage name="currentUsername">
                      {(errMessage) => (
                        <div className="error-message">{errMessage}</div>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="change-username-field">
                    <label htmlFor="name">NEW USERNAME</label>
                    <Field type="text" id="newUsername" name="newUsername">
                      {({ field, meta: { touched, error } }) => (
                        <input
                          className={touched && error ? "invalid" : ""}
                          {...field}
                        />
                      )}
                    </Field>
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
                        ? setRenderUsernameError(true)
                        : setRenderUsernameError(false);
                      setUsernameResMessage("");
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
