import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { View } from "react-native";
import CoursesStack from "./Stacks/CoursesStack";
import HomeStack from "./Stacks/HomeStack";
import OptionsStack from "./Stacks/OptionsStack";
import TasksStack from "./Stacks/TasksStack";
const Tab = createMaterialBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      activeColor="#f0edf6"
      inactiveColor="#e22882"
      barStyle={{ backgroundColor: "#159aed" }}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeStack}
        options={{
          tabBarIcon: () => {
            return (
              <View>
                <Icon name={"ios-home-outline"} size={25} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Tareas"
        component={TasksStack}
        options={{
          tabBarIcon: () => {
            return (
              <View>
                <Icon name={"ios-clipboard-outline"} size={25} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Cursos"
        component={CoursesStack}
        options={{
          tabBarIcon: () => {
            return (
              <View>
                <Icon name={"ios-school-outline"} size={25} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Opciones"
        component={OptionsStack}
        options={{
          tabBarIcon: () => {
            return (
              <View>
                <Icon name={"ios-settings-outline"} size={25} />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
