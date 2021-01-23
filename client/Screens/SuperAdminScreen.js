import React from "react";
import { Text, 
  TouchableHighlight 
        } from "react-native";
import CenterView from "../../utils/CenterView";

const SuperAdminView = ({navigation}) => {
  return (
    <CenterView>
            <Text 
      style={styles.title}>
        Hola Admin!
      </Text>
      <TouchableHighlight
        activeOpacity={0.8}
        underlayColor="lightblue"
        style={styles.touchSee}
        onPress={() => navigation.navigate("VerCursos")}>
          <Text style={styles.touchText}>Ver Cursos</Text>
      </TouchableHighlight>
      <TouchableHighlight
        activeOpacity={0.8}
        underlayColor="pink"
        style={styles.touchAdd}
        onPress={() => navigation.navigate("AgregarCurso")}>
          <Text style={styles.touchText}>Agregar Curso</Text>
      </TouchableHighlight>
      <TouchableHighlight
        activeOpacity={0.8}
        underlayColor="pink"
        style={styles.touchAdd}
        onPress={() => navigation.navigate("AgregarMateria")}>
          <Text style={styles.touchText}>Agregar Materia</Text>
      </TouchableHighlight>
      <TouchableHighlight
        activeOpacity={0.8}
        underlayColor="pink"
        style={styles.touchAdd} 
        onPress={() => navigation.navigate("AgregarProfesor")}>
          <Text style={styles.touchText}>Agregar Profesor</Text>
      </TouchableHighlight>
      <TouchableHighlight 
        activeOpacity={0.8}
        underlayColor="pink"
        style={styles.touchAdd} 
        onPress={() => navigation.navigate("AgregarAlumno")}>
          <Text style={styles.touchText}>Agregar Alumno</Text>
      </TouchableHighlight>
    </CenterView>
  );
}

const styles = StyleSheet.create({
  title: { 
    fontSize: 30,
    color: "#000000",
    marginBottom: 25,
  },
  touchSee: {
    margin: 15, 
    width: 150,
    backgroundColor: "#006DEE",
    justifyContent: "center",
    alignItems: "center",
    width: 170,
    height: 50,
    padding: 7,
    borderRadius: 5
  },
  touchAdd: {
    margin: 10,
    width: 170,
    height: 50,
    backgroundColor: "#EE0000",
    justifyContent: "center",
    alignItems: "center",
    padding: 7,
    borderRadius: 5
  },
  touchText: {
    fontSize: 20,
    color: "white"
  },
});


export default SuperAdminView