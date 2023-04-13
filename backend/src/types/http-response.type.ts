import { ProgramArchive } from "../programs-archive/programs-archive.schema";
import { OperationStatus } from "../filters/interface/response.interface";
import { UserDocument } from "../users/users.schema";

export type HttpResponseType = {
  status: OperationStatus;
  message: string;
  data: UserDocument | ProgramArchive | [] | object;
};
