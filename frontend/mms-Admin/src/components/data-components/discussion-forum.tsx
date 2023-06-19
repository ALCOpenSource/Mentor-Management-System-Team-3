import { type FC } from 'react';
import { DiscussionForumProp } from '../../views/dashboard/SwitchComponents/forums';

interface LoadingProps {
    message: DiscussionForumProp;
    handleClick?: (tt: DiscussionForumProp) => void
}

const DiscussionForumComponent: FC<LoadingProps> = ({ message, handleClick }) => {
    return (
        <div onClick={() => {
            if (handleClick)
                handleClick(message);
        }} className="flex flex-col w-full rounded-lg focus:opacity-80 border border-lightGray-two p-3">
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
                <button className="btn-animate mr-4 ml-auto">
                    <svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3Z" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M8 3C8.55228 3 9 2.55228 9 2C9 1.44772 8.55228 1 8 1C7.44772 1 7 1.44772 7 2C7 2.55228 7.44772 3 8 3Z" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M14 3C14.5523 3 15 2.55228 15 2C15 1.44772 14.5523 1 14 1C13.4477 1 13 1.44772 13 2C13 2.55228 13.4477 3 14 3Z" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
            <label
                className="text-customBlack-two font-semibold text-[20px]"
                htmlFor="about"
            >
                {message.title}
            </label>
            <div className="p-3">
                <label
                    className="text-gray-two text-[16px]"
                    htmlFor="about"
                >
                    {message.details}
                </label>
                <br />
                <div className="flex.flex-row w-full">
                    <button type="button" className="relative btn-animate inline-flex items-center p-3 text-sm font-medium text-center text-white rounded-lg focus:outline-none">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.99935 18.3337C14.6017 18.3337 18.3327 14.6027 18.3327 10.0003C18.3327 5.39795 14.6017 1.66699 9.99935 1.66699C5.39697 1.66699 1.66602 5.39795 1.66602 10.0003C1.66602 12.2195 2.53347 14.2361 3.94778 15.7295L2.27169 17.6424C2.03569 17.9117 2.22697 18.3337 2.58508 18.3337H9.99935Z" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M5.83398 7.5H14.1673" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M5.83398 10.833H9.16732" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>

                    <button type="button" className="relative btn-animate inline-flex items-center p-3 text-sm font-medium text-center text-white rounded-lg focus:outline-none">
                        <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.16602 18.3337V2.50033C1.16602 2.04009 1.53912 1.66699 1.99935 1.66699H11.9993C12.4596 1.66699 12.8327 2.04009 12.8327 2.50033V18.3337L6.99935 13.2411L1.16602 18.3337Z" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>

                    <button type="button" className="relative btn-animate inline-flex items-center p-3 text-sm font-medium text-center text-white rounded-lg focus:outline-none">
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.166 1.66699H17.3327V5.83366" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M16.5 10.8333V15.8333C16.5 16.7538 15.7538 17.5 14.8333 17.5H3.16667C2.24619 17.5 1.5 16.7538 1.5 15.8333V4.16667C1.5 3.24619 2.24619 2.5 3.16667 2.5H8.16667" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M9.83398 9.16634L16.9173 2.08301" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>

                    <button type="button" className="relative cursor-pointer float-right disabled  inline-flex items-center p-3 text-sm font-medium text-center text-white rounded-lg focus:outline-none">
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
    )
}

export default DiscussionForumComponent;