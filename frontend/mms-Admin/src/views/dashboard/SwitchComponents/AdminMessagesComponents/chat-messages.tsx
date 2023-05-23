import { useLocation, useNavigate } from "react-router-dom";
import { MentorProp } from "./select-someone";
import avatarSVG from "../../../../assets/images/avatar.svg";
import { useState } from "react";

const NoMessagesComponent: React.FC = () => {
    const navigate = useNavigate();
    const browsePeople = () => navigate("/dashboard/messages/select-someone");

    return (
        <div style={{ alignItems: "center", justifyContent: "center" }} className="flex w-full h-full">
            <div style={{ display: "inline-block", textAlign: "center", justifyContent: "center" }} >
                <img
                    src={avatarSVG}
                    style={{
                        height: "44.2px",
                        width: "44.2px",
                        margin: "auto"
                    }}
                    alt="Attach file icon"
                />
                <label className="no-messages-box">
                    No Messages, Yet
                </label>
                <label className="no-message-details-box">
                    No messages in your chatbox, yet. Start chatting with other users
                </label>
                <button
                    type="button"
                    onClick={browsePeople}
                    style={{ marginBottom: "20px", marginTop: "50px", margin: "auto" }}
                    className="bg-green-three text-white rounded-[10px] p-[10px] font-medium mt-0"
                >
                    Browse People
                </button>
            </div>
        </div>
    )
}

function ChatMessages() {
    const location = useLocation();
    const user: MentorProp = location.state;

    useState(() => {
        
    });

    return (
        <section>
            <NoMessagesComponent />
        </section>
    )
}

export default ChatMessages;