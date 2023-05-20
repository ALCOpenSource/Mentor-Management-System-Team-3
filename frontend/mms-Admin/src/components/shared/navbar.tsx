import React, { useRef } from "react";
import logo from "../../assets/images/mms_logo.svg";
import search from "../../assets/images/search.svg";
import chats from "../../assets/images/chats.svg";
import notifications from "../../assets/images/notifications.svg";
import { logoutCurrentUser, selectCurrentUserProfilePicture } from "../../services/redux/slices/current-user-slice";
import { useAppDispatch, useAppSelector } from "../../services/redux/Store";
import { ContextMenu } from "./contextMenu/ContextMenu";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

function Navbar() {
  const userImage = useAppSelector(selectCurrentUserProfilePicture);
  const items = ['Profile', 'Change Password', 'Logout'];
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onAvatarRightClick = async (item: string) => {
    console.log(item);
    switch (item) {
      case "Profile":
        navigate("/dashboard/profile");
        break;
      case "Change Password":
        navigate("/dashboard/settings/password");
        break;
      case "Logout":
        try {
          dispatch(logoutCurrentUser());
          navigate("/login");
          googleLogout();
        } catch (error) { console.log(error) }
        break;
    }
  };

  const avatarRef = useRef<HTMLButtonElement>(null);

  return (
    <nav className="relative flex flex-row w-full justify-between bg-green-three p-4">
      <section className="flex flex-wrap items-center">
        <div className="relative flex justify-between items-center mr-20">
          <img src={logo} alt="MMS Logo" className="h-8 mr-2" />
          <span className="text-3xl text-white">Mentor Managers System</span>
        </div>


      </section>
      <section className="flex flex-row">
        <div className="flex flex-row">
          <button
            type="button"
            className="flex flex-row  items-center text-md shadow appearance-none border rounded w-[533px] py-2 px-5 bg-white leading-tight focus:outline-none focus:shadow-outline"
          >
            <img src={search} alt="Search icon" className="h-5 w-5 mr-4" />
            <span className="text-customBlack-three ">
              Search for anything
            </span>
          </button>
        </div>
        <div className="flex flex-row items-center justify-between">
          <span className="flex flex-row mx-4" >  <img src={chats} alt="Chats Icon" />   <sub className="right-2 w-4 h-4"><span className="bg-red-four text-white rounded-full p-1">3</span></sub></span>

          <span className="flex flex-row mx-4" >  <img src={notifications} alt="Notifications Icon" />  <sub className="right-2 w-4 h-4"><span className="bg-red-four text-white rounded-full p-1">15</span></sub></span>

          <button
            type="button"
            ref={avatarRef}
            className="font-medium mt-0"
          >
            <div>
              <img src={userImage} alt="Avatar Icon" style={{ borderRadius: "50%", width: "42px", height: "42px" }} className="mx-2" />
              <ContextMenu contextParent={avatarRef} items={items} onClick={onAvatarRightClick} />
            </div>
          </button>
        </div>
      </section>
    </nav>
  );
}
export default Navbar;
