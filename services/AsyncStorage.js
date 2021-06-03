import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.error(`AsyncStorage : can't store ${key} error is ${err}`);
    return false;
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? JSON.parse(value) : false;
  } catch (err) {
    console.error(`AsyncStorage : can't get ${key} error is ${err}`);
    return false;
  }
};

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    console.error(`AsyncStorage : can't remove ${key} error is ${err}`);
    return false;
  }
};
