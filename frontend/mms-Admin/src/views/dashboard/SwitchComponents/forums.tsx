import { Field, FieldArray, Formik } from "formik";
import React, { useMemo, useState } from "react";
import attachFileIcon from "../../../assets/images/AttachFile.svg";
import ChatSendMessage from "../../../assets/images/programs/ChatSendMessage.svg";
import ChatImoji from "../../../assets/images/programs/ChatImoji.svg";
import { fetchAdminDiscussionForumsApiAsync } from "../../../services/axios/api-services/chat-messages";
import { useAppSelector } from "../../../services/redux/Store";
import { selectCurrentUserToken } from "../../../services/redux/slices/current-user-slice";
import DiscussionForumComponent from "../../../components/data-components/discussion-forum";
import { useNavigate } from "react-router-dom";
import EditForumPostPage from "../../../components/messages/edit-forum-post";


export interface DiscussionForumProp {
    name: string;
    userGroup: string;
    details: string;
    title: string;
    date: Date;
    icon: any;
    files?: {name:string, content:any}[];
    message: string;
}

function Forums() {
    const [currentMessages, setCurrentMessages] = useState<DiscussionForumProp[] | undefined>(undefined);
    const token = useAppSelector(selectCurrentUserToken);
    const navigate = useNavigate();
    const [addIsOpen, setAddIsOpen] = useState(false);
    const [updateIsOpen, setUpdateIsOpen] = useState(false);

    useMemo(() => {
        try {
            fetchAdminDiscussionForumsApiAsync(token)
                .then(xx => setCurrentMessages(xx))
                .catch(error => console.error(error));
        } catch (ee) { console.error(ee) }
    }, [token]);

    function addForum(obj: DiscussionForumProp) {
        console.log(obj);
    }


    return (
        <div className="mt-0 px-5 py-2 relative h-[calc(100%-80px)] max-w-[1100px] w-full">
            <Formik
                initialValues={{}}
                onSubmit={() => { }}
            >
                {({ errors, touched }) => (
                    <div className="mt-0 relative h-full w-full">
                        <div className="flex w-full flex-row">
                            <label
                                className="w-full relative text-[24px] font-semibold leading-[33px] text-[#333] h-[33px] left-0 top-[12px] font-mukta pt-0"
                                htmlFor="about"
                                style={{ color: "#141414" }}
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
                        {
                            updateIsOpen && <EditForumPostPage closeHandle={() => setAddIsOpen(false)} onSubmit={addForum} />
                        }                         
                        {
                            addIsOpen && <EditForumPostPage closeHandle={() => setAddIsOpen(false)} onSubmit={addForum} />
                        }
                        <div className="flex text-input w-full mt-3 flex-row">
                            <Field
                                type="text"
                                id="add-new-topic"
                                name="add-new-topic"
                                placeholder="Add new topic"
                                className="m-0 p-0 pl-3 w-full h-full focus:outline-none hover:outline-none text-[15px] "
                            />

                            <button
                                type="button"
                                style={{ marginLeft: "auto" }}
                                onClick={() => {
                                    setUpdateIsOpen(false);
                                    setAddIsOpen(!addIsOpen);
                                }}
                                className="float-right mt-1 ml-auto mr-3 rounded-[10px]"
                            >
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 6V16V6ZM6 11H16H6Z" fill="#058B94" />
                                    <path d="M11 6V16M6 11H16" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
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

                                                return (
                                                    <React.Fragment>
                                                        <label htmlFor="message" className="mb-5">
                                                            <DiscussionForumComponent handleClick={tt => navigate("/dashboard/messages/forum-comments", { state: tt })} message={message} />
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