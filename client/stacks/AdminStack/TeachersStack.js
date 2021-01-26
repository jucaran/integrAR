import { createStackNavigator } from "@react-navigation/stack";
import SuperAdminListTeachers from "../../screens/SuperAdminListTeachers";
import React from "react";

const Stack = createStackNavigator();
export default function TeachersStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00aadd",
        },
        title: "integrAR",
        headerTintColor: '#fff',
      }}
      initialRouteName={"SuperAdminListTeachers"}
    >
      <Stack.Screen name="SuperAdminListTeachers" component={SuperAdminListTeachers} />
    </Stack.Navigator>
  );
}
