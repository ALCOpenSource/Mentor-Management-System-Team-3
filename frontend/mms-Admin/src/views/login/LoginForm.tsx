import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./LoginForm.css";
import FormikValidationMessageComponent from "./../../components/error-messages/formik-validation-message-component";
import { UsernamePassword } from "../../services/redux/types/system-user";
import { useAppDispatch } from "./../../services/redux/Store";
import logo from "../../assets/images/mms_logo.svg";
import { loginCurrentUser } from "./../../services/redux/slices/current-user-slice";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import { getGoogleLoggedInUser } from "../../services/axios/axios-services";
import PasswordField from "../../components/passwordField";

const PasswordPage: React.FC = () => {
  const initialValues: UsernamePassword = {
    username: "",
    password: "",
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Email is required please").email("It should be a valid email address"),
    password: Yup.string().required("Password is required please"),
  });

  const showErrorMessage = (tt: any) => {
    console.log("ghg", tt?.message);
    setErrorMessage(tt?.message ?? tt?.toString());
  };
  const googleLoginObj = useGoogleLogin({
    onSuccess: (codeResponse) => {
      getGoogleLoggedInUser(codeResponse.access_token)?.then(tt => 
        {
          /loginCurrentUserWIthGoogleApiAsync
        })?.catch(error => showErrorMessage(error))
    },
    onError: (error) => showErrorMessage(error)
  });
  const googleLogin = () => googleLoginObj();

  const handleSubmit = async (values: UsernamePassword) => {
    try {
      await dispatch(
        loginCurrentUser({
          ...values
        })
      ).then(dd => navigate("/dashboard"))
        .catch(err => {showErrorMessage(err)});
    } catch (error: any) {
      showErrorMessage(error?.message);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <div className="flex w-full h-screen flex-wrap">
            <div className="w-6/12 bg-green-three flex flex-col content-center justify-center">
              <figure className="flex flex-col items-center jusfify-center bg-green-three w-full">
                <img className="w-60 h-50 mb-5" src={logo} alt="MMS Logo" />
                <figcaption className="text-white font-bold">
                  Mentor Management System
                </figcaption>
              </figure>
            </div>
            <Form className="w-6/12 flex flex-col content-center justify-center">
              <div className="w-3/5 m-auto">
                <h1 className="title-text">Welcome!</h1>
                <p className="sub-title-text">Login to continue</p>
                <div className="my-0">
                  <Field
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Email"
                    className="general-text-input"
                  />
                  <FormikValidationMessageComponent name="username" />
                </div>
                <div className="relative my-0">
                  <PasswordField
                    id="password"
                    name="password"
                    placeholder="Password"
                  />                            
                  <FormikValidationMessageComponent name="password" />
                </div>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Login
                </button>
                <div className="flex flex-col">
                  <a
                    href="/forgotpassword"
                    className="text-sm text-customBlack-one text-end w-full py-2 px-3 m-2"
                  >
                    Forgot password?
                  </a>
                  <button
                    type="button"
                    onClick={googleLogin}
                    className=" flex flex-row justify-center items-center bg-white text-green-two shadow appearance-none border rounded w-full py-2 px-3 m-2 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <img
                      className="h-5 w-5 mx-2"
                      src="/images/google.png"
                      alt="Google"
                    />
                    <span className="mx-2">Sign in with Google</span>
                  </button>
                  <h5
                    style={{ color: "orangered" }}
                    className="text-1xl font-bold mt-4"
                  >
                    { errorMessage }
                  </h5>
                </div>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default PasswordPage;
