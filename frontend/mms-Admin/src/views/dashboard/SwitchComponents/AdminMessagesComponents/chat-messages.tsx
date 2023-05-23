import { useLocation, useNavigate } from "react-router-dom";
import { MentorProp } from "./select-someone";
import { useEffect, useState } from "react";
import { FieldArray, Formik } from "formik";
import { ChatMessageProp, MessageType } from "../SettingsComponents/live-chats-page";
import { getShortTime } from "../../../../services/dateFunctions";
import React from "react";
import { fetchAdminChatMessagesApiAsync } from "../../../../services/axios/api-services/chat-messages";
import { useAppSelector } from "../../../../services/redux/Store";
import { selectCurrentUserToken } from "../../../../services/redux/slices/current-user-slice";

let currentUser: MentorProp|undefined = undefined;
let currentMessages:ChatMessageProp[] = [];

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

const ChatMessagesComponent: React.FC = () => {
    const navigate = useNavigate();   
    
    return (
        <FieldArray
        name="messages"
        render={(helpers) => (
          <div className="items-container">
            {currentMessages && currentMessages.length > 0
              ? currentMessages.map(
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
    )
}


function ChatMessages() {
    const location = useLocation();
    currentUser = location.state;   
    const token = useAppSelector(selectCurrentUserToken);    

    useEffect(() =>{
        try{
            fetchAdminChatMessagesApiAsync(token)
            .then(xx => currentMessages = xx)
            .catch(error => console.error(error));
        }catch(ee){console.error(ee)}
    });

    return (
        <div>
          <Formik
            initialValues={currentMessages}
            onSubmit={() =>{}}
          >
            {({ errors, touched }) => (
               <section>
               <ChatMessagesComponent />
               </section>
            )}
          </Formik>
        </div>
      );
}

export default ChatMessages;
