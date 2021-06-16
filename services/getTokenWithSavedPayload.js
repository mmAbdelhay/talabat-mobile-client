import jwt_decode from "jwt-decode";
import { getData, removeData } from "./AsyncStorage";
import { login } from "./AxiosRequests";

export const getTokenWithSavedPayload = async () => {
  const tokenFromService = await getData("token");
  if (tokenFromService) {
    let decoded = jwt_decode(tokenFromService);
    if (parseInt(Date.now().toString().slice(0, -3)) > parseInt(decoded.exp)) {
      await removeData("token");
      const userPayload = await getData("loginPayload");
      if (Object.keys(userPayload).length > 0) {
        if (await login(userPayload)) {
          let newToken = await getData("token");
          if (newToken.length > 0) return newToken;
        }
      }
    } else {
      return tokenFromService;
    }
  }
};
