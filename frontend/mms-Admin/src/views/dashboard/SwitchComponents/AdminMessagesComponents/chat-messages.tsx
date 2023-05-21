import { useLocation } from "react-router-dom";
import { MentorProp } from "./select-someone";

function ChatMessages(){
    const location= useLocation();
    const user:MentorProp = location.state;
    console.log(user);
    return (
        <section>
            <h1>Chat Messages for {user.name}</h1>
          
        </section>
    )
}

export default ChatMessages;