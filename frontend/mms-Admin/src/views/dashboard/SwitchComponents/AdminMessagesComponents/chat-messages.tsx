import { useLocation } from "react-router-dom";
import { MentorProp } from "./select-someone";
import { useEffect, useState } from "react";
import { Field, FieldArray, Formik } from "formik";
import { getMonthDay, getShortTime } from "../../../../services/dateFunctions";
import React from "react";
import { fetchAdminChatMessagesApiAsync } from "../../../../services/axios/api-services/chat-messages";
import { useAppSelector } from "../../../../services/redux/Store";
import { selectCurrentUserToken } from "../../../../services/redux/slices/current-user-slice";
import attachFileIcon from "../../../../assets/images/AttachFile.svg";
import noSelectedItem from "../../../../assets/images/messages/no-selected-item.svg"
import ChatSendMessage from "../../../../assets/images/programs/ChatSendMessage.svg";
import ChatImoji from "../../../../assets/images/programs/ChatImoji.svg";
import { ChatMessageProp, MessageType } from "../SettingsComponents/support-live-chat";

export const NoMessageSelectedsComponent: React.FC = () => {
    return (
        <div style={{ alignItems: "center", justifyContent: "center" }} className="flex w-full h-full">
            <div className="flex flex-col">
                <img
                    src={noSelectedItem}
                    style={{
                        height: "49.86px",
                        width: "44.57px",
                        margin: "auto"
                    }}
                    alt="Attach file icon"
                />
                <label className="font-mukta text-[20px] leading-[33px] w-full items-center font-semibold text-center text-[#141414]">
                    No item selected yet
                </label>
                <label className="m-auto font-mukta font-[16px] leading-[27px] mb-10 items-center text-center text-[#999999]">
                    Select an item from the list to view a chat
                </label>
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
                    <div className="h-[calc(100vh-100px)] scrollable-by-y">
                        {currentMessages && currentMessages.length > 0
                            ? currentMessages.map(
                                (
                                    message: ChatMessageProp,
                                    index: React.Key | null | undefined
                                ) => {
                                    function getMessageBlock() {
                                        if (message.messageType === MessageType.Recieved) {
                                            return (
                                                <div className="relative min-w-[51%] float-right rounded-b-xl rounded-tl-xl text-[16px] leading-[24px] mx-[15px] my-[30px] ml-auto flex-col justify-end items-end px-[10px] py-[15px] pb-[6px] gap-[8px] max-w-[319px] flex-none flex-grow-0">
                                                    <div className="flex flex-col content-end float-right bg-white">
                                                        <label
                                                            className="max-w-[289px] px-3 float-right py-1 text-[16px] leading-[27px] text-[#0d082c]"
                                                            htmlFor="about"
                                                        >
                                                            {message.message}
                                                        </label>

                                                        <label
                                                            className="mt-0 float-left mb-2 ml-4 self-start text-[14px] leading-[18px] text-[rgba(13,8,44,0.4)]"
                                                            htmlFor="about"
                                                        >
                                                            {getShortTime(message.date)}
                                                        </label>
                                                    </div>
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <div className="relative rounded-b-xl min-w-[51%] rounded-tr-xl text-[16px] float-left leading-[24px] mx-[15px] my-[30px] ml-[80px] mt-[30px] flex-row justify-end items-end px-[10px] py-[15px] pb-[-30px] max-w-[270px] flex-none flex-grow-0">
                                                    <div className="flex flex-col content-start float-left bg-lighterGreen-one">
                                                        <img
                                                            src={message.icon}
                                                            alt="Attach file icon"
                                                            className="mt-[-40px] ml-[-80px] h-[60px] w-[60px]"
                                                        />
                                                        <label
                                                            className="font-semibold whitespace-nowrap text-[16px] mb-0 leading-[27px] text-[#0d082c] mt-[-45px] ml-[-10px] w-full"
                                                            htmlFor="about"
                                                        >
                                                            {message.name}
                                                        </label>
                                                        <label
                                                            className="max-w-[270px] mt-0 px-3 py-1 leading-[27px] text-[16px] text-[#0d082c] flex-none"
                                                            htmlFor="about"
                                                        >
                                                            {message.message}
                                                        </label>
                                                        <label className="mt-0 ml-4 block self-start text-[14px] leading-[18px] text-[rgba(44,8,8,0.4)]" htmlFor="about">
                                                            {getShortTime(message.date)}
                                                        </label>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    }

                                    return (
                                        <React.Fragment>
                                            <div className="min-w-[400px] w-full">
                                                {getMessageBlock()}
                                                <p className="min-w-[400px]" />
                                            </div>
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
    const user = location.state;
    const token = useAppSelector(selectCurrentUserToken);
    const [xCurrentMessages, setXCurrentMessages] = useState<ChatMessageProp[]>([]);

    useEffect(() => {
        function getMessages(mentor: MentorProp | undefined) {
            return fetchAdminChatMessagesApiAsync(token, mentor)
                .then(xx => xx)
                .catch(err => { throw err });
        }

        try {
            getMessages(user)
                .then(xx => setXCurrentMessages(xx))
                .catch(error => console.error(error));
        } catch (ee) { console.error(ee) }
    }, [user, token]);

    return (
        <div className="flex flex-row mt-0 relative h-full w-full">
            <Formik
                initialValues={xCurrentMessages}
                onSubmit={() => { }}
            >
                {({ errors, touched }) => (
                    <section className="flex flex-col mt-0 relative h-full w-full">
                        {xCurrentMessages.length === 0 && (<NoMessageSelectedsComponent />)}
                        {xCurrentMessages.length !== 0 && (<ChatMessagesComponent conversationStartDate={new Date()} messsages={xCurrentMessages} />)}
                    </section>
                )}
            </Formik>
        </div>
    );
}

export default ChatMessages;
