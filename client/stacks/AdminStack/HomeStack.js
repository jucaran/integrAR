import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../Screens/HomeScreen";
import React from "react";
import SuperAdminListStudents from "../../Screens/SuperAdminListStudents";

const Stack = createStackNavigator();
export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00aadd",
        },
        title: "integrAR",
      }}
      initialRouteName={"SuperAdminListStudents"}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="SuperAdminListStudents"
        component={SuperAdminListStudents}
      />
    </Stack.Navigator>
  );
}
