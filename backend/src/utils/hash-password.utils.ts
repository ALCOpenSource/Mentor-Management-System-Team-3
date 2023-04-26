import * as bcrypt from "bcrypt";
import { CONSTANTS } from "../constants";

export const hashPassword = (
  password: string,
  salt = CONSTANTS.SALT,
): string => {
  return bcrypt.hashSync(password, salt);
};
