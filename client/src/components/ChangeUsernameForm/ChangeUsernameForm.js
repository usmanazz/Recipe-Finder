import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import "./ChangeUsernameForm.css";
import { Link } from "react-router-dom";
// import { use } from "../../../../server/routes/jwtAuth";

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
  // const [renderError, setRenderError] = useState(false);
  // const [resMessage, setResMessage] = useState("");
  // const formikRef = useRef();

  const initialValues = {
    currentUsername: "",
    newUsername: "",
  };

  const onSubmit = async (values, { resetForm }) => {
    // console.log("Form data ", values);

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
      console.log(parseRes);

      if (!parseRes.includes("Successfully")) {
        setUsernameResMessage(parseRes);
        // toast.error(parseRes, {
        //   position: "top-right",
        //   autoClose: 3000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: false,
        //   draggable: false,
        //   progress: undefined,
        // });
      } else {
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
        localStorage.setItem("userName", values.newUsername);
        console.log(values.newUsername);
        setUserName(localStorage.getItem("userName"));
        resetForm({ values: "" });
      }
    } catch (err) {
      console.log(err.message);
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
            {
              /* console.log(formik); */
            }
            const { currentUsername, newUsername } = formik.values;
            const { touched } = formik;
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
