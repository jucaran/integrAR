import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import TeacherListSubjects from "../../screens/Teacher/TeacherListSubjects"
import TeacherListModules from "../../screens/Teacher/TeacherListModules"
import AddModuleToSubject from "../../screens/Teacher/AddModuleToSubject"
import TeacherListClasses from "../../screens/Teacher/TeacherListClasses"
import AddClassToModule from "../../screens/Teacher/AddClassToModule"
import ClassDetail from "../../screens/Teacher/ClassDetail"

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
      <Stack.Screen name="AddModuleToSubject" component = {AddModuleToSubject} />
      <Stack.Screen name="TeacherListClasses" component = {TeacherListClasses} />
      <Stack.Screen name="AddClassToModule" component = {AddClassToModule} />
      <Stack.Screen name="ClassDetail" component = {ClassDetail} />
      
    </Stack.Navigator>
  );
}


// subject -> modules -> classes