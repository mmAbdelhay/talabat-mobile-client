import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "./SignInScreen";

const SingInStack = createStackNavigator();

export default function SingInStackScreen({ navigation }) {
  return (
    <SingInStack.Navigator
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
      <SingInStack.Screen
        name="Login"
        component={SignInScreen}
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
    </SingInStack.Navigator>
  );
}
