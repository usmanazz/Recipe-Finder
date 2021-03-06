import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "./ChangePasswordForm.css";
import updateAuthApi from "../../api/UpdateAuth";
import notifications from "../UI/Notifications";

export const ChangePasswordForm = ({
  passwordFormikRef,
  renderPasswordError,
  setRenderPasswordError,
  passwordResMessage,
  setPasswordResMessage,
}) => {
  const initialValues = {
    currentPassword: "",
    newPassword: "",
  };

  // On submit, make api call to check if new password is valid
  const onSubmit = async (values, { resetForm }) => {
    const newPassword = await updateAuthApi.changePassword(values);

    if (newPassword === "Successfully changed password!") {
      resetForm({ values: "" });
      notifications.success(newPassword, 3000);
    } else {
      setPasswordResMessage(newPassword);
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
          innerRef={passwordFormikRef}
        >
          {(formik) => {
            const { currentPassword, newPassword } = formik.values;
            return (
              <div>
                <h3 className="change-username-title">Change Password</h3>

                {/* render client side validation error */}
                {renderPasswordError ? (
                  <div className="main-error-message message error-color">
                    Please fill out all of the fields
                  </div>
                ) : null}

                {/* Render response error sent from backend */}
                {passwordResMessage ? (
                  <div className="main-error-message message error-color">
                    {passwordResMessage}
                  </div>
                ) : null}

                <Form className="change-username-form">
                  <div className="change-username-field">
                    <label htmlFor="name">CURRENT PASSWORD</label>
                    <Field
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                    >
                      {/* formik notation to render border style for errors */}
                      {({ field, meta: { touched, error } }) => (
                        <input
                          className={touched && error ? "invalid" : ""}
                          {...field}
                          type="password"
                        />
                      )}
                    </Field>
                    <ErrorMessage name="currentPassword">
                      {(errMessage) => (
                        <div className="error-message">{errMessage}</div>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="change-username-field">
                    <label htmlFor="name">NEW PASSWORD</label>
                    <Field type="password" id="newPassword" name="newPassword">
                      {({ field, meta: { touched, error } }) => (
                        <input
                          className={touched && error ? "invalid" : ""}
                          {...field}
                          type="password"
                        />
                      )}
                    </Field>
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
                      // client side error handling
                      !formik.isValid || !currentPassword || !newPassword
                        ? setRenderPasswordError(true)
                        : setRenderPasswordError(false);
                      // do not display error from api response if we have client side errors
                      setPasswordResMessage("");
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
