import { Iimage } from "../interface/image.interface";

export class CreateUserDTO {
  uid: string;
  email: string;
  firstName: string;
  lastName?: string;
  avatar?: Iimage;
}
