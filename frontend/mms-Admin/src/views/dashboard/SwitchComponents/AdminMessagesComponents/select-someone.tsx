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
import "./messages.css";

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
        name: "Mentor User " + i,
        icon: avatarSVG,
        details: "Mentor Assistant, Andela, She/her",
        title: "MENTOR ASST.",
        mentor: "MENTOR-GADS"
    });
}

const SelectSomeOne: React.FC = () =>{
    const navigate = useNavigate();

    return (
    <div className="w-full h-screen">
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
                <Form className="w-full h-screen">
                    <label
                        className="mentor-title ms-5 pt-0"
                        htmlFor="about"
                        style={{color:"#141414", fontSize:"24px"}}
                    >
                       Select someone to start a conversation
                    </label>
                    <div className="search-toolbox-div mb-10">
                        <div className="mt-5">
                            <button type="submit" className="navigation-button">
                                <img
                                    src={NavigationFirst}
                                    alt="Attach file icon"
                                    className="dropdown-icon"
                                />
                            </button>

                            <button type="submit" className="navigation-button">
                                <img
                                    src={NavigationPrevious}
                                    alt="Attach file icon"
                                    className="dropdown-icon"
                                />
                            </button>
                            <label className="text-label" htmlFor="github">
                                1 - 10 of 20
                            </label>
                            <button type="submit" className="navigation-button">
                                <img
                                    src={NavigationNext}
                                    alt="Attach file icon"
                                    className="dropdown-icon"
                                />
                            </button>

                            <button type="submit" className="navigation-button">
                                <img
                                    src={NavigationLast}
                                    alt="Attach file icon"
                                    className="dropdown-icon"
                                />
                            </button>
                        </div>

                        <Field
                            type="text"
                            id="search"
                            style={{ paddingLeft: "3px" }}
                            name="search"
                            placeholder="Search"
                            className="text-input input-icon-label ms-1 mt-3 ps-0 border-2 border-lightGray-two rounded-[5px] text-[15px] "
                        />
                        <img src={searchIconSVG} style={{ marginTop: "20px", maxHeight: "40px" }} alt="search icon" />
                        <img src={messageEarthingSVG} style={{ marginTop: "20px", marginLeft: "30px", maxHeight: "40px" }} alt="search icon" />
                        <img src={messageCloseSVG} style={{ marginTop: "20px", marginLeft: "30px", maxHeight: "40px" }} alt="search icon" />
                    </div>

                    <div className="w-full flex h-full mt-12 h-screen overflow-y-scroll pb-10">
                        <FieldArray
                            name="mentors"
                            render={(helpers) => (
                                <div>
                                    {values.mentors && values.mentors.length > 0
                                        ? values.mentors.map(
                                            (
                                                mentor: MentorProp,
                                                index: React.Key | null | undefined
                                            ) => (
                                                <React.Fragment key={index}>
                                                    <label htmlFor="pet" onClick={()=> navigate("/dashboard/messages/admin-chat-messages")} className="w-full">
                                                        <div className="mentor-border flex flex-row mt-[10px]">
                                                            <img
                                                                src={mentor.icon}
                                                                alt="profile logo"
                                                                className="mentor-icon"
                                                            />
                                                            <div className="w-full">
                                                                <label
                                                                    className="mentor-title ms-5"
                                                                    style={{top:"3px"}}
                                                                    htmlFor="about"
                                                                >
                                                                    {mentor.name}
                                                                </label>
                                                                <div className="flex flex-row mt-0 relative  w-full">
                                                                    <label
                                                                        className="small-detail-text"
                                                                        htmlFor="about"
                                                                    >
                                                                        {mentor.details}
                                                                    </label>

                                                                    <label
                                                                        className="message-title-text"
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
)};
export default SelectSomeOne;
