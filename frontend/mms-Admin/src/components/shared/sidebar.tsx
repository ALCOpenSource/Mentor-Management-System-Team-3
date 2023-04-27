import React  from "react";
// import Navbar from "./navbar";
import profile from "../../assets/images/profile.svg";
import Dashboard from "../../assets/images/dashboard.svg";
import Programs from "../../assets/images/programs/programs.svg";
import Tasks from "../../assets/images/tasks.svg";
import Reports from "../../assets/images/reports.svg";
// import Mentors from "../../assets/images/mentors.svg";
import Certificates from "../../assets/images/certificates.svg";
import Messages from "../../assets/images/messages.svg";
import DiscussionForum from "../../assets/images/discussion forums.svg";
import Settings from "../../assets/images/settings/setting.svg";

import { Link } from "react-router-dom";

function Sidebar() {





    return (
        
            <div>
                <div className="flex h-screen bg-lighterGreen-three">
                    <div className="flex flex-wrap w-60 p-8">
                        <div className="space-y-3">
                            <div className="relative flex flex-col items-center justify-center">
                                <h2 className="text-customBlack-one">Hi, Alison</h2>
                                <p className="text-gray-three mb-10">Admin</p>
                            </div>
                            <Link to="/dashboard/profile" className="relative flex items-center">
                                <img src={profile} alt="profile logo" className="h-8 mr-5" />
                                <span className="text-sm text-gray-one">Profile</span>
                            </Link>

                            <Link to="/dashboard" className="relative flex items-center">
                                <img src={Dashboard} alt="dashboard logo" className="h-8 mr-5" />
                                <span className="text-sm text-customBlack-one">Dashboard</span>
                            </Link>
                            <Link to="/dashboard/programs" className="relative flex items-center">
                                <img src={Programs} alt="programs logo" className="h-8 mr-5" />
                                <span className="text-sm text-gray-one">Programs</span>
                            </Link>
                            <Link to="/dashboard/tasks" className="relative flex items-center">
                                <img src={Tasks} alt="tasks logo" className="h-8 mr-5" />
                                <span className="text-sm text-gray-one">Tasks</span>
                            </Link>
                            <Link to="/dashboard/reports" className="relative flex items-center">
                                <img src={Reports} alt="reports logo" className="h-8 mr-5" />
                                <span className="text-sm text-gray-one">Reports</span>
                            </Link>
                            <Link to="/dashboard/certificates" className="relative flex items-center">
                                <img src={Certificates} alt="certificates logo" className="h-8 mr-5" />
                                <span className="text-sm text-gray-one">Certificates</span>
                            </Link>
                            <Link to="/dashboard/messages" className="relative flex items-center">
                                <img src={Messages} alt="messages logo" className="h-8 mr-5" />
                                <span className="text-sm text-gray-one">Messages</span>
                            </Link>
                            <Link to="/dashboard/forums" className="relative flex items-center">
                                <img src={DiscussionForum} alt="discussion forum logo" className="h-8 mr-5" />
                                <span className="text-sm text-gray-one">Discussion Forum</span>
                            </Link>
                            <Link to="/dashboard/settings" className="relative flex items-center">
                                <img src={Settings} alt="settings logo" className="h-8 mr-5" />
                                <span className="text-sm text-gray-one">Settings</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

    );
}
export default Sidebar;










