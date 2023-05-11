import { UserDocument } from "../users.schema";
import { TaskDocument } from "../../task/task.schema";

export interface UserTaskResponse {
  user: UserDocument;
  tasks: TaskDocument[];
}
