import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import "./ChangePasswordForm.css";

export const ChangePasswordForm = ({
  passwordFormikRef,
  renderPasswordError,
  setRenderPasswordError,
  passwordResMessage,
  setPasswordResMessage,
}) => {
  // const [renderError, setRenderError] = useState(false);
  // const [resMessage, setResMessage] = useState("");
  // const formikRef = useRef();

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
        setPasswordResMessage(parseRes);
        // toast.error(parseRes, {
        //   position: "top-right",
        //   autoClose: 3000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: false,
        //   draggable: false,
        //   progress: undefined,
        // });
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
          innerRef={passwordFormikRef}
        >
          {(formik) => {
            const { currentPassword, newPassword } = formik.values;
            return (
              <div>
                <h3 className="change-username-title">Change Password</h3>

                {renderPasswordError ? (
                  <div className="main-error-message message error-color">
                    Please fill out all of the fields
                  </div>
                ) : null}

                {/* Render res sent from backend */}
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
                      !formik.isValid || !currentPassword || !newPassword
                        ? setRenderPasswordError(true)
                        : setRenderPasswordError(false);
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
