import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import React from "react";
import { Provider } from "react-redux";
import store from "./services/store";

import App from "./App";

export default function MainApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(MainApp);
