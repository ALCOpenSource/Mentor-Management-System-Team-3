import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../services/redux/Store";
import { selectCurrentUserNameSelector, selectCurrentUserToken } from "../../../../services/redux/slices/current-user-slice";
import LoadingComponent from "../../../../components/loading-components/loading-component";
import messageEarthingSVG from "./../../../../assets/images/messages/messages-earthing.svg"
import searchIconSVG from "./../../../../assets/images/search-green.svg";
import calendarSVG from "./../../../../assets/calendar.svg";
import mentorSVG from "./../../../../assets/images/mentor-icon.svg";
import mentorManagerSVG from "./../../../../assets/images/mentor-manager-icon.svg";
import reportsProgramSVG from "./../../../../assets/images/reports-2.svg";
import noSelectedItem from "./../../../../assets/images/messages/no-selected-item.svg"
import { Program, fetchAllProgramsDataApiAsync } from "../../../../services/axios/api-services/programs";
import { getShortDate, getShortTime } from "../../../../services/dateFunctions";
import Timer from './../../../../assets/images/time.svg';

function Programs() {
    const [programs, setPrograms] = useState<undefined | Program[]>(undefined);
    const [currentProgram, setCurrentProgram] = useState<undefined | Program>(undefined);
    const [isBusy, setIsBusy] = useState(false);
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

            fetchAllProgramsDataApiAsync(token, userId ?? "", email ?? "")
                .then(obj => {
                    setPrograms(obj);
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
            <div className="w-[309px] h-full flex flex-col my-0 mx-0">
                <div className="w-[309px] h-full flex flex-col">
                    <div className="w-full flex flex-row mx-0">
                        <label
                            className="relative text-[20px] whitespace-nowrap mt-[10px] font-semibold leading-[33px] text-[#333] h-[33px] left-0 font-mukta ms-5 pt-0"
                            htmlFor="about"
                        >
                            Programs
                        </label>
                        <div className="ml-auto mr-0">
                            <button type="submit" >
                                <img
                                    src={searchIconSVG}
                                    alt="Search icon"
                                    className="h-[20px] w-[20px] mx-[10px] btn-animate"
                                />
                            </button>
                            <button type="submit" >
                                <img className="ml-[20px] btn-animate mt-[12px] h-[24px] w-[24px] max-h-[40px]" src={messageEarthingSVG} alt="earthing icon" />
                            </button>
                        </div>
                    </div>
                    <ul className="list-none px-3 m-0 scrollable-by-y mt-5 h-full w-full">
                        {programs?.map((program, idx) => {
                            return (
                                <div className="border-[1px] border-gray-300 focus:border-lighterGreen-three hover:border-lighterGreen-two rounded-[5px] flex flex-row h-[71px] mt-[10px]">
                                    <img
                                        src={program.icon}
                                        alt="profile logo"
                                        className="w-[47px] mt-[11.39px] ml-[30.78px] h-[49px]"
                                    />
                                    <div className="w-full">
                                        <label
                                            className="pt-0 text-[20px] font-bold relative top-3 left-7 text-customBlack-two"
                                            htmlFor="about"
                                        >
                                            {program.title}
                                        </label>
                                        <div className="flex flex-row mt-2 left-7 relative  w-full">
                                            <button
                                                type="button"
                                                className="btn-secondary calender-button"
                                            >
                                                <img
                                                    src={calendarSVG}
                                                    alt="Attach file icon"
                                                    className="w-[16.67px] h-[16.67px] mt-[2px]"
                                                />
                                            </button>
                                            <label
                                                className="text-[12px] text-gray-two ml-3 mt-[1px]"
                                                htmlFor="about"
                                            >
                                                {getShortDate(program.from)}
                                            </label>

                                            <button
                                                type="button"
                                                className="btn-secondary timer-button ml-8"
                                            >
                                                <img
                                                    src={Timer}
                                                    alt="Timer icon"
                                                    className="w-[16.67px] h-[16.67px] mt-[2px]"
                                                    style={{ left: "2px", bottom: "3px" }}
                                                />
                                            </button>
                                            <label
                                                className="text-[12px] text-gray-two ml-3 mt-[1px]"
                                                htmlFor="about"
                                            >
                                                {getShortTime(program.from)}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div className="max-w-[757px] w-full relative h-full flex flex-col">
                <button onClick={tt => { tt.preventDefault(); navigate("/dashboard/edit-program") }} className="btn-primary mr-2 mb-4 ml-auto" >
                    Create New Program
                </button>
                {
                    (!currentProgram) && (
                        <div className="flex flex-col h-full w-full">
                            <div className="flex flex-col border border-lightGray-two w-full h-full">
                                <div className="flex flex-col items-center my-auto">
                                    <img
                                        src={noSelectedItem}
                                        className="h-[49.86px] w-[44.57px] m-auto"
                                        alt="Attach file icon"
                                    />
                                    <label className="font-mukta text-[20px] leading-[33px] w-full items-center font-semibold text-center text-[#141414]">
                                        No item selected yet
                                    </label>
                                    <label className="m-auto font-mukta font-[16px] leading-[27px] mb-10 items-center text-center text-[#999999]">
                                        Select an item from the list to view program detail
                                    </label>
                                </div>
                            </div>
                        </div>
                    )
                }
                {currentProgram &&
                    (<div className="w-full relative h-full border mt- pt-5 border-lightGray-two flex flex-col">
                        <div className="w-full rounded-lg mr-5 my-1 focus:bg-white items-center flex flex-row">
                            <img
                                src={currentProgram?.icon}
                                alt="profile logo"
                                className="w-[31.64px] h-[34.78px] mx-5 my-2"
                            />
                            <div className="flex w-full flex-col">
                                <label className="font-mukta text-left truncate mx-1 align text-customBlack-two ml-[1px] px-2 mt-[-4px] font-bold text-[16px] leading-[29.59px]" >{currentProgram?.title}</label>
                                <span className="mt-[-4px] flex flex-grow ml-[10px]">
                                    <img src={calendarSVG} alt="Calendar" className="mr-4 w-[16.67px] h-[16.67px]" />
                                    <span className="text-[12px] text-gray-two">{`3 days from now`}</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex px-5 flex-col mt-3 w-full h-full bg-lighterGreen-three">
                            <label className="text-[16px] text-gray-two">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque
                            </label>
                            <div className="flex flex-row mt-3 rounded-lg bg-lighterGreen-two">
                                <img
                                    src={mentorManagerSVG}
                                    alt="profile logo"
                                    className="w-[20px] h-[20px] mx-5 my-auto"
                                />
                                <label className="font-mukta text-left text-[#333] my-auto px-2 font-bold text-[32px]" >{currentProgram?.mentorManagersAssigned?.length}</label>
                                <label className="font-mukta text-left text-[#333] my-auto px-2 font-bold text-[20px]" >Mentor Managers assigned to this program</label>
                                <button
                                    type="button"
                                    className="inline-flex bg-green-three items-center px-3 text-[12px] mr-11 leading-6 my-auto text-white ml-auto rounded-md shadow btn-animate">
                                    View
                                </button>
                            </div>
                            <div className="flex flex-row mt-3 rounded-lg bg-lighterGreen-two">
                                <img
                                    src={mentorSVG}
                                    alt="profile logo"
                                    className="w-[20px] h-[20px] mx-5 my-auto"
                                />
                                <label className="font-mukta text-left text-[#333] my-auto px-2 font-bold text-[32px]" >{currentProgram?.mentorAssigned?.length}</label>
                                <label className="font-mukta text-left text-[#333] my-auto px-2 font-bold text-[20px]" >Mentors assigned to this program</label>
                                <button
                                    type="button"
                                    className="inline-flex bg-green-three items-center px-3 text-[12px] mr-11 leading-6 my-auto text-white ml-auto rounded-md shadow btn-animate">
                                    View
                                </button>
                            </div>

                            <div className="flex flex-row mt-3 rounded-lg bg-lighterGreen-two">
                                <img
                                    src={reportsProgramSVG}
                                    alt="profile logo"
                                    className="w-[20px] h-[20px] mx-5 my-auto"
                                />
                                <label className="font-mukta text-left text-[#333] my-auto px-2 font-bold text-[32px]" >{currentProgram?.taskReports?.length}</label>
                                <label className="font-mukta text-left text-[#333] my-auto px-2 font-bold text-[20px]" >Program reports</label>
                                <button
                                    type="button"
                                    className="inline-flex bg-green-three items-center px-3 text-[12px] mr-11 leading-6 my-auto text-white ml-auto rounded-md shadow btn-animate">
                                    View
                                </button>
                            </div>
                            <div className="flex mr-0 mt-9 ml-auto flex-row">
                                <button onClick={tt => tt.preventDefault()} className="bg-transparent btn-animate text-red-three font-semibold flex flex-row hover:text-red-two px-6 pt-3 max-h-[40px] mx-4 border-none hover:border-none rounded-lg">
                                    <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.635742 5.38459H2.89002M2.89002 5.38459H20.9243M2.89002 5.38459V20.0573C2.89002 20.6132 3.12753 21.1464 3.55028 21.5395C3.97304 21.9326 4.54643 22.1534 5.1443 22.1534H16.4157C17.0136 22.1534 17.587 21.9326 18.0097 21.5395C18.4325 21.1464 18.67 20.6132 18.67 20.0573V5.38459H2.89002ZM6.27144 5.38459V3.28849C6.27144 2.73257 6.50895 2.19941 6.9317 1.80632C7.35446 1.41322 7.92785 1.19238 8.52572 1.19238H13.0343C13.6322 1.19238 14.2055 1.41322 14.6283 1.80632C15.0511 2.19941 15.2886 2.73257 15.2886 3.28849V5.38459M8.52572 10.6249V16.9132M13.0343 10.6249V16.9132" stroke="#FF647C" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    Delete
                                </button>
                                <button onClick={tt => { tt.preventDefault(); navigate("/dashboard/edit-program", { state: currentProgram }) }} className="btn-primary mr-[1px] ml-auto max-h-[30px] p-0" >Edit Program</button>
                            </div>
                        </div>
                    </div>)}
            </div>
        </div>
    )
}

export default Programs;
