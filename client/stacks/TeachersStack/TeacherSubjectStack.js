import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import TeacherListSubjects from "../../screens/Teacher/TeacherListSubjects"
import TeacherListModules from "../../screens/Teacher/TeacherListModules"
import AddUnitToSubject from "../../screens/Teacher/AddUnitToSubject"
import TeacherListClasses from "../../screens/Teacher/TeacherListClasses"

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
      <Stack.Screen name="TeacherListModules" component = {TeacherListModules} />
      <Stack.Screen name="AddUnitToSubject" component = {AddUnitToSubject} />
      <Stack.Screen name="TeacherListClasses" component = {TeacherListClasses} />
      
    </Stack.Navigator>
  );
}


// subject -> modules -> classes