import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Card } from "react-native-elements";
import { removeFomCart } from "../../services/cartSlice";
import Icon from "react-native-vector-icons/FontAwesome";
import { ServerIP } from "../../assets/config";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const checkOut = () => {
    console.log(`checkout `);
  };

  return (
    <ScrollView>
      {cartItems.length > 0 ? (
        cartItems.map((item) => {
          return (
            <>
              <Card
                key={item?.id}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={{ uri: `${ServerIP}${item?.logo}` }}
                    style={{ height: 50, width: 50 }}
                  />
                  <View>
                    <Text>Name : {item?.name}</Text>
                    <Text>Price : {item?.price}</Text>
                    <Text>Quantity : {item?.quantity}</Text>
                  </View>
                </View>
                {item?.price > 0 && (
                  <TouchableOpacity
                    style={{ alignSelf: "flex-end" }}
                    onPress={() => dispatch(removeFomCart(item))}
                  >
                    <Icon name="minus" size={20} color="red" />
                  </TouchableOpacity>
                )}
              </Card>
            </>
          );
        })
      ) : (
        <View
          style={{ justifyContent: "center", alignItems: "center", top: 100 }}
        >
          <Image
            source={require("../../assets/imgs/empty_cart.png")}
            style={{
              width: 200,
              height: 200,
              borderRadius: 5,
            }}
          />
          <Text style={{ fontSize: 20, color: "red", fontWeight: "bold" }}>
            Your cart is empty
          </Text>
        </View>
      )}
      {cartItems.length > 0 && (
        <View style={styles.button}>
          <TouchableOpacity style={styles.checkOut} onPress={checkOut}>
            <Text
              style={[
                styles.textCheckOut,
                {
                  color: "#fff",
                },
              ]}
            >
              Check out
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

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
