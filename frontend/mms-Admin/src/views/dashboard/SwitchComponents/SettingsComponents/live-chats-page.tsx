import { Field, FieldArray, Form, Formik } from "formik";
import React from "react";
import { object, array, string } from "yup";
import "./archive.css";
import "./live-chat-page.css";
import ChatAttachFile from "../../../../assets/images/programs/ChatAttachFile.svg";
import ChatSendMessage from "../../../../assets/images/programs/ChatSendMessage.svg";
import ChatImoji from "../../../../assets/images/programs/ChatImoji.svg";
import { getShortTime } from "../../../../services/dateFunctions";
import WhitePlainCircle from "../../../../assets/images/programs/WhitePlainCircle.svg";
import ChatIcon from "../../../../assets/images/programs/ChatIcon.svg";
import mmsLogoSVG from "../../../../assets/images/mms_logo.svg";

export interface ChatMessageProp {
  name: string;
  date: Date;
  icon: any;
  messageType: MessageType;
  message: string;
}

export enum MessageType {
  Send = "send",
  Recieved = "Recieved",
}
interface FormValues {
  messages: ChatMessageProp[];
  pageTitle: string;
  pageIcon: any;
  pageSubTitle: string;
}

const initialValues: FormValues = {
  messages: [],
  pageTitle: "",
  pageSubTitle: "",
  pageIcon: mmsLogoSVG,
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

const App: React.FC = () => (
  <div className="w-full p-0 m-0 h-screen">
    <Formik
      initialValues={initialValues}
      onSubmit={(values: FormValues) => console.log(values)}
      validationSchema={object().shape({
        programs: array().of(
          object().shape({
            firstName: string().required("Entering a first name is required"),
          })
        ),
      })}
      render={({ handleSubmit, errors, touched, values }) => (
        <Form className="w-full h-screen">
          <div
            style={{ height: "220px" }}
            className="bg-green-three border-green-three w-full"
          >
            <img
              src={WhitePlainCircle}
              style={{
                height: "60px",
                width: "60px",
                left: "30px",
                top: "30px",
              }}
              alt="Attach file icon"
              className="dropdown-icon"
            />
            <img
              src={mmsLogoSVG}
              style={{
                height: "60px",
                width: "60px",
                left: "32px",
                top: "30px",
              }}
              alt="Attach file icon"
              className="dropdown-icon"
            />

            <label className="header-title">MMS Support</label>
            <br />
            <label className="header-sub-title">
              A live chat interface that allows for seamless, natural
              communication and connection.
            </label>
          </div>
          <FieldArray
            name="messages"
            render={(helpers) => (
              <div className="items-container">
                {values.messages && values.messages.length > 0
                  ? values.messages.map(
                      (
                        message: ChatMessageProp,
                        index: React.Key | null | undefined
                      ) => {
                        function getMessageBlock() {
                          if (message.messageType === MessageType.Recieved) {
                            return (
                              <div className="recieved-message-block">
                                <label
                                  className="received-message-text"
                                  htmlFor="about"
                                >
                                  {message.message}
                                </label>
                                <br />
                                <label
                                  className="recieved-time"
                                  htmlFor="about"
                                >
                                  {getShortTime(message.date)}
                                </label>
                              </div>
                            );
                          } else {
                            return (
                              <div>
                                <div className="send-message-block">
                                  <img
                                    src={message.icon}
                                    alt="Attach file icon"
                                    className="chat-icon-image"
                                  />
                                  <label
                                    className="chat-person-name"
                                    htmlFor="about"
                                  >
                                    {message.name}
                                  </label>
                                  <label
                                    className="send-message-text"
                                    htmlFor="about"
                                  >
                                    {message.message}
                                  </label>
                                  <br />
                                  <label className="send-time" htmlFor="about">
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
        </Form>
      )}
    ></Formik>
  </div>
);

export default App;
