import { Outlet } from "react-router-dom";
import "../../../index.css"

function Messages() {
    return (
        <div className="h-screen w-full">
            <section className="h-[90%] w-full">
                <section className="h-full w-full border-solid p-1">
                    <Outlet />
                </section>
            </section>
        </div>
    );
}
export default Messages;
