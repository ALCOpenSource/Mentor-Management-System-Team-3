import { Field, FieldArray, Form, Formik } from "formik";
import React from "react";
import { object, array, string } from "yup";
import avatarSVG from "../../../../assets/images/avatar.svg";
import searchIconSVG from "../../../../assets/images/search.svg";
import messageCloseSVG from "./../../../../assets/images/messages/message-close.svg"
import messageEarthingSVG from "./../../../../assets/images/messages/messages-earthing.svg"
import NavigationFirst from "../../../../assets/images/programs/NavigationFirst.svg";
import NavigationLast from "../../../../assets/images/programs/NavigationLast.svg";
import NavigationNext from "../../../../assets/images/programs/NavigationNext.svg";
import NavigationPrevious from "../../../../assets/images/programs/NavigationPrevious.svg";
import { getRandomInteger } from "../../../../services/mathFunctions";
import { useNavigate } from "react-router-dom";
import SearchBox from "../../../../components/search-box";
//import "./messages.css";

export interface MentorProp {
    name: string;
    details: string | undefined;
    title: string | undefined;
    mentor: string | undefined;
    icon: any;
}
interface FormValues {
    mentors: MentorProp[];
}

const initialValues: FormValues = {
    mentors: [],
};

for (let i = 0; i < 100; i++) {
    const date = new Date();
    date.setMinutes(date.getMinutes() - getRandomInteger(0, 1500000));
    initialValues.mentors.push({
        name: "User " + i,
        icon: avatarSVG,
        details: "Program Assistant, Andela, She/her",
        title: "PROGRAM ASST.",
        mentor: "MENTOR-GADS"
    });
}

const SelectSomeOne: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full h-full">
            <Formik
                initialValues={initialValues}
                onSubmit={(values: FormValues) => console.log(values)}
                validationSchema={object().shape({
                    mentors: array().of(
                        object().shape({
                            firstName: string().required("Entering a first name is required"),
                        })
                    ),
                })}
                render={({ handleSubmit, errors, touched, values }) => (
                    <Form className="w-full h-full">
                        <div className="w-full flex top-[12px]">
                            <label
                                className="relative text-[20px] mt-[15px] font-semibold leading-[33px] text-[#333] h-[33px] left-0 font-mukta ms-5 pt-0"
                                htmlFor="about"
                            >
                                Select someone to start a conversation
                            </label>

                            <div className="w-auto ml-auto p-0 m-0 flex flex-row content-end ">
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
                                <label className="text-label text-center mt-[5px] whitespace-nowrap" htmlFor="github">
                                    1 - 10 of 20
                                </label>
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
                                <SearchBox id="search-users" name="search-users" placeholder="Search" />
                                <img className="ml-[30px] btn-animate mt-[18px] h-[24px] w-[24px] max-h-[40px]" src={messageEarthingSVG} alt="earthing icon" />
                                <img className="ml-[30px] btn-animate mt-[20px] h-[16px] w-[16px] max-h-[40px]" src={messageCloseSVG} alt="close icon" />
                            </div>
                        </div>

                        <div className="w-full flex h-full mt-12 pb-10">
                            <FieldArray
                                name="mentors"
                                render={(helpers) => (
                                    <div className="w-full h-full overflow-y-scroll">
                                        {values.mentors && values.mentors.length > 0
                                            ? values.mentors.map(
                                                (
                                                    mentor: MentorProp,
                                                    index: React.Key | null | undefined
                                                ) => (
                                                    <React.Fragment key={index}>
                                                        <label htmlFor="pet" onClick={() => navigate("/dashboard/messages/admin-chat-messages")} className="w-full">
                                                            <div className="mentor-border btn-animate flex flex-row mt-[10px]">
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
                                                                            className="relative h-[20px] leading-[20px] text-gray-two left-[20px] top-0 font-mukta text-[12px]"
                                                                            htmlFor="about"
                                                                        >
                                                                            {mentor.details}
                                                                        </label>

                                                                        <label
                                                                            className="relative font-mukta left-[25%] color[#4d4d4d] top-[-10px] text-[12px] leading-[20px]"
                                                                            htmlFor="about"
                                                                        >
                                                                            {mentor.title}
                                                                        </label>

                                                                        <label
                                                                            className="message-title-text ms-12"
                                                                            htmlFor="about"
                                                                        >
                                                                            {mentor.mentor}
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </label>
                                                    </React.Fragment>
                                                )
                                            )
                                            : null}
                                    </div>
                                )}
                            />
                        </div>
                    </Form>
                )}
            ></Formik>
        </div>
    )
};
export default SelectSomeOne;
