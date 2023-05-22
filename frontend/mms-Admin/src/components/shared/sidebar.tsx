import React from "react";
// import Navbar from "./navbar";
import profile from "../../assets/images/profile.svg";
import dashboard from "../../assets/images/dashboard.svg";
import programs from "../../assets/images/programs/programs.svg";
import tasks from "../../assets/images/tasks.svg";
import reports from "../../assets/images/reports.svg";
// import Mentors from "../../assets/images/mentors.svg";
import certificates from "../../assets/images/certificates.svg";
import messages from "../../assets/images/messages.svg";
import forum from "../../assets/images/discussion forums.svg";
import settings from "../../assets/images/settings/setting.svg";
import mentors from "../../assets/images/mentor.svg";

import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../services/redux/Store";
import { selectCurrentUser } from "../../services/redux/slices/current-user-slice";

function Sidebar() {
  const nav = [
    {
      icon: profile,
      label: "Profile",
      route: "profile",
    },
    {
      icon: dashboard,
      label: "Dashboard",
      route: "",
    },
    {
      icon: programs,
      label: "Programs",
      route: "programs",
    },
    {
      icon: tasks,
      label: "Tasks",
      route: "tasks",
    },
    {
      icon: reports,
      label: "Reports",
      route: "",
    },
    {
      icon: mentors,
      label: "Mentors",
      route: "mentors",
    },
    {
      icon: certificates,
      label: "Certificates",
      route: "certificates",
    },
    {
      icon: messages,
      label: "Messages",
      route: "messages",
    },
    {
      icon: forum,
      label: "Discussion Forum",
      route: "forum",
    },
    {
      icon: settings,
      label: "Settings",
      route: "settings",
    },
  ];
 const {lastName,firstNames,role } = useAppSelector(selectCurrentUser);
  return (
    <div>
      <div className="flex">
        <div className="flex w-60">
          <div className="w-full">
            <div className="flex flex-col items-center justify-center p-8">
              <h2 className="text-customBlack-one">Hi, {lastName ?? firstNames}</h2>
              <p className="text-gray-three mb-10">{role}</p>
            </div>
            {nav.map((item, i) => {
              return (
                <section
                  key="i"
                  className="flex  px-8  hover:bg-white py-2 text-center"
                >
                  <NavLink
                    to={`/dashboard/${item.route}`}
                    className="relative flex items-center active:bg-white"
                  >
                    <img
                      src={item.icon}
                      alt="profile logo"
                      className="h-8 mr-5"
                    />
                    <span className="text-sm text-gray-one">{item.label}</span>
                  </NavLink>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
