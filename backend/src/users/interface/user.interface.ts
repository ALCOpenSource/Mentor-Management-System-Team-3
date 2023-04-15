import { ROLE } from "../users.schema";
import { IImage } from "./image.interface";
import { ISocials } from "./socials.interface";

export interface IUser {
  id?: string;
  uid: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  city?: string;
  website?: string;
  email?: string;
  bio?: string;
  avatar?: IImage;
  role: ROLE;
  socials: ISocials;
  createdBy?: string;
  updatedBy?: string;
}
