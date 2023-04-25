import { IImage } from "../interface/image.interface";

export class CreateUserDTO {
  id: string;
  email: string;
  firstName: string;
  lastName?: string;
  avatar?: IImage;
}
