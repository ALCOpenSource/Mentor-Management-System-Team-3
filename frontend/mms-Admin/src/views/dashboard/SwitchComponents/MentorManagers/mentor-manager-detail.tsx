import { useState } from "react";
import search from "../../../../assets/images/search.svg";
import filter from "../../../../assets/images/filter.svg";
import flag from "../../../../assets/images/flag.svg";
import write from "../../../../assets/images/write.svg";
import upArrow from "../../../../assets/images/arrow-up.svg";
import tasks from "../../../../assets/images/tasks-right.svg";
import calender from "../../../../assets/images/calendar.svg";
import report from "../../../../assets/images/reports-2.svg";
import google from "../../../../assets/images/google.svg";
import time from "../../../../assets/images/time.svg";
import certificate from "../../../../assets/images/mentors/certificate.png";
import file from "../../../../assets/images/file.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { MentorProp } from "../AdminMessagesComponents/select-someone";
import { Tabs as MentorsTabs } from "../mentor/config/mentors";
import DetailCards from "../mentor/components/detailCard";

const FIXEDHEIGHT = {
  height: `calc(100vh-70px)`,
};

function MentorManagerDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const state: [MentorProp[], MentorProp] = location.state;
  const [currentMentorManager, setCurrentMentorManager]  = useState(state[1]);
  const mentorManagers = state[0] ?? [];
  const [activeTab, setActiveTab] = useState("about");
