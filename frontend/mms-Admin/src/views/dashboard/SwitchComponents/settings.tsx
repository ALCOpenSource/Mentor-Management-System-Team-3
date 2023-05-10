import { NavLink, Outlet } from "react-router-dom";
import "../../../index.css"

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
    <div className="flex flex-col">
      <h3 className="text-black text-2xl ms-0 pt-3 pb-1 font-bold">Settings</h3>
      <section className="flex">
        <section className="border-solid bg-lighterGreen-three">
          {nav.map((item, i) => {
            return (
              <section
                key="i"
                className="flex  px-8  hover:bg-white py-2 text-center"
              >
                <NavLink
                  to={`/dashboard/settings/${item.route}`}
                  className="relative flex items-center active:bg-white"
                >
                  <span className="text-sm text-gray-one">{item.label}</span>
                </NavLink>
              </section>
            );
          })}
        </section>
        <section className="border-solid p-1">
          <Outlet />
        </section>
      </section>
    </div>
  );
}
export default Settings;
