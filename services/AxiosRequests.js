import axios from "axios";
import { ServerIP } from "../assets/config";
import { getData } from "./AsyncStorage";
import { storeData } from "./AsyncStorage";

const getToken = async () => {
  const token = await getData("token");
  return token ? token : null;
};

export const login = async (payload) => {
  try {
    const response = await axios.post(
      `${ServerIP}/api/v1/client/authenticate/login`,
      payload
    );
    if (response.status == 200) {
      storeData("token", response.data.token);
      storeData("loginPayload", JSON.stringify(payload));
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(`axios request login ${err}`);
    return false;
  }
};

export const signUp = async (payload) => {
  try {
    const response = await axios.post(
      `${ServerIP}/api/v1/client/authenticate/register`,
      payload
    );
    if (response.status === 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (err) {
    console.error(`axios request signup ${err}`);
    return false;
  }
};

export const contactus = async (payload) => {
  try {
    const response = await axios.post(
      `${ServerIP}/api/v1/forms/contactus`,
      payload
    );
    return response ? response.data : false;
  } catch (err) {
    console.error(`axios request contact ${err}`);
  }
};

export const axiosGet = async (url) => {
  if (!(await getToken())) return false;

  try {
    const response = await axios.get(`${ServerIP}${url}`, {
      headers: {
        Authorization: "Token " + (await getToken()),
      },
    });
    return response ? response.data : false;
  } catch (err) {
    console.error(`axios request axiosGet ${err}`);
    return false;
  }
};

export const axiosPost = async (url, payload) => {
  if (!(await getToken())) return false;
  try {
    const response = await axios.post(`${ServerIP}${url}`, payload, {
      headers: { Authorization: "Token " + (await getToken()) },
    });
    return response ? response.data : false;
  } catch (err) {
    console.error(`axios request axiosPost ${err}`);
    return false;
  }
};

export const axiosPut = async (url, payload) => {
  if (!(await getToken())) return false;
  try {
    const response = await axios.post(`${ServerIP}${url}`, payload, {
      headers: { Authorization: "Token " + (await getToken()) },
    });
    return response ? response.data : false;
  } catch (err) {
    console.error(`axios request axiosPut ${err}`);
  }
};

export const axiosDelete = async (url) => {
  if (!(await getToken())) return false;
  try {
    const response = await axios.post(`${ServerIP}${url}`, {
      headers: { Authorization: "Token " + (await getToken()) },
    });
    return response ? response.data : false;
  } catch (err) {
    console.error(`axios request axiosDelete ${err}`);
  }
};
