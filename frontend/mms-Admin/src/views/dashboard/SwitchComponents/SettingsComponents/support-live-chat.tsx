import React, { useRef, useState } from "react";
import { Formik, Form, FormikProps, Field, FieldArray } from "formik";
import * as Yup from "yup";
import logo from "../../../../assets/images/mms_logo.svg";
import ChatAttachFile from "../../../../assets/images/programs/ChatAttachFile.svg";
import ChatSendMessage from "../../../../assets/images/programs/ChatSendMessage.svg";
import ChatImoji from "../../../../assets/images/programs/ChatImoji.svg";
import {
  useAppSelector,
} from "../../../../services/redux/Store";
import ChatIcon from "../../../../assets/images/programs/ChatIcon.svg";
import {
  selectCurrentUserNameSelector, selectCurrentUserToken,
} from "../../../../services/redux/slices/current-user-slice";
import { changeCurrentUserPasswordApiAsync } from "../../../../services/axios/api-services/current-user";
import MessagePopUpPage from "../../../../components/messages/message-pop-up";
import PasswordField from "../../../../components/passwordField";
import LoadingComponent from "../../../../components/loading-components/loading-component";
import { getShortTime } from "../../../../services/dateFunctions";


interface MessageProp {
  name: string;
  date: Date;
  icon: any;
  messageType: MessageType;
  message: string;
}

enum MessageType {
  Send = "send",
  Recieved = "Recieved",
}
interface FormValues {
  messages: MessageProp[];
  pageTitle: string;
  pageIcon: any;
  pageSubTitle: string;
}

const initialValues: FormValues = {
  messages: [],
  pageTitle: "MMS Support",
  pageSubTitle: "A live chat interface that allows for seamless, natural communication and connection. ",
  pageIcon: logo,
};

const messages = [
  "Hello! How are you doing?",
  "A'm doing well, thanks you.\r\nHow can I help",
  "I have a question about the return policy for a product I purchased.",
  "Ok! Kindly what is the problem",
  "It's showing that is expired",
  "It's even unable to be loaded",
  "Help me with your insurance number",
];

for (let i = 0; i < messages.length; i++) {
  var isReceived = i % 2 === 0;
  if (i > 4) isReceived = i % 2 !== 0;
  initialValues.messages.push({
    name: !isReceived ? "Assistant" : "Anonymous",
    date: new Date(),
    icon: ChatIcon,
    messageType: isReceived ? MessageType.Recieved : MessageType.Send,
    message: messages[i],
  });
}


