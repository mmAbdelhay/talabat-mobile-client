import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import ProviderProfile from "./ProviderProfile";

const ProviderProfileStack = createStackNavigator();

export default function ProviderProfileStackScreen({ route, navigation }) {
  return (
    <ProviderProfileStack.Navigator
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
      <ProviderProfileStack.Screen
        name="Provider profile"
        initialParams={route.params}
        component={ProviderProfile}
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
    </ProviderProfileStack.Navigator>
  );
}
