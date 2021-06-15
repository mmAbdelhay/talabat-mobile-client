import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SearchBar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function Header(props) {
  console.log(props);
  const navigation = useNavigation();
  return (
    <View>
      <View style={{ flexDirection: "row", height: 30, marginTop: "2%" }}>
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: "7%",
            justifyContent: "center",
          }}
          onPress={() => navigation.navigate("Home")}
        >
          <Image
            source={require("../../assets/imgs/back.png")}
            resizeMode="contain"
            style={{
              width: 23,
              height: 23,
            }}
          />
        </TouchableOpacity>

        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View
            style={{
              width: "70%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{props?.name}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: "5%",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../../assets/imgs/shopping-basket.png")}
            resizeMode="contain"
            style={{
              width: 23,
              height: 23,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
