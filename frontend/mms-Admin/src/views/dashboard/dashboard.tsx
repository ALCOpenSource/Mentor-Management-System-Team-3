import React from "react";
// import Navbar from "../../components/shared/navbar";
import Sidebar from "../../components/shared/sidebar";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useNavigate } from "react-router-dom";
// import { auth, db, logout } from "../../firebase";
// import { query, collection, getDocs, where } from "firebase/firestore";




function Dashboard() {
  return (
    <div>
    <Sidebar />
  </div>
  );
}
export default Dashboard;


  // const [user, loading] = useAuthState(auth);
  // const [name, setName] = useState("");
  // const navigate = useNavigate();
  // const fetchUserName = async () => {
  //   try {
  //     const q = query(collection(db, "users"), where("uid", "==", user?.uid));
  //     const doc = await getDocs(q);
  //     const data = doc.docs[0].data();
  //     setName(data.name);
  //   } catch (err) {
  //     console.error(err);
  //     alert("An error occured while fetching user data");
  //   }
  // };
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => {
  //   if (loading) return;
  //   if (!user) return navigate("/");
  //   fetchUserName();
  // }, [user, loading]);
  
  // return (
  //   <div className="dashboard">
  //      <div className="dashboard__container">
  //       Logged in as
  //        <div>{name}</div>
  //        <div>{user?.email}</div>
  //        <button className="dashboard__btn" onClick={logout}>
  //         Logout
  //        </button>
  //      </div>
  //    </div>
  // );