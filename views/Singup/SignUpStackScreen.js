import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpScreen from "./SignUpScreen";

const SingInStack = createStackNavigator();

export default function SingUpStackScreen({ navigation }) {
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
        name="Signup"
        component={SignUpScreen}
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
