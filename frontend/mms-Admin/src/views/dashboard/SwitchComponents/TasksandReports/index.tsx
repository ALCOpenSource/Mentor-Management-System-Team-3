import { useMemo, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../services/redux/Store";
import { selectCurrentUserNameSelector, selectCurrentUserToken } from "../../../../services/redux/slices/current-user-slice";
import LoadingComponent from "../../../../components/loading-components/loading-component";
import { ProgramTask, fetchAllTaskDataApiAsync } from "../../../../services/axios/api-services/tasks-and-reports";
import messageEarthingSVG from "./../../../../assets/images/messages/messages-earthing.svg"
import searchIconSVG from "./../../../../assets/images/search-green.svg";
import calendarSVG from "./../../../../assets/calendar.svg";

function Certificates() {
    const [tasks, setTasks] = useState<undefined | ProgramTask[]>(undefined);
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

            fetchAllTaskDataApiAsync(token, userId ?? "", email ?? "")
                .then(obj => {
                    setTasks(obj);
                })
                .catch(err => { showErrorMessage(err) });
        } catch (error) { showErrorMessage(error) }
    }, [email, token, userId])

    return (
        <div className="w-full mt-[3px] ml-[28px] h-full flex p-4 flex-row">
            <h5 className="text-1xl text-gray-two font-bold mt-4">
                {successMessage}
            </h5>
            <LoadingComponent isBusy={isBusy} />
            <h5
                style={{ color: "orangered" }}
                className="text-1xl font-bold mt-4"
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
                            Tasks
                        </label>
                        <button type="submit" className="navigation-button">
                            <img
                                src={searchIconSVG}
                                alt="Search icon"
                                className="h-[20px] w-[20px] mx-[10px] btn-animate"
                            />
                        </button>
                        <button type="submit" className="navigation-button">
                            <img className="ml-[20px] btn-animate mt-[12px] h-[24px] w-[24px] max-h-[40px]" src={messageEarthingSVG} alt="earthing icon" />
                        </button>
                    </div>
                    <ul className="list-none p-0 m-0 scrollable-by-y h-full w-full">
                        {tasks?.map((item, idx) => {
                            return (
                                <button onClick={() => navigate(`/dashboard/certificates/${item.url}`)} className="w-full focus:bg-white hover:shadow-lg focus:btn-animate" >
                                    <div className="w-full border my-1 border-lightgray-three focus:bg-white items-center flex flex-row">
                                        <img
                                            src={item.icon}
                                            alt="profile logo"
                                            className="w-[31.64px] h-[34.78px] mx-5 my-2"
                                        />
                                        <div className="flex w-[210px] flex-col">
                                            <label className="font-mukta text-left truncate mx-1 align text-customBlack-two ml-[10px] mt-[4px] font-bold text-[16px] leading-[29.59px]" >{item.title}</label>
                                            <span className="mt-[-8px] flex flex-grow ml-[12px]">
                                                <img src={calendarSVG} alt="Calendar" className="mr-4 w-[16.67px] h-[16.67px]" />
                                                <span className="text-[12px] text-gray-two">{`3 days from now`}</span>
                                            </span>
                                        </div>
                                    </div>
                                </button>);
                        })}
                    </ul>
                </div>
            </div>
            <div className="w-full h-full flex flex-row">
                <Outlet />
            </div>
        </div>
    )
}

export default Certificates;
