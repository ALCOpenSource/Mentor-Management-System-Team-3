import { Field, FieldArray, Formik } from "formik";
import { ChatMessageProp, MessageType } from "../SettingsComponents/live-chats-page";
import { getShortTime } from "../../../../services/dateFunctions";
import React, { useEffect, useState } from "react";
import attachFileIcon from "../../../../assets/images/AttachFile.svg";
import ChatSendMessage from "../../../../assets/images/programs/ChatSendMessage.svg";
import ChatImoji from "../../../../assets/images/programs/ChatImoji.svg";
import { fetchAdminBroadcastMessagesApiAsync, fetchAdminChatMessagesApiAsync } from "../../../../services/axios/api-services/chat-messages";
import { useAppSelector } from "../../../../services/redux/Store";
import { selectCurrentUserToken } from "../../../../services/redux/slices/current-user-slice";

function BroadCastMessage() {
    const [currentMessages, setCurrentMessages] = useState<ChatMessageProp[] | undefined>(undefined);
    const token = useAppSelector(selectCurrentUserToken);
    
    useEffect(() => {
        try {
            fetchAdminBroadcastMessagesApiAsync(token)
            .then(xx => setCurrentMessages(xx))
            .catch(error => console.error(error));
        } catch (ee) { console.error(ee) }
      });
      
    return (
        <div className="mt-0 relative h-full w-full">
            <Formik
                initialValues={{}}
                onSubmit={() => { }}
            >
                {({ errors, touched }) => (
                    <div className="mt-0 relative h-full w-full bg-lighterGreen-three">
                        <div className="flex w-full flex-row">
                            <label
                                className="mentor-title w-full ms-5 pt-0 text-customBlack-one text-lg"
                                htmlFor="about"
                                style={{ color: "#141414", fontSize: "24px" }}
                            >
                                Broadcast Message
                            </label>

                            <button
                                type="submit"
                                style={{ marginLeft: "auto" }}
                                className="bg-green-three px-10 text-white rounded-[10px] p-[10px] font-medium mt-0"
                            >
                                Close
                            </button>
                        </div>
                        <div className="flex w-full mt-3 flex-row">
                            <Field
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Last Name"
                                className="text-input ms-6 border-2 border-lightGray-two rounded-[5px] text-[15px] "
                            />
                        </div>

                        <FieldArray 
                            name="messages"
                            render={(helpers) => (
                                <div className="mt-0 w-full h-workArea flex flex-col scrollbar-thin scrollbar-thumb-green-four scrollbar-track-white overflow-y-scroll">
                                    {currentMessages && currentMessages?.length > 0
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
                            className="flex flex-row mt-[-50px]   relative  w-full">
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
                )}
            </Formik>
        </div>
    );
}
export default BroadCastMessage;