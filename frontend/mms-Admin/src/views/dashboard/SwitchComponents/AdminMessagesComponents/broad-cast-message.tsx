import { Field, FieldArray, Formik } from "formik";
import { getShortDate, getShortTime } from "../../../../services/dateFunctions";
import React, {  useMemo, useState } from "react";
import attachFileIcon from "../../../../assets/images/AttachFile.svg";
import ChatSendMessage from "../../../../assets/images/programs/ChatSendMessage.svg";
import ChatImoji from "../../../../assets/images/programs/ChatImoji.svg";
import { fetchAdminBroadcastMessagesApiAsync } from "../../../../services/axios/api-services/chat-messages";
import { useAppSelector } from "../../../../services/redux/Store";
import { selectCurrentUserToken } from "../../../../services/redux/slices/current-user-slice";
import { ChatMessageProp } from "../SettingsComponents/support-live-chat";

function BroadCastMessage() {
    const [currentMessages, setCurrentMessages] = useState<ChatMessageProp[] | undefined>(undefined);
    const token = useAppSelector(selectCurrentUserToken);

    useMemo(() => {
        try {
            fetchAdminBroadcastMessagesApiAsync(token)
                .then(xx => setCurrentMessages(xx))
                .catch(error => console.error(error));
        } catch (ee) { console.error(ee) }
    }, [token]);

    return (
        <div className="mt-0 px-5 py-2 relative h-full w-full">
            <Formik
                initialValues={{}}
                onSubmit={() => { }}
            >
                {({ errors, touched }) => (
                    <div className="mt-0 relative h-full w-full">
                        <div className="flex w-full flex-row">
                            <label
                                className="w-full relative text-[20px] font-semibold leading-[33px] text-[#333] h-[33px] left-0 top-[12px] font-mukta pt-0"
                                htmlFor="about"
                                style={{ color: "#141414", fontSize: "24px" }}
                            >
                                Broadcast Message
                            </label>

                            <button
                                type="submit"
                                className="ml-auto btn-primary mt-0"
                            >
                                Close
                            </button>
                        </div>
                        <div className="flex text-input w-full mt-3 flex-row">
                            <Field
                                type="text"
                                id="select-receipient"
                                name="select-receipient"
                                placeholder="Select recepient"
                                className="m-0 p-0 focus:outline-none hover:outline-none pl-3 w-full h-full text-[15px] "
                            />
                            <svg className="float-right mt-1 ml-auto mr-3" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 13L14 9H6L10 13ZM10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88333 18.6873 3.825 17.975 2.925 17.075C2.025 16.175 1.31267 15.1167 0.788 13.9C0.262667 12.6833 0 11.3833 0 10C0 8.61667 0.262667 7.31667 0.788 6.1C1.31267 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.31233 6.1 0.787C7.31667 0.262333 8.61667 0 10 0C11.3833 0 12.6833 0.262333 13.9 0.787C15.1167 1.31233 16.175 2.025 17.075 2.925C17.975 3.825 18.6873 4.88333 19.212 6.1C19.7373 7.31667 20 8.61667 20 10C20 11.3833 19.7373 12.6833 19.212 13.9C18.6873 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6873 13.9 19.212C12.6833 19.7373 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z" fill="#058B94" />
                            </svg>

                        </div>

                        <FieldArray
                            name="messages"
                            render={(helpers) => (
                                <div className="mt-0 w-full h-[calc(100%-20px)] pb-[30px] flex flex-col scrollbar-thin bg-lighterGreen-three scrollbar-thumb-green-four scrollbar-track-white overflow-y-scroll">
                                    {currentMessages && currentMessages?.length > 0
                                        ? currentMessages.map(
                                            (
                                                message: ChatMessageProp,
                                                index: React.Key | null | undefined
                                            ) => {
                                                function getMessageBlock() {
                                                    return (
                                                        <div className="flex flex-col p-3">
                                                            <label
                                                                className="text-gray-two text-[12px] font-bold self-center"
                                                                htmlFor="about"
                                                            >
                                                                {getShortDate(message.date)}
                                                            </label>
                                                            <div className="p-3 bg-lighterGreen-two">
                                                                <label
                                                                    className="text-customBlack-three text-[20px]"
                                                                    htmlFor="about"
                                                                >
                                                                    {message.message}
                                                                </label>
                                                                <br />
                                                                <div className="flex.flex-row w-full">
                                                                    <label
                                                                        className="text-[12px] text-customBlack-one font-bold"
                                                                        htmlFor="about"
                                                                    >
                                                                        Mentor  Managers
                                                                    </label>
                                                                    <label
                                                                        className="text-gray-two self-end float-right text-[12px] font-bold"
                                                                        htmlFor="about"
                                                                    >
                                                                        {getShortTime(message.date)}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    );
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
