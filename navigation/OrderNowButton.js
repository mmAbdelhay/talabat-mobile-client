import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";

const OrderNowButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        top: -10,
        justifyContent: "center",
        alignItems: "center",
        ...styles.shaddow,
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 35,
          backgroundColor: "#007cff",
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};

export default OrderNowButton;

const styles = StyleSheet.create({
  shaddow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.5,
    elevation: 3,
  },
});
