import React from "react";
// import Navbar from "../../components/shared/navbar";
import Sidebar from "../../components/shared/sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/shared/navbar";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useNavigate } from "react-router-dom";
// import { auth, db, logout } from "../../firebase";
// import { query, collection, getDocs, where } from "firebase/firestore";




function Dashboard() {




  return (
    <div className="flex flex-col"> 
    <Navbar/>
    <section className="flex">
       <section className="border-solid bg-lighterGreen-three">
    <Sidebar />
    </section>
    <section className="border-solid p-8">
    <Outlet/>
    </section>
    </section>

  </div>
  );
}
export default Dashboard;


