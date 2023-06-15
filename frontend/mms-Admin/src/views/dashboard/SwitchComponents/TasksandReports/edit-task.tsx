import React, { useRef, useState } from "react";
import { Formik, Form, FormikProps, Field } from "formik";
import * as Yup from "yup";
import { useAppSelector } from "../../../../services/redux/Store";
import { selectCurrentUserNameSelector, selectCurrentUserToken } from "../../../../services/redux/slices/current-user-slice";
import PasswordField from "../../../../components/passwordField";
import FormikValidationMessageComponent from "../../../../components/error-messages/formik-validation-message-component";
import MessagePopUpPage from "../../../../components/messages/message-pop-up";
import LoadingComponent from "../../../../components/loading-components/loading-component";
import { ProgramTask, fetchAllMentorApiAsync, fetchAllMentorManagerApiAsync, saveTaskApiAsync } from "../../../../services/axios/api-services/tasks-and-reports";
import { Outlet, useLocation } from "react-router-dom";
import TasksIcon from "./../../../../assets/images/dashboard-icons/tsaks.svg";
import SearchBox from "../../../../components/search-box";
import messageCloseSVG from "./../../../../assets/images/messages/message-close.svg";
import messageEarthingSVG from "./../../../../assets/images/messages/messages-earthing.svg";
import { MentorProp } from "../AdminMessagesComponents/select-someone";
import CheckedUserElement from "../../../../components/data-components/checked-user-element";


function getNewTask(): ProgramTask {
    return {
        icon: TasksIcon,
        title: "",
        details: "",
        url: "",
        status: "IN PROGRESS",
        mentorManagersAssigned: [],
        mentorAssigned: [],
        taskReports: [],
    };
}

