import { useState, type FC } from 'react';
import { ProgramCertificate } from '../../services/axios/api-services/certificates-requests';

interface AccordionCertificateElementProps {
    id?: string;
    name?: string;
    isExpanded: boolean;
    width?: number;
    certificate: ProgramCertificate;
    handleClick?: () => Promise<void>;
    extraStyles?: string;
}

const AccordionCertificateElement: FC<AccordionCertificateElementProps> = ({ id, name, width, isExpanded, certificate, handleClick, extraStyles }) => {
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
                    <div className={`w-[${width ?? 800}px] pl-[20px] rounded-lg border-[1px] border-lightGray-two py-1 flex flex-row`}>
                        <img
                            src={certificate.icon}
                            alt="profile logo"
                            className="w-[59px] h-[50px]"
                        />
                        <div className="w-full">
                            <label
                                className="relative text-[20px] font-semibold leading-[33px] text-[#333] h-[33px] left-0 top-[12px] font-mukta ms-5 pt-0 "
                                style={{ top: "3px" }}
                                htmlFor="about"
                            >
                                {`${certificate.name}`}
                            </label>
                            <label
                                className="relative px-3 rounded-lg bg-[#E6FDFE] font-mukta left-[15%] color[#4d4d4d] top-[-10px] text-[12px] leading-[20px]"
                                htmlFor="about"
                            >
                                {certificate.program}
                            </label>
                        </div>
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
                </button>
                <div
                    id="collapseTwo"
                    className={`${isToggled ? "visible" : "!visible hidden"} w-[${width ?? 800}px]`}
                    data-te-collapse-item
                    aria-labelledby="headingTwo"
                    data-te-parent="#accordionExample">
                    <div onClick={tt => tt.preventDefault()} className={`flex flex-col ml-7 px-5 py-4 w-[${width ?? 800}px] h-[690px] bg-lighterGreen-three`}>
                        <img
                            src={certificate.icon}
                            alt="profile logo"
                            className="rounded-full self-center w-[441px] h-[336px]"
                        />

                       { certificate.status === "PENDING" && (<div className="flex mt-4 flex-row">
                            <div className="flex mr-0 ml-auto flex-row">
                                <button onClick={tt => tt.preventDefault()} className="bg-transparent btn-animate hover:bg-green-three text-green-three font-semibold hover:text-white py-0 px-6 max-h-[40px] mx-4 border border-green-three hover:border-transparent rounded-lg">
                                    Decline
                                </button>
                                <button onClick={tt => tt.preventDefault()} className="btn-primary mr-3 ml-auto max-h-[30px] p-0" >Accept</button>
                            </div>
                        </div>)}
                    </div>
                </div>
            </div>
        </label>
    );
};
export default AccordionCertificateElement;