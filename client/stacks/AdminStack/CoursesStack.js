import { createStackNavigator } from "@react-navigation/stack";
import DegreesScreen from "../../screens/DegreesScreen";
import React from "react";
import SuperAdminListCourses from "../../screens/SuperAdminListCourses";
import SuperAdminAddSubject from "../../screens/SuperAdminAddSubject"

const Stack = createStackNavigator();
export default function CoursesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00aadd",
        },
        title: "integrAR",
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: "roboto"
        },
      }}
      initialRouteName="SuperAdminListCourses"
    >
      <Stack.Screen
        name="SuperAdminListCourses"
        component={SuperAdminListCourses}
      />
      <Stack.Screen name="Courses" component={SuperAdminAddSubject} />
      {/* <Stack.Screen name="Courses" component={CoursesScreen} /> */}
    </Stack.Navigator>
  );
}
