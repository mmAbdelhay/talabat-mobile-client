import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackScreen from "../views/Home/HomeStackScreen";
import SignInStackScreen from "../views/Login/SignInStackScreen";
import OrderScreen from "../views/Order/OrderScreen";
import OrderNowButton from "./OrderNowButton";

const Tab = createBottomTabNavigator();

export default function ButtomTab() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: "absolute",
          bottom: 10,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#fff",
          borderRadius: 15,
          height: 70,
          ...styles.shaddow,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 5,
                width: 35,
              }}
            >
              <Image
                source={require("../assets/icons/home-icon.png")}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#3491bc" : "#777777",
                }}
              />
              <Text
                style={{
                  color: focused ? "#000000" : "#777777",
                  fontSize: focused ? 15 : 12,
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Order"
        component={OrderScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/icons/Order.png")}
              resizeMode="contain"
              style={{
                width: 60,
                height: 60,
                tintColor: "#fff",
              }}
            />
          ),
          tabBarButton: (props) => <OrderNowButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Login"
        component={SignInStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 5,
                width: 35,
              }}
            >
              <Image
                source={require("../assets/icons/login.png")}
                style={{
                  width: 40,
                  height: 30,
                  tintColor: focused ? "#3491bc" : "#777777",
                }}
              />
              <Text
                style={{
                  fontSize: focused ? "#000000" : "#777777",
                  fontSize: focused ? 15 : 12,
                }}
              >
                Login
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shaddow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
