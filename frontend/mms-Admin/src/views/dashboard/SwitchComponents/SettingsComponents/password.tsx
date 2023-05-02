import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./index.css";
import VALIDATION_PATTERNS from "../../../../assets/validation-patterns";
import FormikValidationMessageComponent from "../../../../components/error-messages/formik-validation-message-component";

interface FormValues {
  userId: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const PasswordPage: React.FC = () => {
  const initialValues: FormValues = {
    userId: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
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
    confirmNewPassword: Yup.string()
      .required("Re-type the new password to confirm please")
      .oneOf(
        [Yup.ref("newPassword")],
        "New password and confirm password must match"
      ),
  });

  const handleSubmit = (values: FormValues) => {
    console.log(values);
    // save changes logic here
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
                    <label
                      className="text-label"
                      style={{ width: "200px" }}
                      htmlFor="currentpassword"
                    >
                      Current Password
                    </label>
                    <Field
                      type="text"
                      id="currentPassword"
                      name="currentPassword"
                      placeholder="Your current password"
                      className="text-input ms-1 border-2 border-lightGray-two rounded-[5px] text-[15px] "
                    />
                  </div>
                  <FormikValidationMessageComponent name="currentPassword" />
                </div>

                <div className="mb-5">
                  <div className="flex flex-row  relative  w-full">
                    <label
                      className="text-label"
                      style={{ width: "200px" }}
                      htmlFor="newPassword"
                    >
                      New Password
                    </label>
                    <Field
                      type="text"
                      id="newPassword"
                      name="newPassword"
                      placeholder="Must be atleast 8 characters"
                      className="text-input ms-1 border-2 border-lightGray-two rounded-[5px] text-[15px] "
                    />
                  </div>
                  <FormikValidationMessageComponent name="newPassword" />
                </div>

                <div className="mb-5">
                  <div className="flex flex-row  relative  w-full">
                    <label
                      className="text-label"
                      style={{ width: "200px" }}
                      htmlFor="confirmNewPassword"
                    >
                      Confirm New Password
                    </label>
                    <Field
                      type="text"
                      id="confirmNewPassword"
                      name="confirmNewPassword"
                      placeholder="Must match you new password"
                      className="text-input ms-1 border-2 border-lightGray-two rounded-[5px] text-[15px] "
                    />
                  </div>
                  <FormikValidationMessageComponent name="confirmNewPassword" />
                </div>
              </div>
            </div>
            <div className="flex w-full">
              <button
                type="submit"
                style={{ marginLeft: "auto" }}
                className="bg-green-three text-white rounded-[10px] p-[10px] pe-[40px] ps-[40px] font-medium mt-1"
              >
                Save new password
              </button>
            </div>

            <div className="flex w-full">
              <a
                className="text-[15px] text-link text-green-three"
                href="/forgotpassword"
              >
                {" "}
                Forgot password?{" "}
              </a>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PasswordPage;
