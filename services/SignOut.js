import { removeData } from "./AsyncStorage";

export const SignOut = async () => {
  return await removeData("token");
};
