import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EditStudentScreen from "../../Screens/SuperAdmin/EditStudentScreen";
import SuperAdminListStudents from "../../screens/SuperAdminListStudents";
import AddStudentScreen from "../../Screens/SuperAdmin/AddStudentScreen";

const Stack = createStackNavigator();

export default function StudentStack() {
    return (
        <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00aadd",
        },
        title: "integrAR",
        headerTintColor: "#fff",
      }}
      initialRouteName={"ListStudents"}
      >
      <Stack.Screen name="ListStudents" component={SuperAdminListStudents} />
      <Stack.Screen name="EditStudent" component={EditStudentScreen} />
      <Stack.Screen name="AddStudent" component={AddStudentScreen} />
    </Stack.Navigator>
    )
}