const tabs = MentorsTabs.filter(c => c.lable !== "Mentors");
tabs.splice(2, 0, {
  lable: 'Mentors',
});


  const handleSubmit = async (values: any) => {
    try {
      navigate("/dashboard/messages/broadcast-message")
    } catch (error: any) {
     // showErrorMessage(error.message);
     //  setSuccessMessage("");
    }
  };


  return (
    <section className="relative h-full overflow-hidden" style={FIXEDHEIGHT}>
      <section className="flex h-full gap-x-7">
        <section className="w-[310px] h-full shrink-0">
          <section className="flex justify-between">
            <h1 className="text-2xl font-semibold">Mentors</h1>
            <div className="flex justify-between items-center gap-x-[34px]">
              <img src={search} alt="Search" className="cursor-pointer" />
              <img src={filter} alt="Filter" className="cursor-pointer" />
            </div>
          </section>
          <section className="flex flex-col gap-y-2.5 text-2xl mt-5 max-h-[calc(100%-100px)] py-2 pr-2 scrollbar-thin scrollbar-thumb-green-four scrollbar-track-white overflow-y-scroll">
            {mentorManagers.map((mentor, index) => {
              return (<div onClick={() => setCurrentMentorManager(mentor)}
                key={mentor.name}
                className="flex justify-between  btn-animate items-center w-full border border-lightGray- min-h-[70px] px-5 py-3.5"
              >
                <div className="flex items-center gap-x-3.5">
                  <img
                    src={mentor.icon}
                    alt={`${mentor?.name} avatar`}
                    className="w-[45px] h-[43px] object-cover rounded-full"
                  />
                  <div className="leading-5">
                    <h6 className="text-[16px] font-semibold">{mentor.name}</h6>
                    <p className="text-[12px]">{mentor.name}</p>
                  </div>
                </div>
                <button className="bg-green-three w-14 btn-animate text-white rounded-[5px] text-[12px] font-normal">
                  view
                </button>
              </div>) 
            })}
          </section>
        </section>
        <section className="mt-2 grow h-full">
          <section className="flex items-center justify-between">
            <div className="flex items-center gap-x-[22px]">
              <img
                src={currentMentorManager?.icon}
                alt="Peculiar Umeh"
                className="w-[90px] h-[90px] rounded-full object-cover"
              />
              <div className="leading-3">
                <h6 className="flex items-center gap-x-2.5 text-2xl font-semibold">
                  <span> { currentMentorManager?.name }</span>
                  <img src={flag} alt="Nigeria Flag" />
                </h6>
                <p className="flex items-center gap-x-2.5 text-[16px] font-normal text-customBlack-three">
                  <span>Mentor Manager</span>
                  <img src={write} alt="Edit icon" className="cursor-pointer" />
                </p>
              </div>
            </div>
            <div className="flex items-center gap-x-5">
              <button onClick={handleSubmit} className="bg-green-three btn-animate w-[179px] h-[47px] text-white rounded-[10px] text-[16px] font-semibold">
                Send Message
              </button>
              <button onClick={() => navigate("/dashboard/mentor-managers")} className="bg-white w-[117px] h-[47px] btn-animate text-green-three mr-5 rounded-[10px] border-2 border-green-three">
                Close
              </button>
            </div>
          </section>
          <section
            role="tablist"
            aria-label="Tab_content"
            className="mt-3 pr-4"
          >
            <div className="text-[20px] font-normal text-center text-gray-two border-b-2 border-lightGray-two">
              <ul className="flex justify-between -mb-px">
                {tabs.map((tab) => {
                  const { lable } = tab;
                  return (
                    <li className="mr-2" key={lable}>
                      <button
                        className={`inline-block px-8 py-1 border-b-2  ${
                          activeTab === lable.toLowerCase()
                            ? "border-green-three text-green-three"
                            : "border-transparent"
                        }`}
                        role="tab"
                        aria-current={activeTab === lable.toLowerCase()}
                        aria-controls={lable.toLowerCase()}
                        id={lable.toLowerCase()}
                        onClick={() => setActiveTab(lable.toLowerCase())}
                      >
                        {lable}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
          <section className="mt-4 h-[67%] scrollbar-thin scrollbar-thumb-green-four scrollbar-track-white overflow-y-scroll pb-2 pr-2">
            <section
              id="abouts"
              role="tabpanel"
              className={`flex-col justify-between min-h-[390px] ${
                activeTab === "about" ? "flex" : "hidden"
              }`}
            >
              <div className="rounded-[5px] border border-lightGray-two px-5 py-4">
                <h6 className="text-md text-customBlack-two font-semibold mb-1">
                  Bio:
                </h6>
                <article className="text-sm leading-7 text-gray-two bg-lighterGreen-two py-[9px] px-[18px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
                  massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
                  sapien fringilla, mattis ligula consectetur, ultrices mauris.
                  Maecenas vitae mattis tellus. Nullam quis imperdiet augue.
                  Vestibulum auctor ornare leo, non suscipit magna interdum eu.
                  Curabitur pellentesque nibh nibh, at maximus ante fermentum
                  sit amet. Pellentesque
                </article>
                <div className="flex flex-col gap-y-4 mt-4">
                  <div className="inline-flex items-center gap-x-4">
                    <p className="text-md font-semibold text-customBlack-three">
                      Technical Proficiency:
                    </p>
                    <p className="text-sm font-normal text-gray-two">
                      Java Script, Django, Mysql, Android
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-x-4">
                    <p className="text-md font-semibold text-customBlack-three">
                      Previous Programs
                    </p>
                    <p className="text-sm font-normal text-gray-two">
                      GADS 2022, Google I/O Extended 2021
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-x-4">
                    <p className="text-md font-semibold text-customBlack-three">
                      Availability to join a new program:
                    </p>
                    <p className="text-sm font-normal text-gray-two">
                      Unavailable
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-x-4">
                    <p className="text-md font-semibold text-customBlack-three">
                      Program of interest:
                    </p>
                    <p className="text-sm font-normal text-gray-two">
                      Google Africa Scholarship Program
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-x-4">
                    <p className="text-md font-semibold text-customBlack-three">
                      Been a Mentor Before?
                    </p>
                    <p className="text-sm font-normal text-gray-two">Yes</p>
                  </div>
                  <div className="inline-flex items-center gap-x-4">
                    <p className="text-md font-semibold text-customBlack-three">
                      Years of Technical Experience:
                    </p>
                    <p className="text-sm font-normal text-gray-two">Yes</p>
                  </div>
                  <div className="inline-flex flex-col gap-y-1">
                    <p className="text-md font-semibold text-customBlack-three">
                      Documents
                    </p>
                    <div className="inline-flex items-center gap-x-4">
                      <p className="flex items-center gap-x-1 cursor-pointer">
                        <img src={file} alt="file" className="inline-block" />
                        <span className="text-sm font-normal text-gray-two">
                          My resume.doc
                        </span>
                      </p>
                      <p className="flex items-center gap-x-1 cursor-pointer">
                        <img src={file} alt="file" className="inline-block" />
                        <span className="text-sm font-normal text-gray-two">
                          Birth Cerificate.doc
                        </span>
                      </p>
                      <p className="flex items-center gap-x-1 cursor-pointer">
                        <img src={file} alt="file" className="inline-block" />
                        <span className="text-sm font-normal text-gray-two">
                          Java Lead.doc
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-x-4">
                    <p className="text-md font-semibold text-customBlack-three">
                      Website:
                      <a
                        href="https://www.kabir.i@andela.com"
                        target="_blank"
                        rel="noreferrer"
                      >
                        www.kabir.i@andela.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section
              id="tasks"
              role="tabpanel"
              className={`flex-col justify-between min-h-[390px] ${
                activeTab === "tasks" ? "flex" : "hidden"
              }`}
            >
              <div className="rounded-[5px] border border-lightGray-two">
                <div className="flex justify-between items-center px-5 py-4">
                  <div className="flex items-center gap-x-8">
                    <img
                      src={tasks}
                      alt="tasks"
                      className="inline-block w-[50px] h-[50px] object-contain"
                    />
                    <div className="leading-6">
                      <h6 className="text-md text-customBlack-two">
                        Room liberary article write...
                      </h6>
                      <p className="flex items-start gap-1">
                        <img src={calender} alt="schedule" />
                        <span className="text-xs text-gray-two">
                          3 days from now
                        </span>
                      </p>
                    </div>
                  </div>
                  <img
                    src={upArrow}
                    alt="arrow up"
                    className="cursor-pointer"
                  />
                </div>

                <div className="bg-lighterGreen-three px-5 py-4">
                  <article className="text-sm leading-7 text-gray-two">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                    et massa mi. Aliquam in hendrerit urna. Pellentesque sit
                    amet sapien fringilla, mattis ligula consectetur, ultrices
                    mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet
                    augue. Vestibulum auctor ornare leo, non suscipit magna
                    interdum eu. Curabitur pellentesque nibh nibh, at maximus
                    ante fermentum sit amet. Pellentesque
                  </article>
                  <div className="flex justify-between items-center bg-lighterGreen-two py-2 px-[22px] mt-5">
                    <div className="flex items-center gap-x-[27px]">
                      <img src={report} alt="report" />
                      <div className="flex items-center text-customBlack-two">
                        <p className="text-xl font-bold pr-2.5"> 18</p>
                        <p className="text-md font-semibold"> Tasks Report</p>
                        <p className="inline-flex justify-center items-center text-sm font-semibold text-white leading-[0] w-5 h-5 ml-3 bg-red-three rounded-full">
                          3
                        </p>
                      </div>
                    </div>
                    <button className="bg-green-three w-14 h-[24px] text-white rounded-[5px] text-[12px] font-normal">
                      view
                    </button>
                  </div>
                </div>

                <div className="text-right mb-6 mr-5">
                  <button className="bg-white w-[232px] h-[50px] text-green-three rounded-[10px] border-2 border-green-three">
                    Unassign from Task
                  </button>
                </div>
              </div>
              <section className="flex flex-col gap-y-2.5 mt-2.5">
                <DetailCards
                  section="tasks"
                  title="Room liberary article write..."
                  imageLink={tasks}
                  subTexts={[{ date: "3 days from now" }]}
                />
                <DetailCards
                  section="tasks"
                  title="Room liberary article write..."
                  imageLink={tasks}
                  subTexts={[{ date: "3 days from now" }]}
                />
                <DetailCards
                  section="tasks"
                  title="Room liberary article write..."
                  imageLink={tasks}
                  subTexts={[{ date: "3 days from now" }]}
                />
              </section>
            </section>
            <section
              id="programs"
              role="tabpanel"
              className={`flex-col justify-between min-h-[390px] ${
                activeTab === "programs" ? "flex" : "hidden"
              }`}
            >
              <div className="rounded-[5px] border border-lightGray-two">
                <div className="flex justify-between items-center px-5 py-4">
                  <div className="flex items-center gap-x-8">
                    <img
                      src={google}
                      alt="tasks"
                      className="inline-block w-[50px] h-[50px] object-contain"
                    />
                    <div className="leading-6">
                      <h6 className="text-md text-customBlack-two">
                        Google Africa Scholarship Program
                      </h6>
                      <div className="flex items-center gap-6">
                        <p className="flex items-start gap-1">
                          <img src={calender} alt="schedule" />
                          <span className="text-xs text-gray-two">
                            3 days from now
                          </span>
                        </p>
                        <p className="flex items-start gap-1">
                          <img src={time} alt="schedule" />
                          <span className="text-xs text-gray-two">8:00 pm</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <img
                    src={upArrow}
                    alt="arrow up"
                    className="cursor-pointer"
                  />
                </div>

                <div className="bg-lighterGreen-three px-5 py-4">
                  <h6 className="text-md text-customBlack-two font-semibold mb-1">
                    About:
                  </h6>
                  <article className="text-sm leading-7 text-gray-two">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                    et massa mi. Aliquam in hendrerit urna. Pellentesque sit
                    amet sapien fringilla, mattis ligula consectetur, ultrices
                    mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet
                    augue. Vestibulum auctor ornare leo, non suscipit magna
                    interdum eu. Curabitur pellentesque nibh nibh, at maximus
                    ante fermentum sit amet. Pellentesque
                  </article>
                  <div className="flex justify-between items-center bg-lighterGreen-two py-2 px-[22px] mt-5">
                    <div className="flex items-center gap-x-[27px]">
                      <img src={report} alt="report" />
                      <div className="flex items-center text-customBlack-two">
                        <p className="text-xl font-bold pr-2.5"> 40 </p>
                        <p className="text-md font-semibold">Programs Report</p>
                        <p className="inline-flex justify-center items-center text-sm font-semibold text-white leading-[0] w-5 h-5 ml-3 bg-red-three rounded-full">
                          3
                        </p>
                      </div>
                    </div>
                    <button className="bg-green-three w-14 h-[24px] text-white rounded-[5px] text-[12px] font-normal">
                      view
                    </button>
                  </div>
                </div>

                <div className="text-right mb-6 mr-5">
                  <button className="bg-white w-[232px] h-[50px] text-green-three rounded-[10px] border-2 border-green-three">
                    Unassign from Task
                  </button>
                </div>
              </div>
              <section className="flex flex-col gap-y-2.5 mt-2.5">
                {/* <div className="flex justify-between items-center px-5 py-4 border border-lightGray-two rounded-[5px]">
                  <div className="flex items-center gap-x-8">
                    <img src={google} alt="tasks" />
                    <div className="leading-6">
                      <h6 className="text-md text-customBlack-two">
                        Google Africa Scholarship Program
                      </h6>
                      <div className="flex items-center gap-6">
                        <p className="flex items-start gap-1">
                          <img src={calender} alt="schedule" />
                          <span className="text-xs text-gray-two">
                            3 days from now
                          </span>
                        </p>
                        <p className="flex items-start gap-1">
                          <img src={time} alt="schedule" />
                          <span className="text-xs text-gray-two">8:00 pm</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <img
                    src={upArrow}
                    alt="arrow up"
                    className="cursor-pointer"
                  />
                </div> */}
                <DetailCards
                  section="programs"
                  title=" Google Africa Scholarship Program"
                  imageLink={google}
                  subTexts={[{ date: "4 days from now", time: "8:00 pm" }]}
                />
                <DetailCards
                  section="programs"
                  title=" Google Africa Scholarship Program"
                  imageLink={google}
                  subTexts={[{ date: "4 days from now", time: "8:00 pm" }]}
                />
                <DetailCards
                  section="programs"
                  title=" Google Africa Scholarship Program"
                  imageLink={google}
                  subTexts={[{ date: "4 days from now", time: "8:00 pm" }]}
                />
              </section>
            </section>
            <section
              id="certificate"
              role="tabpanel"
              className={`flex-col justify-between min-h-[390px] ${
                activeTab === "certificates" ? "flex" : "hidden"
              }`}
            >
              <div className="rounded-[5px] border border-lightGray-two">
                <div className="flex justify-between items-center px-5 py-4">
                  <div className="flex items-center gap-x-8">
                    <img
                      src={certificate}
                      alt="tasks"
                      className="inline-block w-[50px] h-[50px] object-contain"
                    />
                    <div className="leading-6">
                      <h6 className="text-md text-customBlack-two">
                        GADS CLOUD 2022 - COMPLETION
                      </h6>
                    </div>
                  </div>
                  <img
                    src={upArrow}
                    alt="arrow up"
                    className="cursor-pointer"
                  />
                </div>

                <div className="bg-lighterGreen-three px-5 py-4">
                  <div className="text-center">
                    <img
                      src={certificate}
                      alt="certificate"
                      className="inline-block"
                    />
                  </div>
                  <div className="flex items-center justify-center gap-x-7 mt-4">
                    <div>
                      <span>Download as</span>
                      <select className="text-[18px] font-semibold w-[93px] h-[32px] px-4 ml-1 border border-lightGray-three rounded-[5px]">
                        <option value="pdf">PDF</option>
                      </select>
                    </div>
                    <button className="bg-green-three w-[159px] h-[50px] text-white rounded-[10px] border-2 border-green-three">
                      Download
                    </button>
                  </div>
                </div>
              </div>
              <section className="flex flex-col gap-y-2.5 mt-2.5">
                <DetailCards
                  section="certificates"
                  title="GADS CLOUD 2022 - COMPLETION"
                  imageLink={certificate}
                />
                <DetailCards
                  section="certificates"
                  title="GADS CLOUD 2022 - COMPLETION"
                  imageLink={certificate}
                />
                <DetailCards
                  section="certificates"
                  title="GADS CLOUD 2022 - COMPLETION"
                  imageLink={certificate}
                />
              </section>
            </section>
          </section>
        </section>
      </section>
    </section>
  );
}

export default MentorManagerDetails;
