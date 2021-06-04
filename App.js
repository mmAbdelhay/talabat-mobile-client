import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./navigation/DrawerContent";
import ButtomTab from "./navigation/ButtomTab";
import { getData } from "./services/AsyncStorage";
import SingInScreen from "./views/Login/SignInScreen";
import SingUpScreen from "./views/Singup/SignUpScreen";
import SplashScreen from "./views/Splash/SplashScreen";

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
          <Drawer.Screen name="Splash" component={SplashScreen} />
          <Drawer.Screen name="Login" component={SingInScreen} />
          <Drawer.Screen name="Register" component={SingUpScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
