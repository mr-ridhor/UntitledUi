import { AuthResponse } from "../Types/UserType";

export const storeUserInfo = (userInfo: AuthResponse): void => {
    localStorage.setItem("user", JSON.stringify(userInfo));
  };
  export const getValueFromLocalStorage = (
    key: keyof AuthResponse
  ): string | null => {
    const storedUserInfo: AuthResponse = JSON.parse(
      localStorage.getItem("user") || "{}"
    );
    return storedUserInfo[key] !== undefined
      ? (storedUserInfo[key] as string)
      : null;
  };
  export const getAllValuesFromLocalStorage = (): AuthResponse| null => {
    const storedUserInfo: AuthResponse= JSON.parse(
      localStorage.getItem("user") || "{}"
    );
    return Object.keys(storedUserInfo).length > 0 ? storedUserInfo : null;
  };
  
  export const deleteAllLocalStorage = (): AuthResponse | null => {
    localStorage.removeItem("user");
    return null;
  };