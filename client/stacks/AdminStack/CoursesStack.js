import { createStackNavigator } from "@react-navigation/stack";
import Test from "../../screens/Test";
import GradesScreen from "../../screens/GradesScreen";
import React from "react";
import SuperAdminListCourses from "../../screens/SuperAdminListCourses";
import SuperAdminAddGrade from "../../screens/SuperAdminAddGrade";
import SuperAdminListSubjects from "../../screens/SuperAdminListSubjects";
import SuperAdminAddCourse from "../../screens/SuperAdminAddCourse";
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
          // fontFamily: "roboto",
        },
      }}
      initialRouteName="GradesScreen"
    >
      <Stack.Screen name="GradesScreen" component={GradesScreen} />
      <Stack.Screen
        name="SuperAdminListCourses"
        component={SuperAdminListCourses}
      />
      <Stack.Screen
        name="SuperAdminListSubjects"
        component={SuperAdminListSubjects}
      />
      <Stack.Screen name="SuperAdminAddGrade" component={SuperAdminAddGrade} />
      <Stack.Screen
        name="SuperAdminAddCourse"
        component={SuperAdminAddCourse}
      />
      <Stack.Screen
        name="SuperAdminAddSubject"
        component={SuperAdminAddSubject}
      />
    </Stack.Navigator>
  );
}
