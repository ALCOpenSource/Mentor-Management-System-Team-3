import { NavLink, Outlet } from "react-router-dom";
//import "../../../index.css"
//import "./settings.css"

function Settings() {
  const nav = [
    {
      label: "General",
      route: "general",
    },
    {
      label: "Password",
      route: "password",
    },
    {
      label: "Notifications",
      route: "notifications",
    },
    {
      label: "Privacy",
      route: "privacy",
    },
    {
      label: "Archive",
      route: "archive",
    },
    {
      label: "Support",
      route: "support",
    },
    {
      label: "FAQ",
      route: "faq",
    },
  ];

  return (
    <div className="flex flex-col w-[100%] h-[100%]">
      <h3 className="main-title ms-0 pt-3 pb-1 w-[100%]">Settings</h3>
      <section className="flex h-[calc(100%-30px)]">
        <section className="border-solid bg-lighterGreen-three">
          {nav.map((item, i) => {
            return (
              <section
                key="i"
                className="px-8 focus:bg-white hover:bg-white py-2 text-center"
              >
                <NavLink
                  to={`/dashboard/settings/${item.route}`}
                  className="relative focus:font-bold focus:bg-white hover:bg-white w-[100%] active:bg-white"
                >
                  <span className="text-sm w-[100%] focus:font-bold focus:bg-white hover:bg-white text-gray-one">{item.label}</span>
                </NavLink>
              </section>
            );
          })}
        </section>
        <section className="border-solid h-[100%] w-[100%]">
          <Outlet />
        </section>
      </section>
    </div>
  );
}
export default Settings;
