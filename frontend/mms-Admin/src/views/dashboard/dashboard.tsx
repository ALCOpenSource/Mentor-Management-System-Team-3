import Sidebar from "../../components/shared/sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/shared/navbar";

function Dashboard() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <section className="flex">
        <section className="border-solid bg-lighterGreen-three">
          <Sidebar />
        </section>
        <section className="border-solid p-8 grow">
          <Outlet />
        </section>
      </section>
    </div>
  );
}
export default Dashboard;
