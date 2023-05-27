import { createHash } from "crypto";

export const encryption = (value: string) => {
  return createHash("sha256").update(value).digest("hex");
};
