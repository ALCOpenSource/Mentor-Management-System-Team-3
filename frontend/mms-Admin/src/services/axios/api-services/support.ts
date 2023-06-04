import { SupportModel } from "../../../views/dashboard/SwitchComponents/SettingsComponents/support";
import { SupportChatModel } from "../../../views/dashboard/SwitchComponents/SettingsComponents/support-live-chat";
import axiosWithBearer from "../axios-services";

export const sendSupportMessageApiAsync = async (
    data: SupportModel,
    token: string
) => {
    const bodyFormData = new FormData();
    bodyFormData.append("title", data.title);
    bodyFormData.append("email", data.email);
    bodyFormData.append("body", data.body);
    bodyFormData.append("name", data.name);
    if (data.attachments)
        bodyFormData.append("attachment", data.attachments);

    const saveUserAvatar = axiosWithBearer(token ?? "")
        .post("/mail/support", bodyFormData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
            //console.log("Sending message");
            return data;
        })
        .catch((err) => {
            throw err?.response?.data?.message ?? err;
        });

    return saveUserAvatar;
};



export const sendSupportChatMessageApiAsync = async (
    data: SupportChatModel,
    token: string
) => {
    const bodyFormData = new FormData();
    // bodyFormData.append("title", data.title);
    // bodyFormData.append("email", data.email);
    // bodyFormData.append("body", data.body);
    // bodyFormData.append("name", data.name);
    // if (data.attachments)
    //     bodyFormData.append("attachment", data.attachments);

    const saveUserAvatar = axiosWithBearer(token ?? "")
        .post("/mail/support", bodyFormData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
            //console.log("Sending message");
            return data;
        })
        .catch((err) => {
            throw err?.response?.data?.message ?? err;
        });

    return saveUserAvatar;
};
