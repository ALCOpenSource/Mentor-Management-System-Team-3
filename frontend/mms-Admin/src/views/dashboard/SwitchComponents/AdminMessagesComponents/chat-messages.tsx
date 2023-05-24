import { useLocation, useNavigate } from "react-router-dom";
import { MentorProp } from "./select-someone";
import { useEffect, useState } from "react";
import { Field, FieldArray, Formik } from "formik";
import { ChatMessageProp, MessageType } from "../SettingsComponents/live-chats-page";
import { getMonthDay, getShortTime } from "../../../../services/dateFunctions";
import React from "react";
import { fetchAdminChatMessagesApiAsync } from "../../../../services/axios/api-services/chat-messages";
import { useAppSelector } from "../../../../services/redux/Store";
import { selectCurrentUserToken } from "../../../../services/redux/slices/current-user-slice";
import attachFileIcon from "../../../../assets/images/AttachFile.svg";
import ChatSendMessage from "../../../../assets/images/programs/ChatSendMessage.svg";
import ChatImoji from "../../../../assets/images/programs/ChatImoji.svg";

let currentUser: MentorProp | undefined = undefined;

const NoMessagesComponent: React.FC = () => {
  const navigate = useNavigate();
  const browsePeople = () => navigate("/dashboard/messages/select-someone");

  return (
    <div style={{ alignItems: "center", justifyContent: "center" }} className="flex w-full h-full">
      <div style={{ display: "inline-block", textAlign: "center", justifyContent: "center" }} >
        <img
          src={currentUser?.icon}
          style={{
            height: "44.2px",
            width: "44.2px",
            margin: "auto"
          }}
          alt="Attach file icon"
        />
        <label className="no-messages-box">
          No Messages, Yet
        </label>
        <label className="no-message-details-box">
          No messages in your chatbox, yet. Start chatting with other users
        </label>
        <button
          type="button"
          onClick={browsePeople}
          style={{ marginBottom: "20px", marginTop: "50px", margin: "auto" }}
          className="bg-green-three text-white rounded-[10px] p-[10px] font-medium mt-0"
        >
          Browse People
        </button>
      </div>
    </div>
  )
}

function ChatMessagesComponent(props: {
  messsages: ChatMessageProp[];
  conversationStartDate: Date;
}) {
  const currentMessages = props.messsages;

  return (
    <div className="flex flex-col mt-0 bg-lighterGreen-three relative h-full w-full">
      {currentMessages.length !== 0 &&
        (<div style={{ height: "30px" }} className="flex flex-row mt-0 relative w-full">
          <div style={{ height: "1px" }} className="flex flex-row mt-3 bg-green-three relative h-full w-full" />
          <div style={{ height: "30px", display: "inline-block", width: "650px", textAlign: "center" }} className="flex flex-row mt-0 relative h-full">
            <label className="text-green-three font-small">Conversation started, {getMonthDay(props.conversationStartDate)}</label>
          </div>
          <div style={{ height: "1px" }} className="flex flex-row mt-3 bg-green-three relative h-full w-full" />
        </div>)}

      <FieldArray
        name="messages"
        render={(helpers) => (
          <div className="items-messages-container">
            {currentMessages && currentMessages.length > 0
              ? currentMessages.map(
                (
                  message: ChatMessageProp,
                  index: React.Key | null | undefined
                ) => {
                  function getMessageBlock() {
                    if (message.messageType === MessageType.Recieved) {
                      return (
                        <div className="recieved-message-block bg-lighterGreen-three">
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
                              className="chat-icon-image" />
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
        )} />
      <div style={{ textAlign: "center", justifyContent: "end", width: "100%" }}
        className="flex flex-row mt-0 pe-5  relative  w-full">
        <button
          type="button"
          style={{ marginLeft: "auto" }}
          className="rounded-[10px] ms-2 ps-3 me-2 font-medium mt-0"
        >
          <img src={ChatImoji} alt="Attach file icon"></img>
        </button>
        <button
          type="button"
          style={{ marginLeft: "auto" }}
          className="rounded-[10px] ms-2 ps-3 me-2 font-medium mt-0"
        >
          <img src={attachFileIcon} alt="Attach file icon"></img>
        </button>
        <Field
          type="text"
          id="title"
          name="title"
          placeholder="Reply..."
          className="text-input ms-1 border-2 border-lightGray-two rounded-[5px] text-[15px] "
          style={{ paddingTop: "7px", paddingBottom: "7px" }} />

        <button
          type="button"
          style={{ marginLeft: "auto" }}
          className="rounded-[10px] ms-2 ps-3 hidden me-2 font-medium mt-0"
        >
          <img src={ChatSendMessage} alt="Attach file icon"></img>
        </button>
      </div>
    </div>
  );
}


function ChatMessages() {
  const location = useLocation();
  currentUser = location.state;
  const token = useAppSelector(selectCurrentUserToken);
  const [xCurrentMessages, setXCurrentMessages] = useState<ChatMessageProp[]>([]);

  useEffect(() => {
    try {
      fetchAdminChatMessagesApiAsync(token)
        .then(xx => setXCurrentMessages(xx))
        .catch(error => console.error(error));
    } catch (ee) { console.error(ee) }
  });

  return (
    <div className="flex flex-row mt-0 relative h-full w-full">
      <Formik
        initialValues={xCurrentMessages}
        onSubmit={() => { }}
      >
        {({ errors, touched }) => (
          <section className="flex flex-col mt-0 relative h-full w-full">
            {xCurrentMessages.length === 0 && (<NoMessagesComponent />)}
            {xCurrentMessages.length !== 0 && (<ChatMessagesComponent conversationStartDate={new Date()} messsages={xCurrentMessages} />)}
          </section>
        )}
      </Formik>
    </div>
  );
}

export default ChatMessages;
