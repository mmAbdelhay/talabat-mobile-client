import { removeData } from "./AsyncStorage";

export const SignOut = async () => {
  try {
    let removeToken = await removeData("token");
    if (removeToken) return true;
  } catch (err) {
    console.error(`error in signout ${err}`);
    return false;
  }
};
