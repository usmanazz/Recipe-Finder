import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "./Login.css";
import { Link } from "react-router-dom";
import authApi from "../../api/Auth";
import notifications from "../../components/UI/Notifications";

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
    const user = await authApi.login(values);

    // credentials are incorrect, save error message and display
    if (!user.token) {
      setErrorMessage(user);
    } else {
      // login successfull, save token and username to local storage
      localStorage.setItem("token", user.token);
      localStorage.setItem("userName", user.user_name);
      setAuth(true);
      notifications.success(
        `Login Successful, Welcome back ${user.user_name}!`,
        3000
      );
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

                {/* Field and credentials errors */}
                {renderError && errorMessage ? (
                  <div className="main-error-message error-message">
                    Please fill out all of the fields
                  </div>
                ) : renderError && !errorMessage ? (
                  <div className="main-error-message error-message">
                    Please fill out all of the fields
                  </div>
                ) : errorMessage && !renderError ? (
                  <div className="main-error-message error-message">
                    {errorMessage}
                  </div>
                ) : null}

                <Form className="login-form">
                  <div className="login-field">
                    <label htmlFor="email">EMAIL</label>
                    <Field type="text" id="email" name="email">
                      {({ field, meta: { touched, error } }) => (
                        <input
                          className={touched && error ? "invalid" : ""}
                          {...field}
                        />
                      )}
                    </Field>
                    <ErrorMessage name="email">
                      {(errMessage) => (
                        <div className="error-message">{errMessage}</div>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="login-field">
                    <label htmlFor="password">PASSWORD</label>
                    <Field type="password" id="password" name="password">
                      {({ field, meta: { touched, error } }) => (
                        <input
                          className={touched && error ? "invalid" : ""}
                          type="password"
                          {...field}
                        />
                      )}
                    </Field>
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
