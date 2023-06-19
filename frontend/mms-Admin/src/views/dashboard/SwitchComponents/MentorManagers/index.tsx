import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../services/redux/Store";
import { selectCurrentUserNameSelector, selectCurrentUserToken } from "../../../../services/redux/slices/current-user-slice";
import LoadingComponent from "../../../../components/loading-components/loading-component";
import messageEarthingSVG from "./../../../../assets/images/messages/messages-earthing.svg"
import searchIconSVG from "./../../../../assets/images/search-green.svg";
import NavigationFirst from "./../../../../assets/images/programs/NavigationFirst.svg";
import NavigationLast from "./../../../../assets/images/programs/NavigationLast.svg";
import NavigationNext from "./../../../../assets/images/programs/NavigationNext.svg";
import NavigationPrevious from "./../../../../assets/images/programs/NavigationPrevious.svg";
import { MentorProp } from "../AdminMessagesComponents/select-someone";
import React from "react";
import { fetchAllMentorManagerApiAsync } from "../../../../services/axios/api-services/tasks-and-reports";

function MentorManagers() {
    type LoadStyle = "NONE" | "GRID" | "LINEAR"
    const [mentorManagers, setMentorManagers] = useState<undefined | MentorProp[]>(undefined);
   // const [currentMentorManager, setCurrentMentorManager] = useState<undefined | MentorProp>(undefined);
    const [isBusy, setIsBusy] = useState(false);
    const [loadingStyle, setLoadingStyle] = useState<LoadStyle>("NONE");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const token: string = useAppSelector(selectCurrentUserToken);
    const { userId, email } = useAppSelector(selectCurrentUserNameSelector);
    const navigate = useNavigate();

    const showErrorMessage = (tt: any) => {
        try {
            setIsBusy(false);
            setErrorMessage(tt?.message ?? tt);
        } catch (err) {
            setErrorMessage(tt);
        }
    };

    useMemo(() => {
        try {
            setErrorMessage("");
            setSuccessMessage("");

            fetchAllMentorManagerApiAsync(token, userId ?? "", email ?? "")
                .then(obj => {
                    setMentorManagers(obj);
                })
                .catch(err => { showErrorMessage(err) });
        } catch (error) { showErrorMessage(error) }
    }, [email, token, userId])

    return (
        <div className="w-full mt-[3px] ml-0 h-full flex p-4 flex-row">
            <h5 className="text-1xl text-gray-two font-bold mt-4">
                {successMessage}
            </h5>
            <LoadingComponent isBusy={isBusy} />
            <h5
                className="text-1xl font-bold mt-4 text-lightRed-one"
            >
                {errorMessage}
            </h5>
            <div className="w-full h-full max-w-[1150px] flex flex-col my-0 mx-0">
                <div className="w-full h-full flex flex-col">
                    <div className="w-full flex mx-0 top-[1px]">
                        <label
                            className="relative text-[20px] whitespace-nowrap mt-[10px] font-semibold leading-[33px] text-[#333] h-[33px] left-0 font-mukta ms-5 pt-0"
                            htmlFor="about"
                        >
                            Mentor Managers
                        </label>
                        <button type="button" onClick={() => setLoadingStyle("GRID")} className="mt-3 ml-5 btn-animate">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 0H2C0.9 0 0 0.9 0 2V18C0 19.1 0.9 20 2 20H18C19.1 20 20 19.1 20 18V2C20 0.9 19.1 0 18 0ZM6 18H3C2.45 18 2 17.55 2 17V14H6V18ZM6 12H2V8H6V12ZM6 6H2V3C2 2.45 2.45 2 3 2H6V6ZM12 18H8V14H12V18ZM12 12H8V8H12V12ZM12 6H8V2H12V6ZM17 18H14V14H18V17C18 17.55 17.55 18 17 18ZM18 12H14V8H18V12ZM18 6H14V2H17C17.55 2 18 2.45 18 3V6Z" fill="#9CF6FC" />
                            </svg>
                        </button>

                        <button type="button" onClick={() => setLoadingStyle("LINEAR")} className="mt-3 ml-5 btn-animate">
                            <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 9.5C1.08333 9.5 0.729333 9.354 0.438 9.062C0.146 8.77067 0 8.41667 0 8C0 7.58333 0.146 7.22933 0.438 6.938C0.729333 6.646 1.08333 6.5 1.5 6.5C1.91667 6.5 2.27067 6.646 2.562 6.938C2.854 7.22933 3 7.58333 3 8C3 8.41667 2.854 8.77067 2.562 9.062C2.27067 9.354 1.91667 9.5 1.5 9.5ZM1.5 3.5C1.08333 3.5 0.729333 3.354 0.438 3.062C0.146 2.77067 0 2.41667 0 2C0 1.58333 0.146 1.22933 0.438 0.938C0.729333 0.646 1.08333 0.5 1.5 0.5C1.91667 0.5 2.27067 0.646 2.562 0.938C2.854 1.22933 3 1.58333 3 2C3 2.41667 2.854 2.77067 2.562 3.062C2.27067 3.354 1.91667 3.5 1.5 3.5ZM1.5 15.5C1.08333 15.5 0.729333 15.354 0.438 15.062C0.146 14.7707 0 14.4167 0 14C0 13.5833 0.146 13.2293 0.438 12.938C0.729333 12.646 1.08333 12.5 1.5 12.5C1.91667 12.5 2.27067 12.646 2.562 12.938C2.854 13.2293 3 13.5833 3 14C3 14.4167 2.854 14.7707 2.562 15.062C2.27067 15.354 1.91667 15.5 1.5 15.5ZM6 15C5.71667 15 5.47933 14.904 5.288 14.712C5.096 14.5207 5 14.2833 5 14C5 13.7167 5.096 13.4793 5.288 13.288C5.47933 13.096 5.71667 13 6 13H17C17.2833 13 17.5207 13.096 17.712 13.288C17.904 13.4793 18 13.7167 18 14C18 14.2833 17.904 14.5207 17.712 14.712C17.5207 14.904 17.2833 15 17 15H6ZM6 9C5.71667 9 5.47933 8.904 5.288 8.712C5.096 8.52067 5 8.28333 5 8C5 7.71667 5.096 7.479 5.288 7.287C5.47933 7.09567 5.71667 7 6 7H17C17.2833 7 17.5207 7.09567 17.712 7.287C17.904 7.479 18 7.71667 18 8C18 8.28333 17.904 8.52067 17.712 8.712C17.5207 8.904 17.2833 9 17 9H6ZM6 3C5.71667 3 5.47933 2.90433 5.288 2.713C5.096 2.521 5 2.28333 5 2C5 1.71667 5.096 1.479 5.288 1.287C5.47933 1.09567 5.71667 1 6 1H17C17.2833 1 17.5207 1.09567 17.712 1.287C17.904 1.479 18 1.71667 18 2C18 2.28333 17.904 2.521 17.712 2.713C17.5207 2.90433 17.2833 3 17 3H6Z" fill="#058B94" />
                            </svg>
                        </button>

                        <div className="flex flex-row ml-auto">
                            <button className="outline outline-2 text-green-three outline-green-three bg-transparent btn-animate mt-[12px] whitespace-nowrap h-6 ml-[32px] text-[12px] rounded-[4px] px-3" >Send Broadcast Message</button>

                            <button className="bg-green-three btn-animate mt-[12px] whitespace-nowrap h-6 ml-[32px] text-[12px] text-white rounded-[4px] px-3" >Add New Mentor Manager</button>

                            <div className="w-auto mr-auto p-0 m-0 flex flex-row  ">
                                <button type="submit" className="navigation-button">
                                    <img
                                        src={NavigationFirst}
                                        alt="Attach file icon"
                                        className="h-[16px] w-[16px] mx-[10px] btn-animate"
                                    />
                                </button>

                                <button type="submit" className="navigation-button">
                                    <img
                                        src={NavigationPrevious}
                                        alt="Attach file icon"
                                        className="mx-[10px] btn-animate h-[16px] w-[16px]"
                                    />
                                </button>
                                <label className="text-[16px] max-w-[100px] font-semibold text-center ml-2 mt-[12px] whitespace-nowrap" htmlFor="github">1 - 12 of 20</label>
                                <button type="submit" className="navigation-button">
                                    <img
                                        src={NavigationNext}
                                        alt="Attach file icon"
                                        className="mx-[10px] btn-animate h-[16px] w-[16px]"
                                    />
                                </button>

                                <button type="submit" className="navigation-button">
                                    <img
                                        src={NavigationLast}
                                        alt="Attach file icon"
                                        className="mx-[10px] btn-animate mr-8 h-[16px] w-[16px]"
                                    />
                                </button>

                                <button type="submit" className="navigation-button">
                                    <img
                                        src={searchIconSVG}
                                        alt="Search icon"
                                        className="h-[20px] w-[20px] mx-[10px] btn-animate"
                                    />
                                </button>

                                <img className="ml-[20px] btn-animate mt-[12px] h-[24px] w-[24px] max-h-[40px]" src={messageEarthingSVG} alt="earthing icon" />
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-row max-w-[1095px] h-full mt-1 pb-10">
                        {loadingStyle !== "LINEAR" && (<div className="px-3 m-0 mt-5 grid grid-cols-2 gap-5 w-full h-full">
                            {mentorManagers?.map((mentor, index) =>
                            (
                                <React.Fragment key={index}>
                                    <label htmlFor="pet" onClick={() => navigate("/dashboard/mentor-manager-detail", { state: [mentorManagers, mentor] })} className="w-full">
                                        <div className="w-full grid-cols-6 mr-[20px] pl-[30px] py-[5px] rounded-lg ml-[20px] border-[1px] border-lightGray-two hover:bg-lighterGreen-two flex flex-row mt-[10px]">
                                            <img
                                                src={mentor.icon}
                                                alt="profile logo"
                                                className="rounded-full my-auto w-[50px] h-[50px]"
                                            />
                                            <div className="w-full flex flex-col">
                                                <label
                                                    className="relative text-[20px] whitespace-nowrap font-semibold leading-[33px] text-[#333] h-[33px] left-0 top-[12px] font-mukta ms-5 pt-0 "
                                                    style={{ top: "3px" }}
                                                    htmlFor="about"
                                                >
                                                    {mentor.name}
                                                </label>
                                                <label
                                                    className="relative h-[20px] whitespace-nowrap leading-[20px] text-gray-two left-[20px] font-mukta text-[12px]"
                                                    htmlFor="about"
                                                >
                                                    {mentor.details}
                                                </label>
                                                <div className="flex flex-row mt-3 relative  w-full">
                                                    <label
                                                        className="relative px-2 whitespace-nowrap rounded-lg bg-[#E6FDFE] font-mukta ml-5 color[#4d4d4d] top-[-10px] text-[12px] leading-[20px]"
                                                        htmlFor="about"
                                                    >
                                                        {mentor.title}
                                                    </label>

                                                    <label
                                                        className="relative px-2 rounded-lg whitespace-nowrap bg-[#E6FDFE] font-mukta left-[5%] color[#4d4d4d] top-[-10px] text-[12px] leading-[20px] ml-[3%]"
                                                        htmlFor="about"
                                                    >
                                                        {mentor.mentor}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="flex flex-col ml-auto mr-5">
                                                <button type="button" onClick={() => setLoadingStyle("GRID")} className="ml-5 mt-3 btn-animate">
                                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 13.663 2.04094 16.0829 3.73812 17.875L1.72681 20.1705C1.44361 20.4937 1.67314 21 2.10288 21H11Z" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M6 8H16" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M6 12H10" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                </button>

                                                <button type="button" onClick={() => setLoadingStyle("GRID")} className="ml-5 mt-5 btn-animate">
                                                    <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1 5H19M3 5V19C3 20.1046 3.89543 21 5 21H15C16.1046 21 17 20.1046 17 19V5M6 5V3C6 1.89543 6.89543 1 8 1H12C13.1046 1 14 1.89543 14 3V5" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M12 10V16" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M8 10V16" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </label>
                                </React.Fragment>
                            ))}
                        </div>)}

                        {loadingStyle === "LINEAR" && (<ul className="list-none px-3 m-0 scrollable-by-y mt-5 h-full w-full">
                            {mentorManagers?.map((mentor, index) =>
                            (
                                <React.Fragment key={index}>
                                    <label htmlFor="pet" onClick={() => navigate("/dashboard/mentor-manager-detail", { state: [mentorManagers, mentor] })} className="w-full">
                                        <div className="max-w-[1095px] mr-[20px] pl-[50px] py-[5px] rounded-lg ml-[20px] border-[1px]  border-lightGray-two hover:bg-lighterGreen-two flex flex-row mt-[10px]">
                                            <img
                                                src={mentor.icon}
                                                alt="profile logo"
                                                className="rounded-full w-[50px] h-[50px]"
                                            />
                                            <div className="w-full">
                                                <label
                                                    className="relative text-[20px] font-semibold leading-[33px] text-[#333] h-[33px] left-0 top-[12px] font-mukta ms-5 pt-0 "
                                                    style={{ top: "3px" }}
                                                    htmlFor="about"
                                                >
                                                    {mentor.name}
                                                </label>
                                                <div className="flex flex-row mt-0 relative  w-full">
                                                    <label
                                                        className="relative h-[20px] leading-[20px] text-gray-two left-[20px] top-[-5px] font-mukta text-[12px]"
                                                        htmlFor="about"
                                                    >
                                                        {mentor.details}
                                                    </label>

                                                    <label
                                                        className="relative px-3 rounded-lg bg-[#E6FDFE] font-mukta left-[15%] color[#4d4d4d] top-[-10px] text-[12px] leading-[20px]"
                                                        htmlFor="about"
                                                    >
                                                        {mentor.title}
                                                    </label>

                                                    <label
                                                        className="relative px-3 rounded-lg bg-[#E6FDFE] font-mukta left-[15%] color[#4d4d4d] top-[-10px] text-[12px] leading-[20px] ml-[3%]"
                                                        htmlFor="about"
                                                    >
                                                        {mentor.mentor}
                                                    </label>
                                                    <div className="flex flex-row ml-auto mt-[-30px] mr-5">
                                                        <button type="button" onClick={() => setLoadingStyle("GRID")} className="ml-5 btn-animate">
                                                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 13.663 2.04094 16.0829 3.73812 17.875L1.72681 20.1705C1.44361 20.4937 1.67314 21 2.10288 21H11Z" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                <path d="M6 8H16" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                <path d="M6 12H10" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                            </svg>
                                                        </button>

                                                        <button type="button" onClick={() => setLoadingStyle("GRID")} className="ml-5 btn-animate">
                                                            <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M1 5H19M3 5V19C3 20.1046 3.89543 21 5 21H15C16.1046 21 17 20.1046 17 19V5M6 5V3C6 1.89543 6.89543 1 8 1H12C13.1046 1 14 1.89543 14 3V5" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                <path d="M12 10V16" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                <path d="M8 10V16" stroke="#058B94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </label>
                                </React.Fragment>
                            ))}
                        </ul>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MentorManagers;