type showExtraData = "NONE" | "MENTORMANAGERS" | "MENTORS";
const EditTask: React.FC = () => {
    const location = useLocation();
    const { userId, email } = useAppSelector(selectCurrentUserNameSelector);
    const token = useAppSelector(selectCurrentUserToken);
    const [loadExtra, setLoadExtra] = useState<showExtraData>("NONE");
    const [isBusy, setIsBusy] = useState(false);
    const isAddingNewTask = location.state ? false : true;
    const initialValues: ProgramTask = location.state ?? getNewTask();
    const [currentData, setCurrentData] = useState<MentorProp[]>([]);
    const [selectedMentorManagers, setSelectedMentorManagers] = useState<MentorProp[]>(initialValues.mentorManagersAssigned ?? []);
    const [selectedMentors, setSelectedMentors] = useState<MentorProp[]>(initialValues.mentorAssigned ?? []);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const pageRef = useRef<FormikProps<ProgramTask>>(null);

    const showErrorMessage = (tt: any) => {
        try {
            setIsBusy(false);
            setErrorMessage(tt?.message ?? tt);
        } catch (err) {
            setErrorMessage(tt);
        }
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is required please")
        .matches(
        /^.{4,32}$/gm,
          "Title should be atleast 3 characters and not more than 32 characters"
        ),
        details: Yup.string()
            .required("Please enter the details")
    });

    const handleSubmit = async (values: ProgramTask) => {
        try {
            setErrorMessage("");
            setSuccessMessage("");
            setIsBusy(true);

            const task: ProgramTask = { ...values, mentorAssigned: selectedMentors, mentorManagersAssigned: selectedMentorManagers }
            await
                saveTaskApiAsync(task, token, !isAddingNewTask, userId ?? "", email ?? "")
                    .then(ff => {
                        setIsBusy(false);
                        setSuccessMessage(`Task ${(isAddingNewTask ? "created" : "updated")} successfully`)
                    }).catch(err => { showErrorMessage(err) });
        } catch (error: any) {
            showErrorMessage(error.message);
        }
    };

    function checkIfSelected(user: MentorProp): boolean {
        if (loadExtra === "MENTORMANAGERS")
            return selectedMentorManagers.filter(v => v.name === user.name).length > 0;
        else if (loadExtra === "MENTORS")
            return selectedMentors.filter(v => v.name === user.name).length > 0;
        return false;
    }

    function isSelectedChanged(user: MentorProp, isSelected: boolean): void {
        if (loadExtra === "MENTORMANAGERS") {
            if (isSelected)
                setSelectedMentorManagers([...selectedMentorManagers, user])
            else
                setSelectedMentorManagers(selectedMentorManagers.filter(v => v.name !== user.name));
        }
        else if (loadExtra === "MENTORS") {
            if (isSelected)
                setSelectedMentors([...selectedMentors, user])
            else
                setSelectedMentors(selectedMentors.filter(v => v.name !== user.name));
        }
    }

    function setCurrentLoadType(loadType: showExtraData): void {
        setLoadExtra(loadType);
        try {
            setErrorMessage("");
            setSuccessMessage("");
            setCurrentData([]);

            let data: null | Promise<MentorProp[]> = null;
            if (loadType === "MENTORMANAGERS")
                data = fetchAllMentorManagerApiAsync(token, userId ?? "", email ?? "");
            else if (loadType === "MENTORS")
                data = fetchAllMentorApiAsync(token, userId ?? "", email ?? "");

            if (data === null)
                setCurrentData([])
            else
                data?.then(obj => {
                    setCurrentData(obj);
                }).catch(err => { showErrorMessage(err) });
        } catch (error) { showErrorMessage(error) }
    }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                innerRef={pageRef}
            >
                {({ errors, touched }) => (
                    <Form className="w-full profile-form  max-w-[1100px] h-full absolute">
                        <div className="flex flex-row">
                            <div className="h-full max-h-[400px] w-full">
                                <label
                                    className="w-full relative text-[24px] font-semibold leading-[33px] text-[#141414] h-[33px] ml-5  top-[12px] font-mukta pt-0"
                                    htmlFor="about"
                                >
                                    {isAddingNewTask ? "New Task" : "Edit Task"}
                                </label>

                                <div className="mt-5 ml-3">
                                    <div className="flex flex-col  relative  w-full">
                                        <input type="hidden" id="userId" name="userId" />
                                        <input type="hidden" id="email" name="email" />
                                        <label
                                            className="text-label text-[20px]"
                                            htmlFor="title"
                                        >
                                            Title
                                        </label>
                                        <Field
                                            type="text"
                                            id="title"
                                            name="title"
                                             placeholder="Enter title"
                                            className="text-input mt-0 border-2 ml-2 border-lightGray-two rounded-[5px] text-[20px] "
                                        />
                                    </div>
                                    <label
                                        className="text-[20px] text-lightGray-two ml-3"
                                        htmlFor="title"
                                    >
                                        The title must contain a maximum of 32 characters
                                    </label>
                                    <FormikValidationMessageComponent name="title" />
                                </div>

                                <div className="mt-5 ml-3">
                                    <div className="flex flex-col  relative  w-full">
                                        <label
                                            className="text-label text-[20px]"
                                            htmlFor="currentpassword"
                                        >
                                            Details
                                        </label>
                                        <Field
                                            type="text"
                                            id="details"
                                            as="textarea"
                                            name="details"
                                            placeholder="Enter task details"
                                            className="text-input ml-2 border-2 min-h-[120px] max-h-[240px] border-lightGray-two rounded-[5px] text-[20px] "
                                        />
                                    </div>
                                    <FormikValidationMessageComponent name="details" />
                                </div>

                                <div className="flex w-full mb-5 flex-row">
                                    <div className="flex flex-row w-[calc(50%-10px)] ml-5 mt-5 py-3 px-11 bg-lighterGreen-three">
                                        <div className="flex flex-col w-3/5 content-center">
                                            <label
                                                className="relative whitespace-nowrap text-center text-[20px] font-semibold text-[#333] font-mukta pt-0"
                                                htmlFor="about" >
                                                Add Mentor Manager
                                            </label>
                                            <div className="flex w-[184px] h-[32px] self-center bg-white flex-row">
                                                <label
                                                    className="relative ml-[39.43px] text-center my-auto text-[16px] text-[#333] font-mukta pt-0"
                                                    htmlFor="about"
                                                >
                                                    {`${selectedMentorManagers?.length} Selected`}
                                                </label>
                                                <svg className="ml-auto mr-5 my-auto" width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9.42546 4.50033L4.42546 9.50033M4.42546 4.50033L9.42546 9.50033M12.4558 1.16699L17.7588 7.00033L12.4558 12.8337H2.75879C1.83829 12.8337 1.09212 12.0875 1.09212 11.167V2.83366C1.09212 1.91318 1.83829 1.16699 2.75879 1.16699H12.4558Z" stroke="#99000A" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                        </div>
                                        <button
                                            type="button" onClick={() => setCurrentLoadType("MENTORMANAGERS")}
                                            className="inline-flex bg-green-three max-h-[24px] my-auto items-center px-3 text-[12px] leading-6 text-lighterGreen-three ml-auto rounded-md shadow btn-animate"
                                        >
                                            Select
                                        </button>
                                    </div>

                                    <div className="flex flex-row w-[calc(50%-10px)] ml-5 mt-5 py-3 px-11 bg-lighterGreen-three">
                                        <div className="flex flex-col w-3/5 content-center">
                                            <label
                                                className="relative text-center whitespace-nowrap text-[20px] font-semibold text-[#333] font-mukta pt-0"
                                                htmlFor="about" >
                                                Add Mentor
                                            </label>
                                            <div className="flex w-[184px] h-[32px] self-center bg-white flex-row">
                                                <label
                                                    className="relative ml-[39.43px] text-center my-auto text-[16px] text-[#333] font-mukta pt-0"
                                                    htmlFor="about"
                                                >
                                                    {`${selectedMentors?.length} Selected`}
                                                </label>
                                                <svg className="ml-auto mr-5 my-auto" width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9.42546 4.50033L4.42546 9.50033M4.42546 4.50033L9.42546 9.50033M12.4558 1.16699L17.7588 7.00033L12.4558 12.8337H2.75879C1.83829 12.8337 1.09212 12.0875 1.09212 11.167V2.83366C1.09212 1.91318 1.83829 1.16699 2.75879 1.16699H12.4558Z" stroke="#99000A" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                        </div>
                                        <button
                                            type="button" onClick={() => setCurrentLoadType("MENTORS")}
                                            className="inline-flex bg-green-three max-h-[24px] my-auto items-center px-3 text-[12px] leading-6 text-lighterGreen-three ml-auto rounded-md shadow btn-animate"
                                        >
                                            Select
                                        </button>
                                    </div>
                                </div>
                                <button className="btn-primary m-5">{`${(isAddingNewTask ? "Create" : "Update")} Task`}</button>

                                {successMessage?.length > 7
                                    && (<MessagePopUpPage
                                        persist={false}
                                        toggle={() => {
                                            setSuccessMessage("");
                                            setErrorMessage("");
                                            if (pageRef?.current?.values)
                                                pageRef.current.values = getNewTask();
                                        }}
                                        message={successMessage} />
                                    )}

                                <div className="flex items-end justify-end flex-row w-full">
                                    <LoadingComponent isBusy={isBusy} />
                                </div>
                                <h5 className="text-1xl text-gray-two font-bold mt-4">
                                    {successMessage}
                                </h5>

                                <h5
                                    className="text-lightRed-one text-1xl font-bold mt-4"
                                >
                                    {errorMessage}
                                </h5>
                            </div>
                            {
                                (loadExtra !== "NONE") &&
                                (<div className="w-[530px] h-screen overflow-y-hidden mb-8 pl-5 m-0">
                                    <div className="flex flex-row">
                                        <SearchBox id="search-users" name="search-users" placeholder="Search" />
                                        <img className="ml-[20px] btn-animate mt-[18px] h-[24px] w-[24px] max-h-[40px]" src={messageEarthingSVG} alt="earthing icon" />
                                        <img onClick={() => setCurrentLoadType("NONE")} className="ml-[20px] btn-animate mt-[20px] h-[16px] w-[16px] max-h-[40px]" src={messageCloseSVG} alt="close icon" />
                                    </div>
                                    <div className="flex flex-col h-full w-full">
                                        {
                                            (loadExtra === "MENTORMANAGERS") &&
                                            (<ul className="list-none scrollable-by-y p-0 m-0 w-full">
                                                {currentData.map((item, idx) => {
                                                    return (
                                                        <CheckedUserElement handleClick={isSelectedChanged} user={item} isSelected={checkIfSelected(item)} />
                                                    );
                                                })}
                                            </ul>)
                                        }
                                        {
                                            (loadExtra === "MENTORS") &&
                                            (<ul className="list-none scrollable-by-y p-0 m-0 w-full">
                                                {currentData.map((item, idx) => {
                                                    return (
                                                        <CheckedUserElement handleClick={isSelectedChanged} user={item} isSelected={checkIfSelected(item)} />
                                                    );
                                                })}
                                            </ul>)
                                        }
                                    </div>
                                </div>)
                            }
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EditTask;


