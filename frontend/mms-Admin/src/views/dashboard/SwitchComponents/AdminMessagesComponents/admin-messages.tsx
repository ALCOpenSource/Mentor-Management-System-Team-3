import React, { useState } from "react";
import { Formik, Form } from "formik";
import NoMessageIcon from "../../../../assets/images/messages/NoMessages.svg";
import { useNavigate } from "react-router-dom";
import { ChatMessageProp } from "../SettingsComponents/support-live-chat";
interface ChatProp {
  name: string;
  id: string;
  messages: ChatMessageProp[]
}

const NoMessagesComponent: React.FC = () => {
  const navigate = useNavigate();
  const browsePeople = () => navigate("/dashboard/messages/select-someone");

  return (
    <div style={{ alignItems: "center", justifyContent: "center" }} className="flex w-full h-full">
      <div className="flex justify-center text-center flex-col" >
        <img
          src={NoMessageIcon}
          className="h-[44.2px] w-[44.2px] m-auto"
          alt="Attach file icon"
        />
        <label className="font-mukta text-[20px] leading-[33px] w-full items-center font-semibold text-center text-[#141414] ">
          No Messages, Yet
        </label>
        <label className="m-auto font-mukta font-[16px] leading-[27px] mb-[50px] items-center text-center text-[#999999]">
          No messages in your chatbox, yet. Start chatting with other users
        </label>
        <button
          type="button"
          onClick={browsePeople}
           className="btn-primary relative mx-auto p-[10px]"
        >
          Browse People
        </button>
      </div>
    </div>
  )
}

const ExistsMessagesComponent: React.FC = () => {
  return (
    <div style={{ alignItems: "center" }} className="flex w-full h-full">
      <label>messages found</label>
      <img
        src={NoMessageIcon}
        style={{
          height: "44.2px",
          width: "44.2px",
        }}
        alt="Attach file icon"
        className="dropdown-icon"
      />
    </div>
  )
}

const AdminMessages: React.FC = () => {
  const [chatMessages, setChatMessages] = useState<ChatProp[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const showErrorMessage = (tt: any) => {
    try {
      setErrorMessage(tt?.message ?? tt);
    } catch (err) {
      setErrorMessage(tt);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      navigate("/dashboard/messages/broadcast-message")
    } catch (error: any) {
      showErrorMessage(error.message);
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <Formik
        initialValues={chatMessages}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => {
          return (
            <Form className="w-full h-screen">
              <div className="flex flex-col w-full py-3">
                <button
                  type="submit"
                  className="btn-primary ml-auto my-auto"
                >
                  Send Broadcast Message
                </button>
              </div>
              <div style={{ height: "calc(100vh - 10px)" }} className="profile-form flex  flex-col  relative">
                {chatMessages.length === 0 && (<NoMessagesComponent />)}
                {chatMessages.length !== 0 && (<ExistsMessagesComponent />)}
              </div>
              <h5 className="text-1xl text-gray-two font-bold mt-4">
                {successMessage}
              </h5>

              <h5
                style={{ color: "orangered" }}
                className="text-1xl font-bold mt-4"
              >
                {errorMessage}
              </h5>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AdminMessages;
