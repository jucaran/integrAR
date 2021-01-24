import React from "react";
import { Text, TouchableHighlight, StyleSheet } from "react-native";
import CenterView from "../../utils/CenterView";

const SuperAdminView = ({ navigation }) => {
  return (
    <CenterView>
      <Text style={styles.title}>HOLA ADMIN</Text>
      <TouchableHighlight
        activeOpacity={0.8}
        underlayColor="lightblue"
        style={styles.touchSee}
        onPress={() => navigation.navigate("VerCursos")}
      >
        <Text style={styles.touchText}>VER CURSOS</Text>
      </TouchableHighlight>
      <TouchableHighlight
        activeOpacity={0.8}
        underlayColor="pink"
        style={styles.touchAdd}
        onPress={() => navigation.navigate("AgregarCurso")}
      >
        <Text style={styles.touchText}>AGREGAR CURSO</Text>
      </TouchableHighlight>
      <TouchableHighlight
        activeOpacity={0.8}
        underlayColor="pink"
        style={styles.touchAdd}
        onPress={() => navigation.navigate("AgregarMateria")}
      >
        <Text style={styles.touchText}>AGREGAR MATERIA</Text>
      </TouchableHighlight>
      <TouchableHighlight
        activeOpacity={0.8}
        underlayColor="pink"
        style={styles.touchAdd}
        onPress={() => navigation.navigate("AgregarProfesor")}
      >
        <Text style={styles.touchText}>AGREGAR PROFESOR</Text>
      </TouchableHighlight>
      <TouchableHighlight
        activeOpacity={0.8}
        underlayColor="pink"
        style={styles.touchAdd}
        onPress={() => navigation.navigate("AgregarAlumno")}
      >
        <Text style={styles.touchText}>AGREGAR ALUMNO</Text>
      </TouchableHighlight>
    </CenterView>
  );
};

const styles = StyleSheet.create({
  title: {
    //fontFamily: 'roboto',
    fontSize: 25,
    color: "#000000",
    marginBottom: 25,
  },
  touchSee: {
    margin: 15,
    width: 327,
    backgroundColor: "#006DEE",
    justifyContent: "center",
    alignItems: "flex-start",
    height: 50,
    padding: 7,
    borderRadius: 7,
  },
  touchAdd: {
    margin: 10,
    width: 327,
    height: 50,
    backgroundColor: "#EE0000",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 7,
    borderRadius: 7,
  },
  touchText: {
    //fontFamily: 'roboto',
    fontSize: 16,
    color: "white",
    marginLeft: 6,
  },
});

export default SuperAdminView;
