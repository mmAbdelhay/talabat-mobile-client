import React from "react";
import { SafeAreaView, Text, Image } from "react-native";

const OrderScreen = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Image
        source={require("../../assets/imgs/order-now.jpg")}
        style={{ width: 500, height: 500 }}
      />
    </SafeAreaView>
  );
};

export default OrderScreen;
