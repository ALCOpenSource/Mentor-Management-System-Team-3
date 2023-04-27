import { SetMetadata } from "@nestjs/common";
import { ROLE, ROLE_KEY } from "../enums/role.enum";

export const Role = (role: ROLE) => SetMetadata(ROLE_KEY, role);
