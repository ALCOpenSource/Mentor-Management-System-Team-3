import ChatIcon from "../../../assets/images/programs/ChatIcon.svg";
import { MentorProp } from "../../../views/dashboard/SwitchComponents/AdminMessagesComponents/select-someone";
import { ChatMessageProp, MessageType } from "../../../views/dashboard/SwitchComponents/SettingsComponents/support-live-chat";

export const fetchChatMessagesApiAsync = async (
  token: string,
  userId:string,
  email:string
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
    "I can't find you in the system",
    "What do you mean?",
    "Let me channel the issue to technical team, then we will get back to you.",
    "Ok"
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

  return await Promise.resolve(chats);
};


export const fetchAdminChatMessagesApiAsync = async (
  token: string, mentor: MentorProp|undefined
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
    "I can't find you in the system",
    "What do you mean?",
    "Let me channel the issue to technical team, then we will get back to you.",
    "Ok"
  ];

  for (let i = 0; i < messages.length; i++) {
    var isReceived = i % 2 === 0;
    if (i > 4) isReceived = i % 2 !== 0;
    chats.push({
      name: !isReceived ? mentor?.name??"" : "Anonymous",
      date: new Date(),
      icon: mentor?.icon ?? ChatIcon,
      messageType: isReceived ? MessageType.Recieved : MessageType.Send,
      message: messages[i],
    });
  }
   return await Promise.resolve(chats);
};

export const fetchAdminBroadcastMessagesApiAsync = async (
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
    "I can't find you in the system",
    "What do you mean?",
    "Let me channel the issue to technical team, then we will get back to you.",
    "Ok"
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
  return await Promise.resolve(chats);
};