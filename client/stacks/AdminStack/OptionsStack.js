import { createStackNavigator } from "@react-navigation/stack";
import Options from "../../screens/OptionsScreen";
import React from "react";
import Test2 from "../../screens/Test2";
import Test from "../../screens/Test";
const Stack = createStackNavigator();
export default function OptionsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00aadd",
        },
        title: "integrAR",
      }}
      initialRouteName={"Options"}
    >
      <Stack.Screen name="Options" component={Options} />
      <Stack.Screen name="Test" component={Test} />
      <Stack.Screen name="Test2" component={Test2} />
    </Stack.Navigator>
  );
}
