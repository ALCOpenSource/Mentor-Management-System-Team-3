export interface SystemUser {
  userId?: string;
  firstNames?: string;
  lastName?: string;
  userRole?: string;
  about?: string;
  email?: string;
  website?: string;
  country?: string;
  city?: string;
  github?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  countryFlagIcon?: any;
  userImage?: any;
}

export interface LoggedInUser {
  user: SystemUser;
  loginTime?: number;
  userToken?: string;
}

export interface UsernamePassword {
  username: string;
  password: string;
  afterSuccessful?: () => void;
  afterUnSuccessful?: (tt: Error) => void;
}

export interface ChangePasswordDetails {
  userId?: string;
  username?: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface NameDetails {
  userId?: string;
  fullName?: string;
  email?: string;
}
