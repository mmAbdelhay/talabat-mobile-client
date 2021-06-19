import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import AllOrders from "./allOrders";

const AllOrderStack = createStackNavigator();

export default function AllOrderStackScreen({ navigation }) {
  return (
    <AllOrderStack.Navigator
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
      <AllOrderStack.Screen
        name="All Orders"
        component={AllOrders}
        options={{
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#007cff"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
        }}
      />
    </AllOrderStack.Navigator>
  );
}
