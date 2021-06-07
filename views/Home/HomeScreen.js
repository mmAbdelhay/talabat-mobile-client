import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import * as Location from "expo-location";
import Constants from "expo-constants";
import Loading from "../Loading/Loading";

const HomeScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        setLoading(false);
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      if (location) {
        setLocation(location);
        setLoading(false);
        console.log(location.coords.latitude, location.coords.longitude);
      }
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Loading />
      </View>
    );
  } else {
    return (
      <View>
        <Text>your location is {text}</Text>
      </View>
    );
  }
};

export default HomeScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    top: "5%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
});
