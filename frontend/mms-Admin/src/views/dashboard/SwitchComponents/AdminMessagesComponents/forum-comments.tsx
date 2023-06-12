import { Field, FieldArray, Formik } from "formik";
import React, { useMemo, useState } from "react";
import attachFileIcon from "../../../../assets/images/AttachFile.svg";
import ChatImoji from "../../../../assets/images/programs/ChatImoji.svg";
import { fetchAdminDiscussionCommentsApiAsync } from "../../../../services/axios/api-services/chat-messages";
import { useAppSelector } from "../../../../services/redux/Store";
import { selectCurrentUserToken } from "../../../../services/redux/slices/current-user-slice";
import DiscussionForumComponent from "../../../../components/data-components/discussion-forum";
import { DiscussionForumProp } from "../forums";
import { useLocation } from "react-router-dom";

export interface ForumComment {
    userId?: string;
    name: string;
    files?: { content: any, fielName: string }[];
    time: Date;
    comment: string;
}

function ForumComments() {
    const [currentComments, setCurrentComments] = useState<ForumComment[] | undefined>(undefined);
    const token = useAppSelector(selectCurrentUserToken);
    const location = useLocation();
    const currentDiscussionForum: DiscussionForumProp | undefined = location.state;


    useMemo(() => {
        try {
            fetchAdminDiscussionCommentsApiAsync(token, currentDiscussionForum)
                .then(xx => setCurrentComments(xx))
                .catch(error => console.error(error));
        } catch (ee) { console.error(ee) }
    }, [currentDiscussionForum, token]);

    return (
        <div className="mt-0 px-5 py-2 relative h-[calc(100%-80px)] w-full max-w-[1095px]">
            <Formik
                initialValues={{}}
                onSubmit={() => { }}
            >
                {({ errors, touched }) => (
                    <div className="mt-0 relative py-3 h-full w-full">
                        <div className="flex w-full mb-3 flex-row">
                            <label
                                className="w-full relative text-[20px] font-semibold leading-[33px] text-[#333] h-[33px] left-0 top-[12px] font-mukta pt-0"
                                htmlFor="about"
                                style={{ color: "#141414", fontSize: "24px" }}
                            >
                                Comments
                            </label>

                            <button
                                type="submit"
                                className="ml-auto btn-primary mt-0"
                            >
                                Close
                            </button>
                        </div>
                        {
                            currentDiscussionForum && (<DiscussionForumComponent message={currentDiscussionForum} />)
                        }

                        <div className="flex flex-col my-2 pb-3 px-3 hover:border-green-three focus:border-green-three bg-lighterGreen-three">
                            <Field
                                type="text"
                                id="title"
                                as="textarea"
                                name="title"
                                placeholder="Write a comment..."
                                className="text-input flex-wrap min-h-[90px] border-2 border-none hover:border-none w-full focus:border-none bg-lighterGreen-three rounded-[5px] text-[16px] "
                            />

                            <div className="flex flex-row relative w-full">
                                <button
                                    type="button"
                                    className="rounded-[10px] font-medium mt-0"
                                >
                                    <img src={ChatImoji} alt="Attach file icon"></img>
                                </button>
                                <button
                                    type="button"
                                    className="rounded-[10px] ms-2 ps-3 me-2 font-medium mt-0"
                                >
                                    <img src={attachFileIcon} alt="Attach file icon"></img>
                                </button>
                                <button
                                    type="button"
                                    className="rounded-[10px] py-1 px-3 bg-green-three btn-secondary ml-auto text-lighterGreen-three mr-3 text-[12px] mt-0"
                                >
                                    Post Comment
                                </button>
                            </div>
                        </div>

                        <FieldArray
                            name="messages"
                            render={(helpers) => (
                                <div className={`mt-3 w-full border rounded-lg p-3 border-lightGray-two ${currentDiscussionForum ? "h-[calc(100%-200px)]" : "h-[calc(100%-20px)]"} pb-[30px] flex flex-col scrollbar-thin scrollbar-thumb-green-four scrollbar-track-white overflow-y-scroll`}>
                                    {currentComments && currentComments?.length > 0
                                        ? currentComments.map(
                                            (
                                                message: ForumComment,
                                                index: React.Key | null | undefined
                                            ) => {
                                                return (
                                                    <React.Fragment>
                                                        <label htmlFor="message" className="mb-5">
                                                            <div className="bg-lighterGreen-three w-full py-2 rounded-lg flex flex-col">
                                                                <div className="flex flex-row">
                                                                    <div className="flex row w-full">
                                                                        <h3 className="text-[16px] text-customBlack-two ms-4 font-semibold">
                                                                            {message.name}
                                                                        </h3>
                                                                    </div>
                                                                    <button className="btn-animate mr-4 ml-auto">
                                                                        <svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3Z" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                            <path d="M8 3C8.55228 3 9 2.55228 9 2C9 1.44772 8.55228 1 8 1C7.44772 1 7 1.44772 7 2C7 2.55228 7.44772 3 8 3Z" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                            <path d="M14 3C14.5523 3 15 2.55228 15 2C15 1.44772 14.5523 1 14 1C13.4477 1 13 1.44772 13 2C13 2.55228 13.4477 3 14 3Z" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                                <label
                                                                    className="text-gray-two mx-4 text-[12px]"
                                                                    htmlFor="about"
                                                                >
                                                                    {message.comment}
                                                                </label>
                                                                <label
                                                                    className="text-gray-two ml-auto mr-3 float-right text-[12px]"
                                                                    htmlFor="about"
                                                                >
                                                                    3h ago
                                                                </label>
                                                            </div>
                                                        </label>
                                                    </React.Fragment>
                                                );
                                            }
                                        )
                                        : null}
                                </div>
                            )} />
                    </div>
                )}
            </Formik>
        </div>
    );
}
export default ForumComments;