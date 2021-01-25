import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../../Screens/Auth/Login";
import ResetPassScreen from "../../Screens/Auth/ResetPass";
import MailSentScreen from "../../Screens/Auth/MailSent";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        header: () => null,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ResetPass" component={ResetPassScreen} />
      <Stack.Screen name="MailSent" component={MailSentScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
