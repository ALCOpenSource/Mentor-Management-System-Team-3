import { useState, type FC } from 'react';
import { MentorUser } from '../../services/redux/types/system-user';

interface AccordionUserElementProps {
    id?: string;
    name?: string;
    isExpanded: boolean;
    width?: number;
    user: MentorUser;
    handleClick?: () => Promise<void>;
    extraStyles?: string;
}

const AccordionUserElement: FC<AccordionUserElementProps> = ({ id, name, width, isExpanded, user, handleClick, extraStyles }) => {
    const [isToggled, setIsToggled] = useState(isExpanded);
    const toggle = () => {
        if (handleClick)
            handleClick();
        setIsToggled(isExpanded = !isToggled);
    }
    return (
        <label htmlFor="pet" onBlur={() => setIsToggled(false)} onClick={toggle} className="w-full">
            <div className={`flex w-[${width ?? 800}px] flex-col`}>
                <button className="w-full h-full text-left hover:bg-lighterGreen-one mr-[20px] py-[5px] ml-[20px] mt-[10px]">
                    <div className={`w-[${width ?? 800}px] pl-[50px] rounded-lg border-[1px] border-lightGray-two  flex flex-row`}>
                        <img
                            src={user.userAvatar}
                            alt="profile logo"
                            className="rounded-full w-[50px] h-[50px]"
                        />
                        <div className="w-full">
                            <label
                                className="relative top-[3px]  text-[20px] font-semibold leading-[33px] text-[#333] h-[33px] left-0 font-mukta ms-5 pt-0 "
                                htmlFor="about"
                            >
                                {`${user.firstNames} ${user.lastName}`}
                            </label>
                            <div className="flex flex-row mt-0 relative  w-full">
                                <label
                                    className="relative h-[20px] leading-[20px] text-gray-two left-[20px] top-[-5px] font-mukta text-[12px]"
                                    htmlFor="about"
                                >
                                    {user.details}
                                </label>

                                <label
                                    className="relative px-3 rounded-lg bg-[#E6FDFE] font-mukta left-[15%] color[#4d4d4d] top-[-10px] text-[12px] leading-[20px]"
                                    htmlFor="about"
                                >
                                    {user.title}
                                </label>

                                <label
                                    className="relative px-3 rounded-lg bg-[#E6FDFE] font-mukta left-[15%] color[#4d4d4d] top-[-10px] text-[12px] leading-[20px] ms-12"
                                    htmlFor="about"
                                >
                                    {user.mentor}
                                </label>
                                <div className="right-5 mr-4 ml-auto mt-[-10px] ">
                                    {isToggled && (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C3.85752 17.9997 4.95991 18.7362 6.17317 19.2388C7.38642 19.7413 8.68678 20 10 20ZM10 18C7.87827 18 5.84344 17.1571 4.34315 15.6569C2.84285 14.1566 2 12.1217 2 10C2 7.87827 2.84285 5.84344 4.34315 4.34315C5.84344 2.84285 7.87827 2 10 2C12.1217 2 14.1566 2.84285 15.6569 4.34315C17.1571 5.84344 18 7.87827 18 10C18 12.1217 17.1571 14.1566 15.6569 15.6569C14.1566 17.1571 12.1217 18 10 18ZM15 12L10 7L5 12H15Z" stroke="#058B94" />
                                    </svg>
                                    )}
                                    {!isToggled && (<svg className="transform rotate-180" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C3.85752 17.9997 4.95991 18.7362 6.17317 19.2388C7.38642 19.7413 8.68678 20 10 20ZM10 18C7.87827 18 5.84344 17.1571 4.34315 15.6569C2.84285 14.1566 2 12.1217 2 10C2 7.87827 2.84285 5.84344 4.34315 4.34315C5.84344 2.84285 7.87827 2 10 2C12.1217 2 14.1566 2.84285 15.6569 4.34315C17.1571 5.84344 18 7.87827 18 10C18 12.1217 17.1571 14.1566 15.6569 15.6569C14.1566 17.1571 12.1217 18 10 18ZM15 12L10 7L5 12H15Z" stroke="#058B94" />
                                    </svg>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </button>
                <div
                    id="collapseTwo"
                    className={`${isToggled ? "visible" : "!visible hidden"} w-[${width ?? 800}px]`}
                    data-te-collapse-item
                    aria-labelledby="headingTwo"
                    data-te-parent="#accordionExample">
                    <div onClick={tt => tt.preventDefault()} className={`flex flex-col ml-7 px-5 py-4 w-[${width ?? 800}px] h-[690px] bg-lighterGreen-three`}>
                        <label
                            className="relative text-[20px] mt-[15px] font-semibold leading-[33px] text-[#333] h-[33px] left-0 font-mukta ms-5 pt-0"
                            htmlFor="about"
                        >
                            Bio
                        </label>
                        <label
                            className="relative text-[16px] bg-lighterGreen-two mt-[15px]  leading-[26.59px] text-[#808080] left-0 font-mukta ms-5 pt-0"
                            htmlFor="about"
                        >
                            {user.bio}
                        </label>
                        <div className="flex flex-row  mt-[15px]">
                            <label
                                className="relative ml-4 whitespace-nowrap text-[20px] mt-[1px] font-semibold text-[#333] left-0 font-mukta pt-0"
                                htmlFor="about"
                            >
                                Technical Proficiency:
                            </label>
                            <label
                                className="relative text-[16px] ml-4 mt-[1px]  leading-[26.59px] text-[#808080] left-0 font-mukta pt-1"
                                htmlFor="about"
                            >
                                {user.technicalProficiency}
                            </label>
                        </div>

                        <div className="flex mt-[15px] flex-row">
                            <label
                                className="relative ml-4 whitespace-nowrap text-[20px] mt-[1px] font-semibold text-[#333] left-0 font-mukta pt-0"
                                htmlFor="about"
                            >
                                Previous Programs:
                            </label>
                            <label
                                className="relative text-[16px] ml-4 mt-[1px]  leading-[26.59px] text-[#808080] left-0 font-mukta pt-1"
                                htmlFor="about"
                            >
                                {user.previousPrograms?.join(", ")}
                            </label>
                        </div>

                        <div className="flex  mt-[15px] flex-row">
                            <label
                                className="relative ml-4 whitespace-nowrap text-[20px] mt-[1px] font-semibold text-[#333] left-0 font-mukta pt-0"
                                htmlFor="about"
                            >
                                Previous Roles Held:
                            </label>
                            <label
                                className="relative text-[16px] ml-4 mt-[1px]  leading-[26.59px] text-[#808080] left-0 font-mukta pt-1"
                                htmlFor="about"
                            >
                                {user.previousRolesHeld?.join(", ")}
                            </label>
                        </div>

                        <div className="flex  mt-[15px] flex-row">
                            <label
                                className="relative ml-4 whitespace-nowrap text-[20px] mt-[1px] font-semibold text-[#333] left-0 font-mukta pt-0"
                                htmlFor="about"
                            >
                                Availability to join a new program:
                            </label>
                            <label
                                className="relative text-[16px] ml-4 mt-[1px]  leading-[26.59px] text-[#808080] left-0 font-mukta pt-1"
                                htmlFor="about"
                            >
                                {user.availabiityForNewProgram}
                            </label>
                        </div>

                        <div className="flex mt-[15px] flex-row">
                            <label
                                className="relative ml-4 whitespace-nowrap text-[20px] mt-[1px] font-semibold text-[#333] left-0 font-mukta pt-0"
                                htmlFor="about"
                            >
                                Program of interest:
                            </label>
                            <label
                                className="relative text-[16px] ml-4 mt-[1px]  leading-[26.59px] text-[#808080] left-0 font-mukta pt-1"
                                htmlFor="about"
                            >
                                {user.programOfInterest}
                            </label>
                        </div>

                        <div className="flex  mt-[15px] flex-row">
                            <label
                                className="relative ml-4 whitespace-nowrap text-[20px] mt-[1px] font-semibold text-[#333] left-0 font-mukta pt-0"
                                htmlFor="about"
                            >
                                Been a Mentor Before?
                            </label>
                            <label
                                className="relative text-[16px] ml-4 mt-[1px]  leading-[26.59px] text-[#808080] left-0 font-mukta pt-1"
                                htmlFor="about"
                            >
                                {user.beenAmentorBefore === true ? "Yes" : "No"}
                            </label>
                        </div>

                        <div className="flex  mt-[15px] flex-row">
                            <label
                                className="relative ml-4 whitespace-nowrap text-[20px] mt-[1px] font-semibold text-[#333] left-0 font-mukta pt-0"
                                htmlFor="about"
                            >
                                Years of Technical Experience:
                            </label>
                            <label
                                className="relative text-[16px] ml-4 mt-[1px]  leading-[26.59px] text-[#808080] left-0 font-mukta pt-1"
                                htmlFor="about"
                            >
                                {`${user.technicalYearsExperience} years`}
                            </label>
                        </div>

                        <label
                            className="relative ml-4  mt-[15px] whitespace-nowrap text-[20px] font-semibold text-[#333] left-0 font-mukta pt-0"
                            htmlFor="about"
                        >
                            Documents
                        </label>
                        <div className="flex  mt-[15px] flex-row">
                            {user.documents?.map((item, index) => (<div className="flex flex-row">
                                <svg className="mt-2 ml-4" width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.00065 17.3337H13.0007C13.9212 17.3337 14.6673 16.5875 14.6673 15.667V7.19068C14.6673 6.74865 14.4917 6.32473 14.1792 6.01217L9.32215 1.15515C9.00957 0.842584 8.58565 0.666992 8.14365 0.666992H3.00065C2.08018 0.666992 1.33398 1.41318 1.33398 2.33366V15.667C1.33398 16.5875 2.08018 17.3337 3.00065 17.3337Z" stroke="#035D63" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M8.83398 1.08301V6.49967H13.834" stroke="#035D63" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M4.66602 13.167H10.4993" stroke="#035D63" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M4.66602 9.83301H10.4993" stroke="#035D63" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M4.66602 6.5H5.49935" stroke="#035D63" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <label
                                    className="relative text-[16px] ml-1 mr-3 mt-[1px]  leading-[26.59px] text-[#808080] left-0 font-mukta pt-1"
                                    htmlFor="about"
                                >
                                    {`${item} years`}
                                </label>
                            </div>))}
                        </div>

                        <div className="flex mt-4 flex-row">
                            <a
                                href="/forgotpassword" onClick={tt => tt.preventDefault()}
                                className="text-sm visited:text-green-three text-green-three py-2 px-3 m-2"
                            >
                                Send Message
                            </a>
                            <div className="flex mr-0 ml-auto flex-row">

                                <button onClick={tt => tt.preventDefault()} className="bg-transparent btn-animate hover:bg-green-three text-green-three font-semibold hover:text-white py-0 px-6 max-h-[40px] mx-4 border border-green-three hover:border-transparent rounded-lg">
                                    Decline
                                </button>
                                <button onClick={tt => tt.preventDefault()} className="btn-primary mr-3 ml-auto max-h-[30px] p-0" >Accept</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </label>
    );
};
export default AccordionUserElement;