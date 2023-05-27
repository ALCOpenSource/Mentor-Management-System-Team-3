import { randomBytes } from "crypto";

export const randomHexCode = () => randomBytes(32).toString("hex");
