import { Field, FieldArray, Formik } from "formik";
import React, { useEffect, useState } from "react";
import attachFileIcon from "../../../assets/images/AttachFile.svg";
import ChatSendMessage from "../../../assets/images/programs/ChatSendMessage.svg";
import ChatImoji from "../../../assets/images/programs/ChatImoji.svg";
import { fetchAdminDiscussionForumsApiAsync } from "../../../services/axios/api-services/chat-messages";
import { useAppSelector } from "../../../services/redux/Store";
import { selectCurrentUserToken } from "../../../services/redux/slices/current-user-slice";


export interface DiscussionForumProp {
    name: string;
    userGroup: string;
    details: string;
    title: string;
    date: Date;
    icon: any;
    message: string;
}

function Forums() {
    const [currentMessages, setCurrentMessages] = useState<DiscussionForumProp[] | undefined>(undefined);
    const token = useAppSelector(selectCurrentUserToken);

    useEffect(() => {
        try {
            fetchAdminDiscussionForumsApiAsync(token)
                .then(xx => setCurrentMessages(xx))
                .catch(error => console.error(error));
        } catch (ee) { console.error(ee) }
    });

    return (
        <div className="mt-0 px-5 py-2 relative h-[calc(100%-80px)] w-full">
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
                                Discussion Forum
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
                                id="add-new-topic"
                                name="add-new-topic"
                                placeholder="Add new topic"
                                className="m-0 p-0 pl-3 w-full h-full focus:outline-none hover:outline-none text-[15px] "
                            />
                            <svg className="float-right mt-1 ml-auto mr-3" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 6V16V6ZM6 11H16H6Z" fill="#058B94" />
                                <path d="M11 6V16M6 11H16" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>

                        <FieldArray
                            name="messages"
                            render={(helpers) => (
                                <div className="mt-0 w-full h-[calc(100%-20px)] pb-[30px] flex flex-col scrollbar-thin scrollbar-thumb-green-four scrollbar-track-white overflow-y-scroll">
                                    {currentMessages && currentMessages?.length > 0
                                        ? currentMessages.map(
                                            (
                                                message: DiscussionForumProp,
                                                index: React.Key | null | undefined
                                            ) => {
                                                function getMessageBlock() {
                                                    return (
                                                        <div className="flex flex-col p-3">
                                                            <div className="flex items-start justify-start w-full flex-row mt-[2%]">
                                                                <img
                                                                    src={message.icon}
                                                                    className="rounded-full w-[45px] h-[45px]"
                                                                    alt="user profile avatar"
                                                                />
                                                                <div>
                                                                    <div className="flex row w-full">
                                                                        <h3 className="text-[20px] text-customBlack-two ms-4 font-bold">
                                                                            {message.name}
                                                                        </h3>
                                                                    </div>
                                                                    <label
                                                                        className="outline-none text-gray-two text-[12px] ml-2 font-medium w-full h-full px-[8px] py-[18px]"
                                                                    >
                                                                        {message.userGroup}
                                                                    </label>
                                                                </div>
                                                            </div>                                                            <label
                                                                className="text-customBlack-two font-semibold text-[20px]"
                                                                htmlFor="about"
                                                            >
                                                                {message.title}
                                                            </label>
                                                            <div className="p-3 bg-lighterGreen-two">
                                                                <label
                                                                    className="text-gray-two text-[16px]"
                                                                    htmlFor="about"
                                                                >
                                                                    {message.details}
                                                                </label>
                                                                <br />
                                                                <div className="flex.flex-row w-full">
                                                                    <button type="button" className="relative btn-animate inline-flex items-center p-3 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-non">
                                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M9.99935 18.3337C14.6017 18.3337 18.3327 14.6027 18.3327 10.0003C18.3327 5.39795 14.6017 1.66699 9.99935 1.66699C5.39697 1.66699 1.66602 5.39795 1.66602 10.0003C1.66602 12.2195 2.53347 14.2361 3.94778 15.7295L2.27169 17.6424C2.03569 17.9117 2.22697 18.3337 2.58508 18.3337H9.99935Z" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                            <path d="M5.83398 7.5H14.1673" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                            <path d="M5.83398 10.833H9.16732" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                        </svg>
                                                                    </button>

                                                                    <button type="button" className="relative btn-animate inline-flex items-center p-3 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-non">
                                                                        <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M1.16602 18.3337V2.50033C1.16602 2.04009 1.53912 1.66699 1.99935 1.66699H11.9993C12.4596 1.66699 12.8327 2.04009 12.8327 2.50033V18.3337L6.99935 13.2411L1.16602 18.3337Z" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                        </svg>
                                                                    </button>

                                                                    <button type="button" className="relative btn-animate inline-flex items-center p-3 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-non">
                                                                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M13.166 1.66699H17.3327V5.83366" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                            <path d="M16.5 10.8333V15.8333C16.5 16.7538 15.7538 17.5 14.8333 17.5H3.16667C2.24619 17.5 1.5 16.7538 1.5 15.8333V4.16667C1.5 3.24619 2.24619 2.5 3.16667 2.5H8.16667" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                            <path d="M9.83398 9.16634L16.9173 2.08301" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                        </svg>
                                                                    </button>

                                                                    <button type="button" className="relative float-right btn-animate inline-flex items-center p-3 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-non">
                                                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                            <path d="M11 5V11L15 15" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                        </svg>
                                                                        <label
                                                                            className="text-gray-two ml-3 float-right text-[16px]"
                                                                            htmlFor="about"
                                                                        >
                                                                            3h ago
                                                                        </label>
                                                                    </button>
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
export default Forums;