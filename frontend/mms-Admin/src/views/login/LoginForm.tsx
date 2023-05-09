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
import SVG_ICONS from "../../assets/svg-icons";

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
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const showErrorMessage = (tt: any) => {
    if (tt instanceof Error) setErrorMessage(tt.message);
    else setErrorMessage(tt);
  };

  const handleSubmit = async (values: UsernamePassword) => {
    try {
      await dispatch(
        loginCurrentUser({
          ...values,
          afterSuccessful: () => {
            navigate("/dashboard");
           },
          afterUnSuccessful: (tt) => {
            console.log(tt);
            showErrorMessage(tt);
          },
        })
      );
    } catch (error: any) {
      console.error("Your email or password is wrong", error);
      showErrorMessage(error.message);
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
                    className="text-input w-full ms-1 border-2 border-lightGray-two rounded-[5px] text-[15px] "
                  />
                  <FormikValidationMessageComponent name="username" />
                </div>
                <div className="relative my-0">
                  <Field
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Password"
                    className="p-[10px] border-2 rounded-[5px] p-5 text-[20px] my-2 w-full text-input my-5"
                  />
                  <button
                    className="transform -translate-y-1/2 focus:outline-none icon"
                    type="button"                
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword
                      ? SVG_ICONS.PASSWORD.SHOW
                      : SVG_ICONS.PASSWORD.HIDE}
                  </button>
                  <FormikValidationMessageComponent name="password" />
                </div>
                <button
                  type="submit"
                  className="bg-green-three text-white shadow appearance-none border rounded w-full py-2 px-3 m-2 leading-tight focus:outline-none focus:shadow-outline"
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
                    //onClick={handleSubmit}
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
                    {errorMessage}
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
