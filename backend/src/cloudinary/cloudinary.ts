import { ConfigOptions, v2 } from "cloudinary";

import { CONSTANTS } from "../constants";

export const CloudinaryProvider = {
  provide: CONSTANTS.CLOUDINARY,
  useFactory: (): ConfigOptions => {
    return v2.config({
      // cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
      // api_key: process.env.CLOUDINARY_API_KEY as string,
      // api_secret: process.env.CLOUDINARY_API_SECRET as string,
      cloud_name: "dvawkzpoz",
      api_key: "918777414397226",
      api_secret: "-eLk5IdEkX8OrcrLjzSmGapep6I",
      secure: true,
    });
  },
};
