import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddStudentScreen from "../../Screens/SuperAdmin/AddStudentScreen";
import AddTeacherScreen from "../../Screens/SuperAdmin/AddTeacherScreen";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function AddUserStack() {
    return ( 
        <NavigationContainer>
        <Stack.Navigator
        initialRouteName="AddStudent"
        >
            <Stack.Screen
                name="AddStudent" component={AddStudentScreen}
            />
            <Stack.Screen
                name="AddTeacher" component={AddTeacherScreen}
            />
        </Stack.Navigator>
        </NavigationContainer>
    )
} 