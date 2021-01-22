import React from "react";
import CartScreen from "./CoursesScreen";
import HistoryScreen from "./TasksScreen";
import HomeScreen from "./HomeScreen";
import Options from "./OptionsScreen";
import Icon from "react-native-vector-icons/Ionicons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { View } from "react-native";

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
        component={HomeScreen}
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
        component={HistoryScreen}
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
        component={CartScreen}
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
        component={Options}
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
