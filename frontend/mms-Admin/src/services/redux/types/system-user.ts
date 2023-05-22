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
