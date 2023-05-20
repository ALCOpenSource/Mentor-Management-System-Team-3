import { Outlet } from "react-router-dom";
import "../../../index.css"
import "./Messages.css"

function Messages() {
    return (
        <div className="flex flex-col">
            <section className="flex">
                <section className="border-solid p-1">
                    <Outlet />
                </section>
            </section>
        </div>
    );
}
export default Messages;
