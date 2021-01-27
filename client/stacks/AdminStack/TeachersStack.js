import { createStackNavigator } from "@react-navigation/stack";
import SuperAdminListTeachers from "../../screens/SuperAdminListTeachers";
import React from "react";
import EditTeacherScreen from "../../screens/SuperAdmin/EditTeacherScreen";
import AddTeacherScreen from "../../screens/SuperAdmin/AddTeacherScreen";

import EditStudentScreen from "../../Screens/SuperAdmin/EditStudentScreen";
import SuperAdminListStudents from "../../screens/SuperAdminListStudents";
import AddStudentScreen from "../../Screens/SuperAdmin/AddStudentScreen";

const Stack = createStackNavigator();
//Combinado temporalmente student y teacher en un solo stack
export default function TeachersStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00aadd",
        },
        title: "integrAR",
        headerTintColor: "#fff",
      }}
      // initialRouteName={"SuperAdminListTeachers"}
    >
      <Stack.Screen
        name="SuperAdminListTeachers"
        component={SuperAdminListTeachers}
      />
      <Stack.Screen name="EditTeacher" component={EditTeacherScreen} />
      <Stack.Screen name="AddTeacher" component={AddTeacherScreen} />
      <Stack.Screen name="ListStudents" component={SuperAdminListStudents} />
      <Stack.Screen name="EditStudent" component={EditStudentScreen} />
      <Stack.Screen name="AddStudent" component={AddStudentScreen} />
    </Stack.Navigator>
  );
}
