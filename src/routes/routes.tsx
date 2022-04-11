import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/Dashboard";
import Register from "../screens/Register";
import IconTab from "@expo/vector-icons/MaterialIcons";
import theme from "../global/styles/theme";
import { useTheme } from "styled-components";
import { Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Resume from "../screens/Resume";

const { Navigator, Screen } = createBottomTabNavigator();

const AppRoutes = () => {
  const theme = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: "beside-icon",
        tabBarStyle: {
          height: RFValue(60),
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
        },
      }}
    >
      <Screen
        name="Listagem"
        component={Dashboard}
        options={{
          tabBarIcon: ({ size, color }) => (
            <IconTab name="format-list-bulleted" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="Cadastrar"
        component={Register}
        options={{
          tabBarIcon: ({ size, color }) => (
            <IconTab name="attach-money" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="Resumo"
        component={Resume}
        options={{
          tabBarIcon: ({ size, color }) => (
            <IconTab name="pie-chart" size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
};

export { AppRoutes };
