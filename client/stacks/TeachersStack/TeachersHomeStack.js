import { createStackNavigator } from "@react-navigation/stack";
import React from "react";


const Stack = createStackNavigator();
export default function TechersHomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00aadd",
        },
        headerTintColor: "#fff",
        title: "integrAR",
        headerTitleStyle: {
          fontSize: 20,
          // fontFamily: "roboto",
        },
      }}
      initialRouteName={""}
    >
      <Stack.Screen name="" component={}
      />
      <Stack.Screen name="" component={} />
    </Stack.Navigator>
  );
}
