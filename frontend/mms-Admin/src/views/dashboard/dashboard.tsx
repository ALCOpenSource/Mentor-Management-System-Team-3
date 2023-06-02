import Sidebar from "../../components/shared/sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/shared/navbar";
// import { auth, db, logout } from "../../firebase";
// import { query, collection, getDocs, where } from "firebase/firestore";

function Dashboard() {
  return (
    <div className="flex absolute flex-col w-[100vw] h-[100vh]">
      <Navbar />
      <section className="flex w-full h-full">
        <section className="border-solid h-full bg-lighterGreen-three">
          <Sidebar />
        </section>
        <section className="border-solid w-full h-full">
          <div className="w-full absolute h-full">
            <div className="w-[calc(100%-270px)] h-full p-0 m-0">
              <Outlet />
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
export default Dashboard;
