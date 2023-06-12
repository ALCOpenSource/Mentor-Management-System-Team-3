import ChatIcon from "../../../assets/images/programs/ChatIcon.svg";
import { ChatProp } from "../../../views/dashboard/SwitchComponents/AdminMessagesComponents/admin-messages";
import { ForumComment } from "../../../views/dashboard/SwitchComponents/AdminMessagesComponents/forum-comments";
import { MentorProp } from "../../../views/dashboard/SwitchComponents/AdminMessagesComponents/select-someone";
import {
  ChatMessageProp,
  MessageType,
} from "../../../views/dashboard/SwitchComponents/SettingsComponents/support-live-chat";
import { DiscussionForumProp } from "../../../views/dashboard/SwitchComponents/forums";
import { getRandomInteger } from "../../mathFunctions";

export const fetchChatMessagesApiAsync = async (
  token: string,
  userId: string,
  email: string
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
    "Ok",
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

export const fetchAllAdminChatMessagesApiAsync = async (
  token: string,
  userId: string,
  email: string
) => {
  const chats: ChatProp[] = [];
  if (true || getRandomInteger(0, 2) === 1) return await Promise.resolve(chats);

  const noOfChats = getRandomInteger(5, 100);
  for (let index = 0; index < noOfChats; index++) {
    const user = `User ${index + 1}`;
    const chatMgs: ChatMessageProp[] = [];
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
      "Ok",
    ];

    for (let i = 0; i < messages.length; i++) {
      var isReceived = i % 2 === 0;
      if (i > 4) isReceived = i % 2 !== 0;
      chatMgs.push({
        name: !isReceived ? user : "Anonymous",
        date: new Date(),
        icon: ChatIcon,
        messageType: isReceived ? MessageType.Recieved : MessageType.Send,
        message: messages[i],
      });

      const element: ChatProp = {
        name: user,
        id: index + 1 + " user",
        messages: chatMgs,
      };
      chats.push(element);
    }
  }
  return await Promise.resolve(chats);
};

export const fetchAdminChatMessagesApiAsync = async (
  token: string,
  mentor: MentorProp | undefined
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
    "Ok",
  ];

  for (let i = 0; i < messages.length; i++) {
    var isReceived = i % 2 === 0;
    if (i > 4) isReceived = i % 2 !== 0;
    chats.push({
      name: !isReceived ? mentor?.name ?? "" : "Anonymous",
      date: new Date(),
      icon: mentor?.icon ?? ChatIcon,
      messageType: isReceived ? MessageType.Recieved : MessageType.Send,
      message: messages[i],
    });
  }
  return await Promise.resolve(chats);
};

export const fetchAdminBroadcastMessagesApiAsync = async (token: string) => {
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
    "Ok",
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


export const fetchAdminDiscussionForumsApiAsync = async (token: string) => {
  const chats: DiscussionForumProp[] = [];

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
    "Ok",
  ];

  for (let i = 0; i < messages.length; i++) {
    var isReceived = i % 2 === 0;
    if (i > 4) isReceived = i % 2 !== 0;
    chats.push({
      userGroup: !isReceived ? "Mentor Manager" : "Mentor",
      date: new Date(),
      title:"The New MMS Discussion Forum Guidelines and Regulations",
      details:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enilf.",
      icon: ChatIcon,
      name: "User "+ i,
      message: messages[i],
    });
  }
  return await Promise.resolve(chats);
};



export const fetchAdminDiscussionCommentsApiAsync = async (token: string, forum?:DiscussionForumProp) => {
  const chats: ForumComment[] = [];

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
    "Ok",
  ];

  for (let i = 0; i < messages.length; i++) {
    var isReceived = i % 2 === 0;
    if (i > 4) isReceived = i % 2 !== 0;
    chats.push({
      time: new Date(),
      comment:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enilf.",
      name: "User "+ i,
    });
  }
  return await Promise.resolve(chats);
};