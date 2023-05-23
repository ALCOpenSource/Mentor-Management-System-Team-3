import { ChatMessageProp, MessageType } from "../../../views/dashboard/SwitchComponents/SettingsComponents/live-chats-page";
import ChatIcon from "../../../assets/images/programs/ChatIcon.svg";

export const fetchAdminChatMessagesApiAsync = async (

  token: string
) => {
  const chats: ChatMessageProp[] = [];

  const messages = [
    "Hello! How are you doing?",
    "A'm doing well, thanks you.\r\nHow can I help",
    "I have a question about the return policy for a product I purchased.",
    "Ok! Kindly what is the problem",
    "It's showing that is expired",
    "It's even unable to be loaded",
    "Help me with your insurance number",
  ];

  for (let i = 0; i < messages.length; i++) {
    var isReceived = i % 2 === 0;
    if (i > 4) isReceived = i % 2 !== 0;
    chats.push({
      name: !isReceived ? "Assistant" : "Anonymous",
      date: new Date(),
      icon: ChatIcon,
      messageType: isReceived ? MessageType.Recieved : MessageType.Send,
      message: messages[i],
    });
  }

  let returnChats = async () => {
    let output = await Promise.resolve(chats);
    return output;
  }
  return chats;
};
