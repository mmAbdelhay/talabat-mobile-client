import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import Cart from "./Cart";

const CartStack = createStackNavigator();

export default function CartStackScreen({ route, navigation }) {
  return (
    <CartStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#007cff",
        },
        headerTintColor: "#fff",
        headerTintStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <CartStack.Screen
        name="Cart"
        component={Cart}
        options={{
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#007cff"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerRight: () => (
            <Icon.Button
              name="arrow-back-outline"
              size={25}
              backgroundColor="#007cff"
              onPress={() => navigation.goBack()}
            ></Icon.Button>
          ),
        }}
      />
    </CartStack.Navigator>
  );
}
