import React from "react";
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
import Navbar from "./navbar";

function Sidebar() {
    return (
        <div>
            <Navbar />
            <div>
                <div className="flex h-screen m-10">
                    <div className="flex flex-wrap bg-white w-60">
                        <div className="space-y-3">
                            <div className="relative flex flex-col items-center justify-center">
                                <h2 className="text-customBlack-one">Hi, Alison</h2>
                                <p className="text-gray-three mb-10">Mentor Manager</p>
                            </div>

                            <div className="relative flex items-center">
                                <img src={profile} alt="profile logo" className="h-8 mr-5" />
                                <span className="text-sm text-gray-one">Profile</span>
                            </div>

                            <div className="relative flex items-center">
                                <img src={Dashboard} alt="dashboard logo" className="h-8 mr-5" />
                                <span className="text-sm text-customBlack-one">Dashboard</span>
                            </div>
                            <div className="relative flex items-center">
                                <img src={Programs} alt="programs logo" className="h-8 mr-5" />
                                <span className="text-sm text-gray-one">Programs</span>
                            </div>
                            <div className="relative flex items-center">
                                <img src={Tasks} alt="tasks logo" className="h-8 mr-5" />
                                <span className="text-sm text-gray-one">Tasks</span>
                            </div>
                            <div className="relative flex items-center">
                                <img src={Reports} alt="reports logo" className="h-8 mr-5" />
                                <span className="text-sm text-gray-one">Reports</span>
                            </div>
                            <div className="relative flex items-center">
                                <img src={Certificates} alt="certificates logo" className="h-8 mr-5" />
                                <span className="text-sm text-gray-one">Certificates</span>
                            </div>
                            <div className="relative flex items-center">
                                <img src={Messages} alt="messages logo" className="h-8 mr-5" />
                                <span className="text-sm text-gray-one">Messages</span>
                            </div>
                            <div className="relative flex items-center">
                                <img src={DiscussionForum} alt="discussion forum logo" className="h-8 mr-5" />
                                <span className="text-sm text-gray-one">Discussion Forum</span>
                            </div>
                            <div className="relative flex items-center">
                                <img src={Settings} alt="settings logo" className="h-8 mr-5" />
                                <span className="text-sm text-gray-one">Settings</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Sidebar;










