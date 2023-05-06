export interface SystemUser {
    userId? :string;
    firstName?: string;
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
    countryFlagIcon?:any;
    userImage?:any;
  }


  export interface LoggedInUser{
     user: SystemUser;
     loginTime?:Date;
     userToken?: string;
  }

  
  export interface UsernamePassword{
    username: string;
    password:Date;
 }