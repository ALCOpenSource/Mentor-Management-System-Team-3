import React, { useRef, useState } from "react";
import { Formik, Form, Field, FormikProps } from "formik";
import * as Yup from "yup";
import "../index.css";
import attachFileIcon from "../../../../assets/images/AttachFile.svg";
import liveChatIcon from "../../../../assets/images/LiveChat.svg";
import FormikValidationMessageComponent from "../../../../components/error-messages/formik-validation-message-component";
import PopUpPage from "./pop-up-page";
import LiveChatPage from "./live-chats-page";
import { sendSupportMessageApiAsync } from "../../../../services/axios/api-services/support";
import { useAppSelector } from "../../../../services/redux/Store";
import { selectCurrentUserToken } from "../../../../services/redux/slices/current-user-slice";
import MessagePopUpPage from "../../../../components/messages/message-pop-up";
export interface SupportModel {
  userId: string;
  name: string;
  email: string;
  title: string;
  body: string;
  attachments: Blob | undefined;
}

const SupportPage: React.FC = () => {
  const initialValues: SupportModel = {
    userId: "",
    name: "",
    email: "",
    title: "",
    body: "",
    attachments: undefined
  };

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [filebase64s, setFileBase64s] = useState<string[]>([]);
  let attachedFiles: Blob[] = [];


  const validationSchema = Yup.object().shape({
    body: Yup.string().required("Message is required please"),
    email: Yup.string().required("Email is required please").email("It should be a valid email address"),
    title: Yup.string().required("Title is required please"),
    name: Yup.string().required("Name is required please")
  });

  const showErrorMessage = (tt: any) => {
    try {
      setErrorMessage(tt?.message ?? tt);
    } catch (err) {
      setErrorMessage(tt);
    }
  };

  const token = useAppSelector(selectCurrentUserToken);
  const handleSubmit = async (values: SupportModel) => {
    try {
      var file = attachedFiles[0];
      await sendSupportMessageApiAsync({ ...values, attachments: file }, token)
        .then(tt => {
          setSuccessMessage("Successfully sent");
        })
        .catch(error => showErrorMessage(error));
    } catch (error) { showErrorMessage(error) }
  };

  const removeAttachedFileClick = (tt: string) => {
    if (filebase64s.includes(tt)) {
      const exceptIndex = filebase64s.indexOf(tt);
      setFileBase64s(filebase64s.filter((value, index) => exceptIndex !== index));
      attachedFiles = attachedFiles.filter((value, index) => exceptIndex !== index);
    }
  };



  function convertFile(files: FileList | null) {
    try {
      if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const fileRef = files[i] || "";
          const fileType: string = fileRef.type || "";
          //console.log("This file upload is of type:", fileType);
          //console.log("File:", fileRef.name);
          const reader = new FileReader();
          reader.readAsArrayBuffer(fileRef);
          reader.onload = async (ev: any) => {
            try {
              const file = ev.target.result;
              // convert it to base64
              var files = filebase64s ?? [];
              attachedFiles.push(file);
              setFileBase64s([...files, fileRef.name]);

              console.log("Files:", filebase64s, attachedFiles);
              //await dispatch(updateCurrentUserProfilePicture(img));
            } catch (error) { console.log(error) }
          }
        };
      }
    } catch (ee) {
      console.log(ee);
    }
  }

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const pageRef = useRef<FormikProps<SupportModel>>(null);

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        innerRef={pageRef}
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
                <div className="ms-5">
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
                {successMessage?.length > 7
                  && (<MessagePopUpPage
                    persist={false}
                    toggle={() => {
                      setSuccessMessage("");
                      setErrorMessage("");
                      if (pageRef?.current?.values)
                        pageRef.current.values = { title: "", email: "", body: "", userId: "", name: "", attachments: undefined };
                    }}
                    message={"Successfully send the message"} />
                  )}
                <div className="flex w-full">

                  <label
                    className="rounded-[10px] p-[10px] ps-[40px] ms-[5px] font-medium mt-0"
                    htmlFor="uploadFile"
                    style={{ marginRight: "auto" }}
                  >
                    <img src={attachFileIcon} alt="Attach file icon"></img>
                  </label>
                  <input
                    type="file"
                    id="uploadFile"
                    name="uploadFile"
                    className="bg-green-three ms-11 text-white rounded-[10px] p-[5px] font-medium mt-1"
                    onChange={(e) => convertFile(e.target.files)}
                  />

                  <div className="flex flex-col relative" style={{ marginRight: "auto" }}>
                    {
                      filebase64s.map((item, index) => (
                        <label > {item} <span className="close-attached-icon"
                          onClick={() => removeAttachedFileClick(item)}>
                          x
                        </span>
                        </label>))
                    }
                  </div>

                  <button
                    type="submit"
                    style={{ marginLeft: "auto", maxHeight: "40px" }}
                    className="btn-primary mt-0"
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
                <PopUpPage persist={true} content={<LiveChatPage />} toggle={togglePopup} />
              )}
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default SupportPage;
