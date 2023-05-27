import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import logo from "../../assets/images/mms_logo.svg";
import FormikValidationMessageComponent from "../../components/error-messages/formik-validation-message-component";
import { useState } from "react";
import { resetCurrentUserPasswordApiAsync } from "../../services/axios/api-services/current-user";

const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required please")
    .email("It should be a valid email address"),
});

export interface EmailModel {
  email?: string;
}

const ResetPassword = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const showErrorMessage = (tt: any) => {
    try {
      setErrorMessage(tt?.message ?? tt);
    } catch (err) {
      setErrorMessage(tt);
    }
  };

  const handleSubmit = async (value: EmailModel) => {
    try {
      await resetCurrentUserPasswordApiAsync(value.email ?? "");
      setSuccessMessage("Password reset has been sent to your email");
      setErrorMessage("");
    } catch (error: any) {
      showErrorMessage(error.message);
      setSuccessMessage("");
    }
  };

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={ResetPasswordSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="flex w-full h-screen">
          <div className="flex flex-col w-6/12 bg-green-three content-center justify-center">
            <div className="flex items-center justify-center w-full flex-col">
              <img src={logo} className="w-60 h-50 mb-11" alt="logo" />
              <h3 className="text-white text-3xl font-bold">
                Mentor Management System
              </h3>
            </div>
          </div>
          <div className="flex flex-col w-6/12 content-center justify-center">
            <div className="w-3/5 m-auto">
              <h3 className="text-3xl font-bold mb-2">Forgot Password?</h3>
              <p className="text-1xl text-gray-two">
                Please enter your registered email to reset your password.
              </p>
              <div className="my-4">
                <Field
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="general-text-input text-input w-full ms-1 border-2 border-lightGray-two rounded-[5px] text-[15px]"
                />
                <FormikValidationMessageComponent name="email" />
              </div>

              <button
                type="submit"
                className="btn-primary text-lg"
              >
                Done
              </button>

              <h5 className="text-1xl text-gray-two font-bold mt-4">
                {successMessage}
              </h5>

              <h5
                style={{ color: "orangered" }}
                className="text-1xl font-bold mt-4"
              >
                {errorMessage}
              </h5>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPassword;
