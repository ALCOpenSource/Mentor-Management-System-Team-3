import { useRef } from "react";
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
    <nav className="relative flex flex-row w-full justify-between bg-green-three px-4">
      <section className="flex flex-wrap items-center">
        <div className="relative flex justify-between items-center left-[55px] mr-20">
          <img src={logo} alt="MMS Logo" className="h-[69px] w-[69px] mr-2" />
          <span className="text-[16px] text-white">Mentor Managers System</span>
        </div>


      </section>
      <section className="flex flex-row">
        <div className={`w-full left-[calc(45%-100px)] absolute items-stretch transform hover:translate-y-1 hover:bg-opacity-80 p-0 transition ease-out duration-300`}>
          <img
            src={search}
            alt="search button logo"
            className="absolute mx-5 my-6"
          />
          <input
            type="text"
            id="globalSearch"
            name="globalSearch"
            placeholder="Search for anything"
            className="border-2 mt-2 border-lightGray-two w-[37%] py-3 px-12 rounded-[5px] text-[16px] "
          />
        </div>
        <div className="flex flex-row items-center min-w-[100px] justify-between mr-2">
          <button type="button" className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-non">
          <img className="btn-animate" src={chats} alt="Chats Icon" />
            <span className="sr-only">Notifications</span>
            <div className="absolute btn-animate inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-three border-0 border-white rounded-full -top-1 -right-1 ">3</div>
          </button>

          <button type="button" className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-non">
          <img className="btn-animate" src={notifications} alt="Chats Icon" />
            <span className="sr-only">Notifications</span>
            <div className="absolute btn-animate inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-three border-0 border-white rounded-full -top-1 -right-1 ">15</div>
          </button>
          <button
            type="button"
            ref={avatarRef}
            className="btn-secondary font-medium mt-0"
          >
            <div>
              <img src={userImage} alt="Avatar Icon" className="ml-2 mr-8 rounded-full w-[42px] h-[42px]" />
              <ContextMenu contextParent={avatarRef} items={items} onClick={onAvatarRightClick} />
            </div>
          </button>
        </div>
      </section>
    </nav>
  );
}
export default Navbar;
