import React, { useRef, useState } from "react";
import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
import "../index.css";
import VALIDATION_PATTERNS from "../../../../assets/validation-patterns";
import FormikValidationMessageComponent from "../../../../components/error-messages/formik-validation-message-component";
import { ChangePasswordDetails } from "../../../../services/redux/types/system-user";
import {
  useAppSelector,
} from "../../../../services/redux/Store";
import {
  selectCurrentUserNameSelector, selectCurrentUserToken,
} from "../../../../services/redux/slices/current-user-slice";
import { changeCurrentUserPasswordApiAsync } from "../../../../services/axios/api-services/current-user";
import MessagePopUpPage from "../../../../components/messages/message-pop-up";
import PasswordField from "../../../../components/passwordField";

const PasswordPage: React.FC = () => {
  const { userId, email } = useAppSelector(selectCurrentUserNameSelector);
  const token = useAppSelector(selectCurrentUserToken);
  const initialValues: ChangePasswordDetails = {
    userId: userId,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    username: email,
  };

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const pageRef = useRef<FormikProps<ChangePasswordDetails>>(null);

  const showErrorMessage = (tt: any) => {
    try {
      setErrorMessage(tt?.message ?? tt);
    } catch (err) {
      setErrorMessage(tt);
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
    try {
      await
        changeCurrentUserPasswordApiAsync({
          ...values,
          userId: userId,
          username: email,
        }, token
        ).then(ff => setSuccessMessage("Password has been changed successifully"))
          .catch(err => { showErrorMessage(err) });
    } catch (error: any) {
      showErrorMessage(error.message);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        innerRef={pageRef}
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
                    <PasswordField
                      id="currentPassword"
                      name="currentPassword"
                      placeholder="Your current password"
                    />
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
                    <PasswordField
                      id="newPassword"
                      name="newPassword"
                      placeholder="Must be atleast 8 characters"
                    />
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
                    <PasswordField
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Must match you new password"
                    />
                  </div>
                  <FormikValidationMessageComponent name="confirmPassword" />
                </div>
              </div>
            </div>
            <div className="flex w-full">
              <button
                type="submit"
                style={{ marginLeft: "auto" }}
                className="btn-primary mt-1"
              >
                Save new password
              </button>
            </div>

            {successMessage?.length > 7
              && (<MessagePopUpPage
                persist={false}
                toggle={() => {
                  setSuccessMessage("");
                  setErrorMessage("");
                  if (pageRef?.current?.values)
                    pageRef.current.values = { currentPassword: "", newPassword: "", confirmPassword: "" };
                }}
                message={"Password Successfully Changed"} />
              )}

            <div className="flex w-full">
              <a
                className="text-[15px] text-link text-green-three"
                href="/forgotpassword"
              >
                Forgot password?
              </a>
            </div>
            <h5 className="text-1xl text-gray-two font-bold mt-4">
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
