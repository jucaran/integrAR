import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import TeacherListCourses from "../../screens/Teacher/TeacherListCourses"
import TeacherListStudents from "../../screens/Teacher/TeacherListStudents"
import TeacherListSubjects from "../../screens/Teacher/TeacherListStudents"
import StudentDetail from "../../screens/Teacher/StudentDetail"

const Stack = createStackNavigator();
export default function TechersHomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00aadd",
        },
        headerTintColor: "#fff",
        title: "integrAR",
        headerTitleStyle: {
          fontSize: 20,
          // fontFamily: "roboto",
        },
      }}
      // initialRouteName={""}
    >
      <Stack.Screen name="ListStudents_Teacher" component={TeacherListStudents}
      />
      <Stack.Screen name="TeacherListCourses" component={TeacherListCourses} />
      <Stack.Screen name="TeacherListSubjects" component={TeacherListSubjects} />
      <Stack.Screen name="StudentDetail_Teacher" component={StudentDetail} />
    </Stack.Navigator>
  );
}
