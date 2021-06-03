import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./navigation/DrawerContent";
import ButtomTab from "./navigation/ButtomTab";
import { getData } from "./services/AsyncStorage";
import SingInStackScreen from "./views/Login/SignInStackScreen";
import SingUpStackScreen from "./views/Singup/SignUpStackScreen";

const Drawer = createDrawerNavigator();

export default function App({ navigation }) {
  const [token, setToken] = useState("");

  useState(async () => {
    const tokenFromService = await getData("token");
    if (tokenFromService.length > 0) setToken(tokenFromService);
  }, []);

  if (token.length > 0) {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {...props} />}
        >
          <Drawer.Screen name="Home" component={ButtomTab} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Login" component={SingInStackScreen} />
          <Drawer.Screen name="Register" component={SingUpStackScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
