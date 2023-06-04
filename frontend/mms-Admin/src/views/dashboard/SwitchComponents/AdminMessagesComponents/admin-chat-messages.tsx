import { NavLink, Outlet } from "react-router-dom";
import { MentorProp } from "./select-someone";
import { getRandomInteger } from "../../../../services/mathFunctions";
import avatarSVG from "../../../../assets/images/avatar.svg";
import "./messages.css";
import ChatMessages from "./chat-messages";
import { useState } from "react";

function Settings() {
  const currentMentors: MentorProp[] = [];
  const [currentMentor, setCurrentMentor] = useState<MentorProp|undefined>(undefined);

  for (let i = 0; i < 100; i++) {
    const date = new Date();
    date.setMinutes(date.getMinutes() - getRandomInteger(0, 1500000));
    currentMentors.push({
      name: "Mentor User " + i,
      icon: avatarSVG,
      details: "Mentor Assistant, Andela, She/her",
      title: "MENTOR ASST.",
      mentor: "MENTOR-GADS"
    });
  }

  return (
    <div className="flex flex-col " >
      <h3 className="text-black text-2xl ms-0 pt-3 pb-1 font-bold">Chats</h3>
      <section style={{ width: "80vw" }} className="flex w-full">
        <section style={{ width: "600px" }} className="border-solid  overflow-y-scroll h-screen pb-11 left_navlinks">
          {currentMentors.map((mentor, i) => {
            return (
              <section
                key="i"
                className="flex hover:bg-white py-2 text-center"
              >
                <NavLink
                  className="mentor-border left_navlinks"
                  to={"/dashboard/messages/admin-chat-messages"} state= {mentor}
                  
                >
                  <div style={{ width: "360px", marginTop: "0px" }} className="flex flex-row mt-[1px]  ">
                    <img
                      src={mentor.icon}
                      alt="profile logo"
                      className="mentor-icon"
                    />
                    <div className="w-full relative">
                      <div className="flex flex-row mt-0 relative  w-full">
                        <label
                          className="mentor-title"
                          style={{ top: "3px", left: "20px", marginRight: "auto" }}
                          htmlFor="about"
                        >
                          {mentor.name}
                        </label>
                      </div>
                      <div className="flex flex-row mt-0 relative  w-full">
                        <label
                          className="small-detail-text"
                          htmlFor="about"
                        >
                          {mentor.details}
                        </label>
                      </div>
                    </div>
                  </div>
                </NavLink>
              </section>
            );
          })}
        </section>
        <section className="w-full border-solid p-1">
          <ChatMessages />
        </section>
      </section>
    </div>
  );
}
export default Settings;