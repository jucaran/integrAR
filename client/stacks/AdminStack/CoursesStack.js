import { createStackNavigator } from "@react-navigation/stack";
import CoursesScreen from "../../Screens/CoursesScreen";
import React from "react";
import SuperAdminListCourses from "../../Screens/SuperAdminListCourses";
import Test from "../../Screens/Test";
const Stack = createStackNavigator();

export default function CoursesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00aadd",
        },
        title: "integrAR",
      }}
      initialRouteName="SuperAdminListCourses"
    >
      <Stack.Screen
        name="SuperAdminListCourses"
        component={SuperAdminListCourses}
      />
      <Stack.Screen name="Test" component={Test} />
      <Stack.Screen name="Courses" component={CoursesScreen} />
    </Stack.Navigator>
  );
}
