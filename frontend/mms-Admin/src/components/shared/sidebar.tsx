import profile from "../../assets/images/sidebar/profile.svg";
import dashboard from "../../assets/images/sidebar/dashboard.svg";
import programs from "../../assets/images/sidebar/programs.svg";
import tasks from "../../assets/images/sidebar/tasks.svg";
import reports from "../../assets/images/sidebar/report.svg";
import mentorManagers from "../../assets/images/sidebar/mentor-managers.svg";
import approvalRequests from "../../assets/images/sidebar/approval-requests.svg";
import certificates from "../../assets/images/sidebar/certificates.svg";
import messages from "../../assets/images/sidebar/messages.svg";
import forum from "../../assets/images/sidebar/discussion-forums.svg";
import settings from "../../assets/images/sidebar/settings.svg";
import mentors from "../../assets/images/sidebar/mentors.svg";
import logout from "../../assets/images/sidebar/logout.svg";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../services/redux/Store";
import { selectCurrentUser } from "../../services/redux/slices/current-user-slice";

export const navMenuItems = [
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
    route: "reports",
  },
  {
    icon: mentors,
    label: "Mentors",
    route: "mentors",
  },
  {
    icon: mentorManagers,
    label: "Mentor Managers",
    route: "mentor-managers",
  },
  {
    icon: approvalRequests,
    label: "Approval Requests",
    route: "approval-requests",
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
  {
    icon: logout,
    label: "Logout",
    route: "login",
  }
];

function Sidebar() {

  const { lastName, firstNames, role } = useAppSelector(selectCurrentUser);
  return (
    <div>
      <div className="flex">
        <div className="flex w-64">
          <div className="w-full">
            <div className="flex flex-col items-start justify-center p-8">
              <h2 className="text-customBlack-one font-bold text-[20px]">Hi, {lastName ?? firstNames}</h2>
              <p className="text-gray-three text-left font-[16px] pl-1 mb-10">{role}</p>
            </div>
            {navMenuItems.map((item, i) => {
              return (
                <div
                  key="i"
                  className="flex items-stretch focus:bg-white focus:font-bold hover:bg-white py-2 text-justify"
                >
                  <NavLink
                    to={item.route === "login" ? "/login" : `/dashboard/${item.route}`}
                    className="relative px-8 w-full flex items-stretch focus:bg-white focus:font-bold active:bg-white"
                  >
                    <img
                      src={item.icon}
                      alt="profile logo"
                      className="h-8 mr-5"
                    />
                    <span className="text-sm focus:bg-white focus:font-bold text-gray-one">{item.label}</span>
                  </NavLink>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
