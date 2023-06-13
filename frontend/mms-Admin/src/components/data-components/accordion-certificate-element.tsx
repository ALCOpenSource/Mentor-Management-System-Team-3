import { useState, type FC } from 'react';
import { ProgramCertificate } from '../../services/axios/api-services/certificates-requests';

interface AccordionCertificateElementProps {
    id?: string;
    name?: string;
    isExpanded: boolean;
    alwaysExpanded?: boolean;
    certificate: ProgramCertificate;
    handleClick?: () => Promise<void>;
    extraStyles?: string;
}

const AccordionCertificateElement: FC<AccordionCertificateElementProps> = ({ id, name, alwaysExpanded, isExpanded, certificate, handleClick, extraStyles }) => {
    const [isToggled, setIsToggled] = useState(isExpanded);
    const toggle = () => {
        if (handleClick)
            handleClick();
        setIsToggled(isExpanded = !isToggled);

        if (alwaysExpanded)
            setIsToggled(true);
    }
    return (
        <label htmlFor="pet" className="w-full">
            <div className={`flex max-w-[754px] flex-col`}>
                <button onBlur={() => setIsToggled(false)} onClick={toggle} className="w-full h-full text-left hover:bg-lighterGreen-one mr-[20px] py-[5px] ml-[20px] mt-[10px]">
                    <div className={`w-full pl-[20px] rounded-lg border-[1px] border-lightGray-two py-1 flex flex-row`}>
                        <img
                            src={certificate.icon}
                            alt="profile logo"
                            className="w-[69px] h-[50px]"
                        />
                        <div className="w-full flex flex-col">
                            <label
                                className="relative text-[16px] font-semibold leading-[6.59px] text-[#333] left-0 mt-[12px] font-mukta ml-12 pt-0 "
                                style={{ top: "3px" }}
                                htmlFor="about"
                            >
                                {`${certificate.name}`}
                            </label>
                            <label
                                className="relative text-[16px] font-semibold leading-[26.59px] text-[#333] left-0 top-[-12px] font-mukta ml-12 pt-0 "
                                style={{ top: "3px" }}
                                htmlFor="about"
                            >
                                {`${certificate.program}`}
                            </label>
                        </div>
                        <div className="right-5 mr-4 ml-auto mt-[10px] ">
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
                </button>
                <div onClick={tt => tt.preventDefault()}
                    id="collapseTwo"
                    className={`${isToggled ? "visible" : "!visible hidden"} w-full`}
                    data-te-collapse-item
                    aria-labelledby="headingTwo"
                    data-te-parent="#accordionExample">
                    <div className={`flex flex-col ml-7 px-5 py-4 w-full bg-lighterGreen-three`}>
                        <img
                            src={certificate.icon}
                            alt="profile logo"
                            className="rounded-lg self-center w-[441px] h-[336px]"
                        />

                        {certificate.status === "PENDING" && (<div className="flex mt-4 flex-row">
                            <div className="flex mr-0 ml-auto flex-row">
                                <button onClick={tt => tt.preventDefault()} className="bg-transparent btn-animate hover:bg-green-three text-green-three font-semibold hover:text-white py-0 px-6 max-h-[40px] mx-4 border border-green-three hover:border-transparent rounded-lg">
                                    Decline
                                </button>
                                <button onClick={tt => tt.preventDefault()} className="btn-primary mr-[136px] ml-auto max-h-[30px] p-0" >Accept</button>
                            </div>
                        </div>)}
                    </div>
                </div>
            </div>
        </label>
    );
};
export default AccordionCertificateElement;