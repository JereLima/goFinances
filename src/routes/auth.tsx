import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SigIn from "../screens/SigIn";

const { Navigator, Screen } = createStackNavigator();

const Auth = () => {
  return (
    <Navigator>
      <Screen name="Login" component={SigIn} options={{ headerShown: false }} />
    </Navigator>
  );
};

export default Auth;
