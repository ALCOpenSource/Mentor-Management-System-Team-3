import MyGeneratedIcon from "./../../../assets/images/certificate-requests/my-generated-certificates.svg";
import ApprovedIcon from "./../../../assets/images/certificate-requests/approved-certificates.svg";
import certificateIcon from "./../../../assets/images/mentors/certificate.png";

import { getRandomInteger } from "../../mathFunctions";
import { randomizeArray } from "../../generalFunctions";
import { CertificateRequestType } from "../../../views/dashboard/SwitchComponents/CertificatesComponents";

export interface ProgramCertificate{
  icon: any;
  certificate: any;
  name: string;
  url: string;
  type: CertificateRequestType;
  program: string;
  status: "APPROVED"|"REJECTED"|"PENDING"|"RETURNED"|"ON-HOLD"|"UNDER-INVESTIGATION";
}
export const fetchCertificateRequestsMetaDataApiAsync = async (
  token: string,
  userId: string,
  email: string
) => {
  const categories: { icon: any; name: string; url: string; num: number }[] =
    [];
  const recents: ProgramCertificate[] = [];
  categories.push({
    icon: ApprovedIcon,
    url: "approved-certificates",
    name: "Approved Certificates",
    num: getRandomInteger(100, 500),
  });
  categories.push({
    icon: MyGeneratedIcon,
    url: "my-generated-certificates",
    name: "My Generated Certificates",
    num: getRandomInteger(100, 400),
  });
  categories.push({
    icon: undefined,
    url: "pending-approval-certificates",
    name: "Certificates Pending Approval",
    num: getRandomInteger(100, 450),
  });

  for (let index = 0; index < 20; index++) {
    const rnd = getRandomInteger(0,3);
    let program = "GADS CLOUD 2022 - COMPLETED";
    if(rnd === 1)
    program = "GADS MOBILE 2022 - COMPLETED";
    if(rnd === 2)
    program = "GADS ANDROID 2022 - COMPLETED";
    recents.push({
      icon: certificateIcon,
      certificate:certificateIcon,
      url: "certificates-details",
      name: "Alison Davis",
      program,
      status:"APPROVED",
      type: "MY-GENERATED-CERTIFICATES",
    });
  }

  let cats = await Promise.resolve(categories);
  let recs = await Promise.resolve(randomizeArray(recents));
  return Promise.all([cats, recs]);
};


export const fetchProgramsApprovedCertificatesRequestsApiAsync = async (
  token: string,
  userId: string,
  email: string
) => {
  const mentorRequests: ProgramCertificate[] = [];
  for (let i = 0; i < 100; i++) {
    const date = new Date();
    const rnd = getRandomInteger(0,3);
    let program = "GADS CLOUD 2022 - COMPLETED";
    if(rnd === 1)
    program = "GADS MOBILE 2022 - COMPLETED";
    if(rnd === 2)
    program = "GADS ANDROID 2022 - COMPLETED";
    date.setMinutes(date.getMinutes() - getRandomInteger(0, 1500000));
    mentorRequests.push({
      icon: certificateIcon,
      certificate:certificateIcon,
      status:"APPROVED",
      type:"APPROVED-CERTIFICATES",
      program,
      url: "program-request",
      name: "Aison Davis " + i,
    });
  }
  return await Promise.resolve(mentorRequests);
};


export const fetchMyGeneratedCertificatesRequestsApiAsync = async (
  token: string,
  userId: string,
  email: string
) => {
  const mentorRequests: ProgramCertificate[] = [];
  for (let i = 0; i < 100; i++) {
    const date = new Date();
    const rnd = getRandomInteger(0,3);
    let program = "GADS CLOUD 2022 - COMPLETED";
    if(rnd === 1)
    program = "GADS MOBILE 2022 - COMPLETED";
    if(rnd === 2)
    program = "GADS ANDROID 2022 - COMPLETED";
    date.setMinutes(date.getMinutes() - getRandomInteger(0, 1500000));
    mentorRequests.push({
      icon: certificateIcon,
      certificate:certificateIcon,
      status:"APPROVED",
      type:"MY-GENERATED-CERTIFICATES",
      program,
      url: "program-request",
      name: "Aison Davis " + i,
    });
  }
  return await Promise.resolve(mentorRequests);
};



export const fetchProgramsApprovalPendingCertificatesRequestsApiAsync = async (
  token: string,
  userId: string,
  email: string
) => {
  const mentorRequests: ProgramCertificate[] = [];
  for (let i = 0; i < 100; i++) {
    const date = new Date();
    const rnd = getRandomInteger(0,3);
    let program = "GADS CLOUD 2022 - COMPLETED";
    if(rnd === 1)
    program = "GADS MOBILE 2022 - COMPLETED";
    if(rnd === 2)
    program = "GADS ANDROID 2022 - COMPLETED";
    date.setMinutes(date.getMinutes() - getRandomInteger(0, 1500000));
    mentorRequests.push({
      icon: certificateIcon,
      certificate:certificateIcon,
      status:"PENDING",
      type:"PENDING-APPROVAL-CERTIFICATES",
      program,
      url: "program-request",
      name: "Aison Davis " + i,
    });
  }
  return await Promise.resolve(mentorRequests);
};
