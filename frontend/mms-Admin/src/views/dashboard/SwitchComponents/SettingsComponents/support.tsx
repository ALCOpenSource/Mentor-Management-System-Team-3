import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./index.css";
import attachFileIcon from "../../../../assets/images/AttachFile.svg";
import liveChatIcon from "../../../../assets/images/LiveChat.svg";
import FormikValidationMessageComponent from "../../../../components/error-messages/formik-validation-message-component";
import PopUpPage from "./pop-up-page";
import LiveChatPage from "./live-chats-page";

interface FormValues {
  userId: string;
  name: string;
  email: string;
  title: string;
  body: string;
}

const SupportPage: React.FC = () => {
  const initialValues: FormValues = {
    userId: "",
    name: "",
    email: "",
    title: "",
    body: "",
  };

  const validationSchema = Yup.object().shape({
    body: Yup.string().required("Message is required please"),
  });

  const handleSubmit = (values: FormValues) => {
    console.log(values);
    // save changes logic here
  };

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <div>
            <Form className="w-full profile-form">
              <div className="mb-12">
                <div className="flex flex-col relative p-10">
                  <div className="flex flex-row  relative mb-3 w-full">
                    <label
                      className="text-label"
                      style={{ width: "200px" }}
                      htmlFor="name"
                    >
                      How can I help you?
                    </label>
                  </div>
                  <div className="mb-5">
                    <div className="flex flex-row  relative  w-full">
                      <Field
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        className="text-input ms-1 border-2 border-lightGray-two rounded-[5px] text-[15px] "
                        style={{ paddingTop: "7px", paddingBottom: "7px" }}
                      />
                    </div>
                    <FormikValidationMessageComponent name="name" />
                  </div>

                  <div className="mb-5">
                    <div className="flex flex-row  relative  w-full">
                      <Field
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Email"
                        className="text-input ms-1 border-2 border-lightGray-two rounded-[5px] text-[15px] "
                        style={{ paddingTop: "7px", paddingBottom: "7px" }}
                      />
                    </div>
                    <FormikValidationMessageComponent name="email" />
                  </div>

                  <div className="mb-5">
                    <div className="flex flex-row  relative  w-full">
                      <Field
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                        className="text-input ms-1 border-2 border-lightGray-two rounded-[5px] text-[15px] "
                        style={{ paddingTop: "7px", paddingBottom: "7px" }}
                      />
                    </div>
                    <FormikValidationMessageComponent name="title" />
                  </div>

                  <div className="mb-0">
                    <div className="flex flex-row  relative  w-full">
                      <Field
                        type="text"
                        id="body"
                        as="textarea"
                        name="body"
                        placeholder="Body"
                        className="text-input ms-1 border-2 border-lightGray-two rounded-[5px] text-[15px] "
                        style={{
                          paddingTop: "7px",
                          paddingBottom: "7px",
                          height: "120px",
                        }}
                      />
                    </div>
                    <FormikValidationMessageComponent name="body" />
                  </div>
                </div>

                <div className="flex w-full">
                  <button
                    type="submit"
                    style={{ marginRight: "auto" }}
                    className="rounded-[10px] p-[10px] ps-[40px] ms-[5px] font-medium mt-0"
                  >
                    <img src={attachFileIcon} alt="Attach file icon"></img>
                  </button>

                  <button
                    type="submit"
                    style={{ marginLeft: "auto" }}
                    className="bg-green-three text-white rounded-[10px] p-[10px]  me-[40px] pe-[40px] ps-[40px] font-medium mt-0"
                  >
                    Send
                  </button>
                </div>
              </div>
            </Form>
            <div className="btn flex w-full" onClick={togglePopup}>
              <button
                type="button"
                style={{ marginLeft: "auto" }}
                onClick={togglePopup}
                className="rounded-[10px] p-[10px] pe-[40px] mt-[50px] font-medium mt-0"
              >
                <img src={liveChatIcon} alt="Attach file icon"></img>
              </button>
              {isOpen && (
                <PopUpPage content={<LiveChatPage />} toggle={togglePopup} />
              )}
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default SupportPage;
