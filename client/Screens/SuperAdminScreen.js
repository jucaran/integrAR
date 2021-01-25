import React from "react";
import {
  Text,
  TouchableHighlight,
  StyleSheet,
  View,
  Image,
} from "react-native";
import CenterView from "../utils/CenterView";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const SuperAdminView = ({ navigation }) => {
  return (
    <CenterView>
      <Text style={styles.title}>¡Hola Admin! Bienvenido</Text>
      <View style={styles.cont}>
        <View style={styles.courses}>
          <Image source={require("../assets/bro.png")} style={styles.img} />
          <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="ligthgrey"
            style={styles.touch}
            onPress={() => navigation.navigate("Cursos", {screen: "SuperAdminListCourses"})}
          >
            <Text style={styles.touchText}>VER GRADOS</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.teachers}>
          <Image
            source={require("../assets/Character.png")}
            style={styles.img}
          />
          <TouchableHighlight
           activeOpacity={0.6}
           underlayColor="ligthgrey"
            style={styles.touch}
            onPress={() => navigation.navigate("Teachers", {screen: "SuperAdminListTeachers"})}
          >
            <Text style={styles.touchText}>VER PROFESORES</Text>
          </TouchableHighlight>
        </View>
      </View>
      <View style={styles.alumn}>
        <Image source={require("../assets/alumn.png")} style={styles.img} />
        <TouchableHighlight
         activeOpacity={0.6}
         underlayColor="ligthgrey"
          style={styles.touch}
          onPress={() => navigation.navigate("AgregarAlumno")}
        >
          <Text style={styles.touchText}>AGREGAR ALUMNO</Text>
        </TouchableHighlight>
      </View>
    </CenterView>
  );
};

const styles = StyleSheet.create({
  cont: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  teachers: {
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  alumn: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  courses: {
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    marginTop: 10,
    width: 156,
    height: 168,
  },
  title: {
    fontFamily: "roboto",
    fontSize: 20,
    color: "#2290CD",
    marginTop: 25,
  },
  touch: {
    margin: 15,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  touchText: {
    fontFamily: "roboto",
    fontSize: 18,
    color: "#000000",
  },
});

export default SuperAdminView;
