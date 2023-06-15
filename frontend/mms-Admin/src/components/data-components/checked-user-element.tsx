import { useState, type FC } from 'react';
import { MentorProp } from '../../views/dashboard/SwitchComponents/AdminMessagesComponents/select-someone';

interface CheckedUserElementProps {
    id?: string;
    name?: string;
    width?: number;
    isSelected: boolean,
    user: MentorProp;
    handleClick?: (user: MentorProp, isSelected: boolean) => void;
    extraStyles?: string;
}

const CheckedUserElement: FC<CheckedUserElementProps> = ({ id, name, width, isSelected, user, handleClick, extraStyles }) => {
    const [isToggled, setIsToggled] = useState(isSelected);
    const toggle = () => {
        setIsToggled(isSelected = !isToggled);
        if (handleClick)
            handleClick(user, isSelected);
    }
    return (
        <label htmlFor="pet" onClick={toggle} className="w-full">
            <div className={`flex max-w-[${width ?? 309}px] flex-col`}>
                <button className="w-full h-full text-left hover:bg-lighterGreen-one mr-[2px] py-[5px] ml-[2px] mt-[10px]">
                    <div className={`w-[${width ?? 309}px] rounded-lg border-[1px] border-lightGray-two flex flex-row`}>
                        <img
                            src={user.icon}
                            alt="profile logo"
                            className="rounded-full my-auto ml-3 w-[45px] h-[45px]"
                        />
                        <div className="w-full flex flex-col">
                            <label
                                className="relative text-[16px] font-semibold text-[#333] left-0 top-[1px] font-mukta ms-5 pt-0 "
                                htmlFor="about"
                            >
                                {`${user.name}`}
                            </label>
                            <label
                                className="relative text-gray-two left-[20px] top-[-5px] font-mukta text-[12px]"
                                htmlFor="about"
                            >
                                {user.details}
                            </label>
                            <div className="flex flex-row left-[20px] -mt-1 relative  w-full">
                                <label
                                    className="relative rounded-lg whitespace-nowrap bg-[#E6FDFE] font-mukta color[#4d4d4d] max-w-1/2 text-[12px]"
                                    htmlFor="about"
                                >
                                    {user.title}
                                </label>

                                <label
                                    className="relative rounded-lg whitespace-nowrap bg-[#E6FDFE] font-mukta color[#4d4d4d] text-[12px] max-w-1/2 ml-5"
                                    htmlFor="about"
                                >
                                    {user.mentor}
                                </label>
                            </div>
                        </div>
                        <div className="right-5 mr-1 ml-auto my-auto">
                            {isToggled && (<svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 6L6.5 11L16.5 1" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            )}
                            {!isToggled && (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.99992 5.83301V14.1663M5.83325 9.99967H14.1666" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10.0001 18.3337C14.6025 18.3337 18.3334 14.6027 18.3334 10.0003C18.3334 5.39795 14.6025 1.66699 10.0001 1.66699C5.39771 1.66699 1.66675 5.39795 1.66675 10.0003C1.66675 14.6027 5.39771 18.3337 10.0001 18.3337Z" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            )}
                        </div>
                    </div>
                </button>
            </div>
        </label>
    );
};
export default CheckedUserElement;