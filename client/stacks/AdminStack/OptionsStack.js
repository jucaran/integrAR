import { createStackNavigator } from "@react-navigation/stack";
import Options from "../../Screens/OptionsScreen";
import React from "react";
import Test2 from "../../Screens/Test2";
// import Test from "../../Screens/Test";
const Stack = createStackNavigator();
export default function OptionsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00aadd",
        },
        title: "integrAR",
        headerTintColor: '#fff',
      }}
      initialRouteName={"Options"}
    >
      <Stack.Screen name="Options" component={Options} />
      {/* <Stack.Screen name="Test" component={Test} /> */}
      <Stack.Screen name="Test2" component={Test2} />
    </Stack.Navigator>
  );
}
