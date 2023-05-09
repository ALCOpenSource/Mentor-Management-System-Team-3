import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./index.css";
import VALIDATION_PATTERNS from "../../../../assets/validation-patterns";
import FormikValidationMessageComponent from "../../../../components/error-messages/formik-validation-message-component";
import { ChangePasswordDetails } from "../../../../services/redux/types/system-user";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../services/redux/Store";
import {
  changeCurrentUserPassword,
  selectCurrentUserNameSelector,
} from "../../../../services/redux/slices/current-user-slice";
import SVG_ICONS from "../../../../assets/svg-icons";

const PasswordPage: React.FC = () => {
  const { userId, email } = useAppSelector(selectCurrentUserNameSelector);
  const initialValues: ChangePasswordDetails = {
    userId: userId,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    username: email,
  };
  console.log(initialValues);
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const showErrorMessage = (tt: any) => {
    try {
      setErrorMessage(tt?.message ?? tt);
      setSuccessMessage("Password reset has been sent to your email");
    } catch (error: any) {
      showErrorMessage(error.message);
    }
  };


  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required(
      "Current password is required for you change it"
    ),
    newPassword: Yup.string()
      .required("New password to change is required please")
      .matches(
        VALIDATION_PATTERNS.VALID_PASSWORD,
        "A valid password must have atleast a lower letter, upper letter, number and sysmbol"
      ),
    confirmPassword: Yup.string()
      .required("Re-type the new password to confirm please")
      .oneOf(
        [Yup.ref("newPassword")],
        "New password and confirm password must match"
      ),
  });

  const handleSubmit = async (values: ChangePasswordDetails) => {
    console.log(values);
    try {
      console.log(userId, email);
      await dispatch(
        changeCurrentUserPassword({
          ...values,
          userId: userId,
          username: email,
        })
      );
    } catch (error) { }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="w-full profile-form  h-screen">
            <div>
              <div className="flex flex-col relative pt-10">
                <div className="mb-5">
                  <div className="flex flex-row  relative  w-full">
                    <input type="hidden" id="userId" name="userId" />
                    <input type="hidden" id="email" name="email" />
                    <label
                      className="text-label"
                      style={{ width: "250px" }}
                      htmlFor="currentpassword"
                    >
                      Current Password
                    </label>
                    <Field
                      type={showCurrentPassword ? "text" : "password"}
                      id="currentPassword"
                      name="currentPassword"
                      placeholder="Your current password"
                      className="text-input ms-1 border-2 border-lightGray-two rounded-[5px] text-[15px] "
                    />
                    <button
                      className="transform -translate-y-1/2 focus:outline-none password-button-visibility-icon"
                      type="button"
                      onClick={() => {
                        setShowCurrentPassword(!showCurrentPassword);
                      }}
                    >
                      {showCurrentPassword
                        ? SVG_ICONS.PASSWORD.SHOW
                        : SVG_ICONS.PASSWORD.HIDE}
                    </button>
                  </div>
                  <FormikValidationMessageComponent name="currentPassword" />
                </div>

                <div className="mb-5">
                  <div className="flex flex-row  relative  w-full">
                    <label
                      className="text-label"
                      style={{ width: "250px" }}
                      htmlFor="newPassword"
                    >
                      New Password
                    </label>
                    <Field
                      type={showPassword ? "text" : "password"}
                      id="newPassword"
                      name="newPassword"
                      placeholder="Must be atleast 8 characters"
                      className="text-input ms-1 border-2 border-lightGray-two rounded-[5px] text-[15px] "
                    />
                    <button
                      className="transform -translate-y-1/2 focus:outline-none password-button-visibility-icon"
                      type="button"
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    >
                      {showPassword
                        ? SVG_ICONS.PASSWORD.SHOW
                        : SVG_ICONS.PASSWORD.HIDE}
                    </button>
                  </div>

                  <FormikValidationMessageComponent name="newPassword" />
                </div>

                <div className="mb-5">
                  <div className="flex flex-row  relative  w-full">
                    <label
                      className="text-label"
                      style={{ width: "250px" }}
                      htmlFor="confirmPassword"
                    >
                      Confirm New Password
                    </label>
                    <Field
                      type={showPasswordConfirm ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Must match you new password"
                      className="text-input ms-1 border-2 border-lightGray-two rounded-[5px] text-[15px] "
                    />
                    <button
                      className="transform -translate-y-1/2 focus:outline-none password-button-visibility-icon"
                      type="button"
                      onClick={() => {
                        setShowPasswordConfirm(!showPasswordConfirm);
                      }}
                    >
                      {showPasswordConfirm
                        ? SVG_ICONS.PASSWORD.SHOW
                        : SVG_ICONS.PASSWORD.HIDE}
                    </button>
                  </div>

                  <FormikValidationMessageComponent name="confirmPassword" />
                </div>
              </div>
            </div>
            <div className="flex w-full">
              <button
                type="submit"
                style={{ marginLeft: "auto" }}
                className="bg-green-three text-white me-[46px] rounded-[10px] p-[10px] pe-[40px] ps-[40px] font-medium mt-1"
              >
                Save new password
              </button>
            </div>

            <div className="flex w-full">
              <a
                className="text-[15px] text-link text-green-three"
                href="/forgotpassword"
              >
                Forgot password?
              </a>
            </div>
            <h5
              className="text-1xl text-gray-two font-bold mt-4"
            >
              {successMessage}
            </h5>


            <h5
              style={{ color: "orangered" }}
              className="text-1xl font-bold mt-4"
            >
              {errorMessage}
            </h5>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PasswordPage;
