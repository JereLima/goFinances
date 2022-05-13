import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../hooks/auth";
import Auth from "./auth";
import AppRoutes from "./routes";

const Routes = () => {
  const { user } = useAuth();
  console.log("##", user);
  return (
    <NavigationContainer>
      {!user.id ? <Auth /> : <AppRoutes />}
    </NavigationContainer>
  );
};

export default Routes;
