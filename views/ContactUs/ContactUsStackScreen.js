import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import ContactUs from "./ContactUs";

const ContactUsStack = createStackNavigator();

export default function ContactUsStackScreen({ navigation }) {
  return (
    <ContactUsStack.Navigator
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
      <ContactUsStack.Screen
        name="Contact us"
        component={ContactUs}
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
    </ContactUsStack.Navigator>
  );
}
