import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "./ChangeUsernameForm.css";
import updateAuthApi from "../../api/UpdateAuth";
import notifications from "../UI/Notifications";

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
    const newUsername = await updateAuthApi.changeUsername(values);

    if (!newUsername.includes("Successfully")) {
      setUsernameResMessage(newUsername);
    } else {
      // change username successful, persist username while user logged in
      localStorage.setItem("userName", values.newUsername);
      setUserName(localStorage.getItem("userName"));
      resetForm({ values: "" });
      notifications.success(newUsername, 3000);
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

                {/* Render response error sent from backend */}
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
