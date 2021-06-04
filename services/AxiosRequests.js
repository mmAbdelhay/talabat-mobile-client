import axios from "axios";
import { ServerIP } from "../assets/config";
import { getData } from "./AsyncStorage";
import { storeData } from "./AsyncStorage";

const getToken = () => {
  const token = getData("token");
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
      return response;
    } else {
      return false;
    }
  } catch (err) {
    console.error(`axios request login ${err}`);
    return false;
  }
};

export const signUp = async (url, payload) => {
  if (!token) return false;
  try {
    const response = await axios.post(`${ServerIP}${url}`, { payload });
    return response ? response.data : false;
  } catch (err) {
    console.error(`axios request signup ${err}`);
  }
};

export const axiosGet = async (url) => {
  if (!token) return false;
  try {
    const response = await axios.get(`${ServerIP}${url}`, {
      headers: {
        Authorization: "Token " + getToken(),
      },
    });
    return response ? response.data : false;
  } catch (err) {
    console.error(`axios request axiosGet ${err}`);
  }
};

export const axiosPost = async (url, payload) => {
  if (!token) return false;
  try {
    const response = await axios.post(
      `${ServerIP}${url}`,
      { payload },
      { headers: { Authorization: "Token " + getToken() } }
    );
    return response ? response.data : false;
  } catch (err) {
    console.error(`axios request axiosPost ${err}`);
  }
};

export const axiosPut = async (url, payload) => {
  if (!token) return false;
  try {
    const response = await axios.post(
      `${ServerIP}${url}`,
      { payload },
      { headers: { Authorization: "Token " + getToken() } }
    );
    return response ? response.data : false;
  } catch (err) {
    console.error(`axios request axiosPut ${err}`);
  }
};

export const axiosDelete = async (url) => {
  if (!token) return false;
  try {
    const response = await axios.post(`${ServerIP}${url}`, {
      headers: { Authorization: "Token " + getToken() },
    });
    return response ? response.data : false;
  } catch (err) {
    console.error(`axios request axiosDelete ${err}`);
  }
};
