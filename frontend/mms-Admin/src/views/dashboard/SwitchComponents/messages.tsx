import { Outlet } from "react-router-dom";
import "../../../index.css"
import "./Messages.css"

function Messages() {
    return (
        <div className="h-full w-full flex flex-col">
            <section className="flex h-full w-full">
                <section className=" h-full w-full border-solid p-1">
                    <Outlet />
                </section>
            </section>
        </div>
    );
}
export default Messages;
