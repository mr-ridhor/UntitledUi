export type AuthTypes = {
    name?: string;
    username?: string;
    email: string;
    password: string;
    consent?: boolean;
  };
  
  export type ChangePasswordType = {
    password: string;
    newPassword: string;
    confirmPassword: string;
  };
  
  export type ChangeEmailType = {
    email: string;
    newEmail: string;
    confirmEmail: string;
  };