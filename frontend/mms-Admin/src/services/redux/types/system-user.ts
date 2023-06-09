export interface SystemUser {
  userId?: string|null|undefined;
  firstNames?: string|null|undefined;
  lastName?: string|null|undefined;
  role?: string|null|undefined;
  bio?: string|null|undefined;
  email?: string|null|undefined;
  website?: string|null|undefined;
  country?: string|null|undefined;
  city?: string|null|undefined;
  github?: string|null|undefined;
  linkedin?: string|null|undefined;
  instagram?: string|null|undefined;
  twitter?: string|null|undefined;
  countryFlagIcon?: any;
  userImage?: any;
}

export interface MentorUser {
  userId?: string|null|undefined;
  userAvatar: any;
  details: string;
  title: string;
  mentor: string;
  firstNames?: string|null|undefined;
  lastName?: string|null|undefined;
  role?: string|null|undefined;
  bio?: string|null|undefined;
  email?: string|null|undefined;
  technicalProficiency?: string|null|undefined;
  previousPrograms?: string[]|null|undefined;
  previousRolesHeld?: string[]|null|undefined;
  availabiityForNewProgram?: string|null|undefined;
  programOfInterest?: string|null|undefined;
  beenAmentorBefore?: boolean|null|undefined;
  technicalYearsExperience?: number|null|undefined;
  documents?: string[]|null|undefined;
  status?: "PENDING"|"APPROVED"|"REJECTED"|"RETURNED";
}

export interface LoggedInUser {
  user: SystemUser;
  loginTime?: number;
  userToken?: string|null|undefined;
}

export interface UsernamePassword {
  username: string;
  password: string;
}

export interface ChangePasswordDetails {
  userId?: string|null|undefined;
  username?: string|null|undefined;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface NameDetails {
  userId?: string|null|undefined;
  fullName?: string|null|undefined;
  email?: string|null|undefined;
}
