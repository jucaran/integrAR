import { createStackNavigator } from "@react-navigation/stack";
import Test from "../../screens/Test";
import GradesScreen from "../../screens/GradesScreen";
import React from "react";
import SuperAdminListCourses from "../../screens/SuperAdminListCourses";
import SuperAdminAddSubject from "../../screens/SuperAdminAddSubject";

const Stack = createStackNavigator();
export default function CoursesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00aadd",
        },
        title: "integrAR",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: "roboto",
        },
      }}
      initialRouteName="GradesScreen"
    >
       <Stack.Screen
        name="GradesScreen"
        component={GradesScreen}
      />
      <Stack.Screen
        name="SuperAdminListCourses"
        component={SuperAdminListCourses}
      />
      <Stack.Screen name="Courses" component={SuperAdminAddSubject} />
      {/* <Stack.Screen name="Courses" component={CoursesScreen} /> */}
    </Stack.Navigator>
  );
}
