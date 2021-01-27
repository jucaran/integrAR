import { createStackNavigator } from "@react-navigation/stack";
import SuperAdminListTeachers from "../../screens/SuperAdminListTeachers";
import React from "react";
import EditTeacherScreen from "../../screens/SuperAdmin/EditTeacherScreen";
import AddTeacherScreen from "../../Screens/SuperAdmin/AddTeacherScreen";

const Stack = createStackNavigator();
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
      initialRouteName={"SuperAdminListTeachers"}
    >
      <Stack.Screen
        name="SuperAdminListTeachers"
        component={SuperAdminListTeachers}
      />
      <Stack.Screen name="EditTeacher" component={EditTeacherScreen} />
      <Stack.Screen name="AddTeacher" component={AddTeacherScreen} />
    </Stack.Navigator>
  );
}
