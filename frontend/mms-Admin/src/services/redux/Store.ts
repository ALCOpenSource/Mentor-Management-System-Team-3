import { LoggedInUser} from "./types/system-user";

export interface Store {
  currentUser?: LoggedInUser;
}
