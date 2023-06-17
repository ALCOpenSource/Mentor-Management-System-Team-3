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
                                <button onClick={() => setCurrentProgram(program)} className="w-full focus:bg-white hover:shadow-lg focus:btn-animate" >
                                    <div className={`border-[1px] ${program === currentProgram ? "bg-lighterGreen-two" : "bg-white"}  border-gray-300 focus:border-lighterGreen-three hover:border-lighterGreen-two rounded-[5px] flex flex-row h-[71px] mt-[10px]`}>
                                        <img
                                            src={program.icon}
                                            alt="profile logo"
                                            className="w-[29.74px] my-auto mx-3 h-[31.17px]"
                                        />
                                        <div className="w-[calc(100%-60px)] flex flex-col">
                                            <label
                                                className="pt-3 text-[16px] w-full font-semibold truncate top-3 text-customBlack-two"
                                                htmlFor="about"
                                            >
                                                {program.title}
                                            </label>
                                            <div className="flex flex-row mt-0 relative  w-full">
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
                                                    className="btn-secondary timer-button ml-5"
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
                                </button>
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
                    (<div className="w-full relative h-full border mt-4 pt-1 border-lightGray-two flex flex-col">
                        <div className="w-full rounded-lg ml-5 my-1 focus:bg-white items-center flex flex-col">
                            <label
                                className="pt-3 text-[20px] w-full font-semibold truncate top-3 text-customBlack-two"
                                htmlFor="about"
                            >
                                {currentProgram.title}
                            </label>
                            <div className="flex flex-row mt-0 relative  w-full">
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
                                    {getShortDate(currentProgram.from)}
                                </label>

                                <button
                                    type="button"
                                    className="btn-secondary timer-button ml-5"
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
                                    {getShortTime(currentProgram.from)}
                                </label>
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
                                <label className="font-mukta text-left text-[#333] my-auto px-2 font-bold text-[32px]" >{currentProgram?.creteriasAssigned?.length}</label>
                                <label className="font-mukta text-left text-[#333] my-auto px-2 font-bold text-[20px]" >Program reports</label>
                                <button
                                    type="button"
                                    className="inline-flex bg-green-three items-center px-3 text-[12px] mr-11 leading-6 my-auto text-white ml-auto rounded-md shadow btn-animate">
                                    View
                                </button>
                            </div>
                            <div className="flex mr-0 mt-9 ml-auto flex-row">
                                <button onClick={tt => tt.preventDefault()} className="bg-transparent btn-animate text-red-three font-semibold flex flex-row hover:text-red-two px-6 pt-3 max-h-[40px] mx-4 border-none hover:border-none rounded-lg">
                                    <svg width="18" className="mt-1 mx-3" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.99935 4.50008L13.9993 9.50008M13.9993 4.50008L8.99935 9.50008M5.96905 1.16675L0.666016 7.00008L5.96905 12.8334H15.666C16.5865 12.8334 17.3327 12.0872 17.3327 11.1667V2.83341C17.3327 1.91294 16.5865 1.16675 15.666 1.16675H5.96905Z" stroke="#CC000E" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    Delete/Archive Program
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
