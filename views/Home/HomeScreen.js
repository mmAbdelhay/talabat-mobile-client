import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Image,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import * as Location from "expo-location";
import Constants from "expo-constants";
import Loading from "../Loading/Loading";
import axios from "axios";
import { ServerIP } from "../../assets/config";
import { Card } from "react-native-elements";

const HomeScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [providers, setProviders] = useState([]);

  const getNearProviders = async () => {
    let payload = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    let response = await axios.post(
      `${ServerIP}/api/v1/guest/lookup/nearproviders`,
      payload
    );
    if (response.status === 200) setProviders(response.data.Message);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    if (location) {
      getNearProviders();
      setLoading(false);
    }
  }, [location]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Loading />
      </View>
    );
  } else {
    return (
      <ScrollView style={{ marginBottom: "22%" }}>
        {providers &&
          providers.map((item, index) => {
            return (
              <Card key={index}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ProviderProfile", {
                      id: item.id,
                    })
                  }
                >
                  <Image
                    source={{ uri: `${ServerIP}${item.logo}` }}
                    style={{ width: 40, height: 40, borderRadius: 5 }}
                  />
                  <Text style={{ fontWeight: "bold" }}>Name : {item.name}</Text>
                  <Text>provider_type : {item.provider_type}</Text>
                  <Text>delivery_fee : {item.delivery_fee}</Text>
                  <Text>minimum_order : {item.minimum_order}</Text>
                  <Text>opening_hour : {item.opening_hour}</Text>
                  <Text>closing_hour : {item.closing_hour}</Text>
                  <Text>delivery_time : {item.delivery_time}</Text>
                </TouchableOpacity>
              </Card>
            );
          })}
      </ScrollView>
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
