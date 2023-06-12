import { FieldArray, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { object, array, string } from "yup";
import { useAppSelector } from "../../../../services/redux/Store";
import { selectCurrentUserNameSelector, selectCurrentUserToken } from "../../../../services/redux/slices/current-user-slice";
import { ProgramCertificate, fetchProgramsApprovedCertificatesRequestsApiAsync } from "../../../../services/axios/api-services/certificates-requests";
import AccordionCertificateElement from "../../../../components/data-components/accordion-certificate-element";
import NavigationFirst from "../../../../assets/images/programs/NavigationFirst.svg";
import NavigationLast from "../../../../assets/images/programs/NavigationLast.svg";
import NavigationNext from "../../../../assets/images/programs/NavigationNext.svg";
import NavigationPrevious from "../../../../assets/images/programs/NavigationPrevious.svg";
import messageCloseSVG from "./../../../../assets/images/messages/message-close.svg"
import messageEarthingSVG from "./../../../../assets/images/messages/messages-earthing.svg"
import SearchBox from "../../../../components/search-box";

const ApprovedCertificates: React.FC = () => {

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [approvedCertificateRequests, setApprovedCertificateRequests] = useState<undefined | ProgramCertificate[]>();
    const token = useAppSelector(selectCurrentUserToken);
    const { userId, email } = useAppSelector(selectCurrentUserNameSelector);

    const showErrorMessage = (tt: any) => {
        try {
            setErrorMessage(tt?.message ?? tt);
        } catch (err) {
            setErrorMessage(tt);
        }
    };

    useEffect(() => {
        try {
            setErrorMessage("");
            setSuccessMessage("");

            fetchProgramsApprovedCertificatesRequestsApiAsync(token, userId ?? "", email ?? "")
                .then(obj => {
                    setApprovedCertificateRequests(obj)
                })
                .catch(err => { showErrorMessage(err) });
        } catch (error) { showErrorMessage(error) }
    }, [email, token, userId])

    return (
        <div className="w-full h-full">
            <Formik
                initialValues={{}}
                onSubmit={(values: {}) => console.log(values)}
                validationSchema={object().shape({
                    certificates: array().of(
                        object().shape({
                            firstName: string().required("Entering a first name is required"),
                        })
                    ),
                })}
                render={({ handleSubmit, errors, touched, values }) => (
                    <Form className="w-full h-full">
                        <div className="w-full flex mx-0 top-[1px]">
                            <label
                                className="relative text-[20px] whitespace-nowrap mt-[15px] font-semibold leading-[33px] text-[#333] h-[33px] left-0 font-mukta ms-5 pt-0"
                                htmlFor="about"
                            >
                                Approved Certificates
                            </label>

                            <button className="bg-green-three btn-animate mt-[17px] whitespace-nowrap h-6 ml-9 text-[12px] text-white rounded-[4px] px-3" >Generate New Certificate</button>

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
                                <label className="text-[16px] max-w-[100px] text-center ml-2 mt-[18px] whitespace-nowrap" htmlFor="github">1 - 10 of 20</label>
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
                                <SearchBox id="search-users" extraStyles="max-w-[150px]" name="search-users" placeholder="Search" />
                                <img className="ml-[-20px] btn-animate mt-[18px] h-[24px] w-[24px] max-h-[40px]" src={messageEarthingSVG} alt="earthing icon" />
                            </div>
                        </div>
                        <h5 className="text-1xl text-gray-two font-bold mt-4">
                            {successMessage}
                        </h5>

                        <h5
                            style={{ color: "orangered" }}
                            className="text-1xl font-bold mt-4"
                        >
                            {errorMessage}
                        </h5>

                        <div className="w-full flex scrollable-by-y h-[calc(100%-130px)] mt-0 pb-10">
                            <FieldArray
                                name="certificates"
                                render={(helpers) => (
                                    <div>
                                        {approvedCertificateRequests && approvedCertificateRequests.length > 0
                                            ? approvedCertificateRequests.map(
                                                (
                                                    certificate: ProgramCertificate,
                                                    index: React.Key | null | undefined
                                                ) => (
                                                    <React.Fragment key={index}>
                                                        <AccordionCertificateElement isExpanded={false} width={736} certificate={certificate} id="{index}" />
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
export default ApprovedCertificates;
