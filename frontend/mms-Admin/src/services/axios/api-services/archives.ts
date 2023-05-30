//import { SupportModel } from "../../../views/dashboard/SwitchComponents/SettingsComponents/support";
import axiosWithBearer from "../axios-services";

export const getArchivesApiAsync = async (
    token: string
) => {   
    const archives = axiosWithBearer(token ?? "")
        .get("/programs-archive", {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then((data) => {
            console.log("archives", data);
            return data;
        })
        .catch((err) => {
            throw err?.response?.data?.message ?? err;
        });
    return archives;
};