const SupportLiveChatPage: React.FC = () => {
  const { userId, email } = useAppSelector(selectCurrentUserNameSelector);
  const token = useAppSelector(selectCurrentUserToken);
  const [isBusy, setIsBusy] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const pageRef = useRef<FormikProps<{}>>(null);

  const showErrorMessage = (tt: any) => {
    try {
      setIsBusy(false);
      setErrorMessage(tt?.message ?? tt);
    } catch (err) {
      setErrorMessage(tt);
    }
  };

  const validationSchema = Yup.object().shape({});

  const handleSubmit = async (
    { }
  ) => {
    try {
      setErrorMessage("");
      setSuccessMessage("");
      setIsBusy(true);

    } catch (error: any) {
      showErrorMessage(error.message);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values: FormValues) => console.log(values)}
        validationSchema={validationSchema}
        render={({ handleSubmit, errors, touched, values }) => (
          <Form className="w-full bg-white m-0 p-0 min-w-[450px] h-full absolute right-[450px] font-mukta border-solid border-lightGray-two border rounded-md">
            <div className="flex flex-col relative bg-white p-0 m-0 w-full h-full">
              <div className="flex flex-col m-0 p-0 bg-green-three w-full h-[269px]">
                <div className="flex flex-row m-0 p-0 h-[100px]">
                  <div
                    className="mr-auto mb-auto rounded-[10px] p-0 ml-[30px] mt-[30px] font-medium">
                    <div className="h-[60px] w-[60px] p-0 m-0 bg-white rounded-full" > </div>
                    <img src={values.pageIcon} className="mt-[-57px] ml-[8px] w-[50px] h-[52px]" alt="Attach file icon"></img>
                  </div>

                  <button
                    type="button"
                    className="btn-secondary ml-auto mb-auto rounded-[10px] p-0 mr-[30px] mt-[30px] font-medium"
                  >
                    <div className="h-[40px] w-[40px] opacity-[0.2] hover:opacity-[.5] p-0 m-0 bg-white rounded-full" > </div>
                    <svg className="mt-[-27px] ml-auto mr-[12px]" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 1L1 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M1 1L13 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </button>
                </div>
                <h3 className="text-2xl text-white font-semibold mt-[10px] ml-[30px]">{values.pageTitle}</h3>
                <h4 className="text-white mt-[10px] ml-[30px] pb-[30px]">{values.pageSubTitle}</h4>
              </div>
              <div className="flex bg-white flex-col w-full h-full">
                <FieldArray
                  name="messages"
                  render={(helpers) => (
                    <div className="h-[calc(85vh-300px)]">
                      {values.messages && values.messages.length > 0
                        ? values.messages.map(
                          (
                            message: MessageProp,
                            index: React.Key | null | undefined
                          ) => {
                            function getMessageBlock() {
                              if (message.messageType === MessageType.Recieved) {
                                return (
                                  <div className="float-right text-[16px] leading-[24px] mx-[15px] my-[30px] ml-auto flex-col justify-end items-end px-[10px] py-[15px] pb-[30px] gap-[8px] max-w-[319px] border-r-[10px] bg-green-three flex-none flex-grow-0">
                                    <label
                                      className="max-w-[289px] text-[16px] leading-[27px] text-white"
                                      htmlFor="about"
                                    >
                                      {message.message}
                                    </label>
                                    <br />
                                    <label
                                      className="leading-[18px] flex-none flex-grow-0 text-[rgba(13, 8, 44, 0.4)] absolute mt-[10px] text-[14px]"
                                      htmlFor="about"
                                    >
                                      {getShortTime(message.date)}
                                    </label>
                                  </div>
                                );
                              } else {
                                return (
                                  <div>
                                    <div className="relative text-[16px] float-left leading-[24px] mx-[15px] my-[30px] ml-[70px] mt-[30px] flex-row justify-end items-end px-[10px] py-[15px] pb-[-30px] max-w-[270px] bg-[#f1f7ff] flex-none flex-grow-0">
                                      <img
                                        src={message.icon}
                                        alt="Attach file icon"
                                        className="absolute mt-[-30px] ml-[-80px] h-[60px] w-[60px]"
                                      />
                                      <label
                                        className="font-semibold text-[16px] leading-[27px] text-[#0d082c] absolute mt-[-35px] ml-[-10px] h-[60px] w-[60px]"
                                        htmlFor="about"
                                      >
                                        {message.name}
                                      </label>
                                      <label
                                        className="max-w-[270px] leading-[27px] text-[16px] text-[#0d082c] flex-none"
                                        htmlFor="about"
                                      >
                                        {message.message}
                                      </label>
                                      <br />
                                      <label className="absolute mt-[10px] mr-auto right-[20px] block self-end text-[14px] leading-[18px] text-[rgba(44, 8, 8, 0.4)]" htmlFor="about">
                                        {getShortTime(message.date)}
                                      </label>
                                    </div>
                                  </div>
                                );
                              }
                            }

                            return (
                              <React.Fragment>
                                <label htmlFor="message" className="w-full">
                                  <div>{getMessageBlock()}</div>
                                </label>
                              </React.Fragment>
                            );
                          }
                        )
                        : null}
                    </div>
                  )}
                />
                <div className="flex flex-row mt-5  relative  w-full">
                  <button
                    type="button"
                    style={{ marginLeft: "auto" }}
                    className="rounded-[10px] ms-2 ps-3 me-2 font-medium mt-0"
                  >
                    <img src={ChatImoji} alt="Attach file icon"></img>
                  </button>
                  <Field
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Reply..."
                    className="text-input ms-1 border-2 border-lightGray-two rounded-[5px] text-[15px] "
                    style={{ paddingTop: "7px", paddingBottom: "7px" }}
                  />
                  <button
                    type="button"
                    style={{ marginLeft: "auto" }}
                    className="rounded-[10px] ms-2 ps-3 me-2 font-medium mt-0"
                  >
                    <img src={ChatAttachFile} alt="Attach file icon"></img>
                  </button>
                  <button
                    type="button"
                    style={{ marginLeft: "auto" }}
                    className="rounded-[10px] ms-2 ps-3 me-2 font-medium mt-0"
                  >
                    <img src={ChatSendMessage} alt="Attach file icon"></img>
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}>
      </Formik>
    </div>
  );
};

export default SupportLiveChatPage;
