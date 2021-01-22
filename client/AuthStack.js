import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Screens/Auth/Login";

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
      {/* <AuthStack.Screen name="Register" component={RegisterScreen} /> */}
      {/* <AuthStack.Screen name="ResetPass" component={ResetPassScreen} /> */}
    </Stack.Navigator>
  );
};

export default AuthStack;
