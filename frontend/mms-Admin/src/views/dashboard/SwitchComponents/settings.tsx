import React from "react";
import { NavLink, Outlet } from "react-router-dom";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useNavigate } from "react-router-dom";
// import { auth, db, logout } from "../../firebase";
// import { query, collection, getDocs, where } from "firebase/firestore";




function Settings() {
    const nav = [
        {
            label: 'General',
            route: 'general'
        },
        {
            label: 'Password',
            route: 'password'
        },
        {
            label: 'Notifications',
            route: 'notifications'
        },
        {
            label: 'Privacy',
            route: 'privacy'
        },
        {
            label: 'Archive',
            route: 'archive'
        },
        {
            label: 'Support',
            route: 'support'
        },
        {
            label: 'FAQ',
            route: 'faq'
        }
    ]

    return (
    <div className="flex flex-col"> 
    <section className="flex">
       <section className="border-solid bg-lighterGreen-three">
       {
          nav.map((item, i) => {
             return (
                <section key='i' className="flex  px-8  hover:bg-white py-2 text-center">
                    <NavLink to={`/dashboard/settings/${item.route}`}   className="relative flex items-center active:bg-white">
                                <span className="text-sm text-gray-one">{item.label}</span>
                    </NavLink>
                </section>
            )
           })
        }
       </section>
    <section className="border-solid p-1">
    <Outlet/>
    </section>
    </section>

  </div>
  );
}
export default Settings;