import { ProgramDocument } from "./../programs/programs.schema";
import { ProgramArchiveDocument } from "../programs-archive/programs-archive.schema";
import { OperationStatus } from "../filters/interface/response.interface";
import { UserDocument } from "../users/users.schema";
import { PaginatedProgramArchiveDocuments } from "../programs-archive/interface/paginated-program-archive-documents.interface";

type HttpResponseData =
  | UserDocument
  | UserDocument[]
  | ProgramDocument
  | ProgramDocument[]
  | ProgramArchiveDocument
  | ProgramArchiveDocument[]
  | PaginatedProgramArchiveDocuments[]
  | object
  | [];

export type HttpResponseType<T extends HttpResponseData> = {
  status: OperationStatus;
  message: string;
  data: T;
};
