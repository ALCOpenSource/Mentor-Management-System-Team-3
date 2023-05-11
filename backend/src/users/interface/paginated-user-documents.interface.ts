import { UserDocument } from "../users.schema";

export interface PaginatedUserDocuments {
  docs: UserDocument[];
  count: number;
}
