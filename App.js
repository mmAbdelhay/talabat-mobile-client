import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./navigation/DrawerContent";
import ButtomTab from "./navigation/ButtomTab";
import SingInScreen from "./views/Login/SignInScreen";
import SingUpScreen from "./views/Singup/SignUpScreen";
import SplashScreen from "./views/Splash/SplashScreen";
import { getTokenWithSavedPayload } from "./services/getTokenWithSavedPayload";
import { axiosGet } from "./services/AxiosRequests";
import ContactUsStackScreen from "./views/ContactUs/ContactUsStackScreen";
import AccountStackScreen from "./views/Acoount/AccountStackScreen";
import ProviderProfileStackScreen from "./views/ProviderProfile/ProviderProfileStackScreen";

const Drawer = createDrawerNavigator();

export default function App({ route, navigation }) {
  const [token, setToken] = useState("");
  const [client, setClient] = useState();

  useEffect(() => {
    async function checkToken() {
      let getToken = await getTokenWithSavedPayload();
      if (getToken?.length > 0) setToken(getToken);
    }
    checkToken();
    clientInfo();
  }, []);

  const clientInfo = async () => {
    let client = await axiosGet("/api/v1/client/info");
    if (client) setClient(client?.client);
  };

  if (token.length > 0) {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => (
            <DrawerContent client={client} {...props} />
          )}
        >
          <Drawer.Screen name="Home" component={ButtomTab} />
          <Drawer.Screen name="ContactUs" component={ContactUsStackScreen} />
          <Drawer.Screen name="Account" component={AccountStackScreen} />
          <Drawer.Screen
            name="ProviderProfile"
            component={ProviderProfileStackScreen}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Splash">
          <Drawer.Screen name="Splash" component={SplashScreen} />
          <Drawer.Screen name="Login" component={SingInScreen} />
          <Drawer.Screen name="Register" component={SingUpScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
