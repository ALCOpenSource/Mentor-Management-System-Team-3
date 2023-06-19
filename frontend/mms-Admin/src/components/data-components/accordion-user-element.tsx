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
            <div className={`flex w-[800px] flex-col`}>
                <button className="w-full h-full text-left hover:bg-lighterGreen-one mr-[20px] py-[5px] ml-[20px] mt-[10px]">
                    <div className={`w-[${width ?? 1200}px] pl-[50px] rounded-lg border-[1px] border-lightGray-two  flex flex-row`}>
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
                            <div className="flex flex-row mt-0 relative w-full">
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
                                    {isToggled && (<svg className="transform rotate-180" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.7175 16.7175C14.9359 18.4991 12.5196 19.5 10 19.5C8.75244 19.5 7.5171 19.2543 6.36451 18.7769C5.21191 18.2994 4.16464 17.5997 3.28249 16.7175C1.50089 14.9359 0.5 12.5196 0.5 10C0.5 7.48044 1.50089 5.06408 3.28249 3.28249C4.16464 2.40033 5.21191 1.70056 6.36451 1.22314C7.5171 0.745725 8.75244 0.5 10 0.5C11.2476 0.5 12.4829 0.745725 13.6355 1.22314C14.7881 1.70056 15.8354 2.40033 16.7175 3.28249C17.5997 4.16464 18.2994 5.21191 18.7769 6.36451C19.2543 7.5171 19.5 8.75244 19.5 10C19.5 12.5196 18.4991 14.9359 16.7175 16.7175ZM3.98959 16.0104C5.58365 17.6045 7.74566 18.5 10 18.5C12.2543 18.5 14.4163 17.6045 16.0104 16.0104C17.6045 14.4163 18.5 12.2543 18.5 10C18.5 7.74566 17.6045 5.58365 16.0104 3.98959C14.4163 2.39553 12.2543 1.5 10 1.5C7.74566 1.5 5.58365 2.39553 3.98959 3.98959C2.39553 5.58365 1.5 7.74566 1.5 10C1.5 12.2543 2.39553 14.4163 3.98959 16.0104ZM6.20711 11.5L10 7.70711L13.7929 11.5H6.20711Z" fill="#058B94" stroke="#058B94" />
                                  </svg>
                                    )}
                                    {!isToggled && (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.7175 16.7175C14.9359 18.4991 12.5196 19.5 10 19.5C8.75244 19.5 7.5171 19.2543 6.36451 18.7769C5.21191 18.2994 4.16464 17.5997 3.28249 16.7175C1.50089 14.9359 0.5 12.5196 0.5 10C0.5 7.48044 1.50089 5.06408 3.28249 3.28249C4.16464 2.40033 5.21191 1.70056 6.36451 1.22314C7.5171 0.745725 8.75244 0.5 10 0.5C11.2476 0.5 12.4829 0.745725 13.6355 1.22314C14.7881 1.70056 15.8354 2.40033 16.7175 3.28249C17.5997 4.16464 18.2994 5.21191 18.7769 6.36451C19.2543 7.5171 19.5 8.75244 19.5 10C19.5 12.5196 18.4991 14.9359 16.7175 16.7175ZM3.98959 16.0104C5.58365 17.6045 7.74566 18.5 10 18.5C12.2543 18.5 14.4163 17.6045 16.0104 16.0104C17.6045 14.4163 18.5 12.2543 18.5 10C18.5 7.74566 17.6045 5.58365 16.0104 3.98959C14.4163 2.39553 12.2543 1.5 10 1.5C7.74566 1.5 5.58365 2.39553 3.98959 3.98959C2.39553 5.58365 1.5 7.74566 1.5 10C1.5 12.2543 2.39553 14.4163 3.98959 16.0104ZM6.20711 11.5L10 7.70711L13.7929 11.5H6.20711Z" fill="#058B94" stroke="#058B94" />
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
