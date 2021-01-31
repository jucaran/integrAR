import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import TeacherListSubjects from "../../screens/Teacher/TeacherListSubjects"


const Stack = createStackNavigator();
export default function TechersSubjectStack() {
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
      initialRouteName={"TeacherListSubjects"}
    >
      <Stack.Screen name="TeacherListSubjects" component={TeacherListSubjects} />

    </Stack.Navigator>
  );
}
