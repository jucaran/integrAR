import { createStackNavigator } from "@react-navigation/stack";
import TasksScreen from "../../Screens/TasksScreen";
import React from "react";

const Stack = createStackNavigator();
export default function TasksStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00aadd",
        },
        title: "integrAR",
      }}
      initialRouteName="TasksScreen"
    >
      <Stack.Screen name="TasksScreen" component={TasksScreen} />
    </Stack.Navigator>
  );
}
