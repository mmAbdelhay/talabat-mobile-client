import React from "react";
import { SafeAreaView, Text, Image,View,StyleSheet,TouchableOpacity } from "react-native";

const checkOut = ({ navigation, route }) => {
  let cart  = route.params.params.cart
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      {cart.map((item) => {
            return (

              <Text>Name : {item.name}</Text>
            )})}
            <View style={styles.button}>
          <TouchableOpacity style={styles.checkOut} onPress="">
            <Text
              style={[
                styles.textCheckOut,
                {
                  color: "#fff",
                },
              ]}
            >
              pay with visa 
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.checkOut} onPress="">
            <Text
              style={[
                styles.textCheckOut,
                {
                  color: "#fff",
                },
              ]}
            >
              pay with Cash 
            </Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

export default checkOut;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    alignSelf: "center",
    width: "70%",
    marginTop: 50,
    borderRadius: 25,
    height: 50,
    backgroundColor: "#007cff",
    position: "relative",
  },
  checkOut: {
    width: "40%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textCheckOut: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
