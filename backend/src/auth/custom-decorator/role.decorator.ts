import { SetMetadata } from "@nestjs/common";
import { ROLE, ROLE_KEY } from "../enums/role.enum";

export const Role = (...roles: ROLE[]) => SetMetadata(ROLE_KEY, roles);
