import React from "react";
import logo from "../../assets/images/mms_logo.svg";
import search from "../../assets/images/search.svg";
import chats from "../../assets/images/chats.svg";
import notifications from "../../assets/images/notifications.svg";
import avatar from "../../assets/images/avatar.svg";

function Navbar() {
  return (
    <nav className="bg-green-three border-green-three w-full p-4">
      <div className="flex flex-wrap items-center mx-auto">
        <div className="relative flex justify-between items-center mr-20">
          <img src={logo} alt="MMS Logo" className="h-8 mr-2" />
          <span className="text-3xl text-white">Mentor Managers System</span>
        </div>

        <div className="flex items-center mx-auto">
          <button
            type="button"
            className="flex flex-row justify-center items-center text-sm shadow appearance-none border rounded w-[533px] py-2 px-3 m-2 bg-white leading-tight focus:outline-none focus:shadow-outline"
          >
            <img src={search} alt="Search icon" className="h-5 w-5 mr-60" />
            <span className="text-customBlack-three ">
              Search for anything
            </span>
          </button>
        </div>
        <div className="flex flex-row items-center justify-end mx-auto">
          <img src={chats} alt="Chats Icon" className="mx-2" />
          <img src={notifications} alt="Notifications Icon" className="mx-2" />
          <img src={avatar} alt="Avatar Icon" className="mx-2" />
        </div>    
      </div>
    </nav>
  );
}

export default Navbar;