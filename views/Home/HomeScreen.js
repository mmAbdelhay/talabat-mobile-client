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
import { SearchBar } from "react-native-elements";
import { schedulePushNotification } from "../../services/notificationService";
import { axiosGet } from "../../services/AxiosRequests";

const HomeScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [providers, setProviders] = useState([]);
  const [providerSearched, setProviderSearched] = useState();
  const [search, setSearch] = useState("");
  const [coupon, setCoupon] = useState("");

  const getNearProviders = async () => {
    let payload = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    let response = await axios.post(
      `${ServerIP}/api/v1/guest/lookup/nearproviders`,
      payload
    );
    if (response.status === 200) {
      setProviders(response?.data?.Message);
      setProviderSearched(response?.data?.Message);
    }
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

    (async () => {
      let lastCoupon = await axiosGet("/api/v1/client/coupon/last");
      console.log(lastCoupon.coupon[0]);
      if (lastCoupon.coupon?.length > 0) setCoupon(lastCoupon?.coupon[0]);
    })();
  }, []);

  useEffect(() => {
    if (coupon) {
      schedulePushNotification({
        content: {
          title: coupon?.coupon_name,
          body: `Here is the new coupon you can get now a ${coupon?.discount_percentage}% on you orders, just order now`,
        },
        trigger: { seconds: 2 },
      });
    }
  }, [coupon]);

  useEffect(() => {
    if (location) {
      getNearProviders();
      setLoading(false);
    }
  }, [location]);

  const updateSearch = (text) => {
    setSearch(text);
    if (search.length > 0) {
      setProviderSearched(
        providerSearched?.filter((i) => {
          if (i.name.toLowerCase().includes(text.toLowerCase())) return i;
        })
      );
    } else {
      setProviderSearched(providers);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Loading />
      </View>
    );
  } else {
    return (
      <>
        <View style={{ height: 10 }}>
          <SearchBar
            lightTheme={true}
            round={true}
            placeholder="Search for specific provider name"
            value={search}
            onChangeText={(text) => updateSearch(text)}
          />
        </View>
        <ScrollView style={{ top: "5%", marginBottom: "30%" }}>
          {providers &&
            providerSearched?.map((item, index) => {
              return (
                <Card
                  key={index}
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      textAlign: "center",
                      fontSize: 20,
                      marginBottom: 10,
                    }}
                  >
                    {item.name}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ProviderProfile", {
                        params: {
                          id: item.id,
                        },
                      })
                    }
                    style={{ flexDirection: "row" }}
                  >
                    <Image
                      source={{ uri: `${ServerIP}${item.logo}` }}
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 5,
                        marginLeft: "2%",
                      }}
                    />
                    <View style={{ marginLeft: "10%", paddingTop: "1%" }}>
                      <Text>provider_type : {item.provider_type}</Text>
                      <Text>delivery_fee : {item.delivery_fee}</Text>
                      <Text>minimum_order : {item.minimum_order}</Text>
                      <Text>opening_hour : {item.opening_hour}</Text>
                      <Text>closing_hour : {item.closing_hour}</Text>
                      <Text>delivery_time : {item.delivery_time}</Text>
                    </View>
                  </TouchableOpacity>
                </Card>
              );
            })}
        </ScrollView>
      </>
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
