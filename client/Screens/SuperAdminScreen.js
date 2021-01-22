import React from "react";
import { View, Text, TouchableOpacity, TouchableHighlight } from "react-native";

export default function SuperAdminView() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hola Admin!</Text>
      <TouchableHighlight style={styles.touchAdd} onPress>
        <Text style={styles.touchText}>Agregar Curso</Text>
      </TouchableHighlight>
      <TouchableOpacity style={styles.touch} onPress>
        <Text style={styles.touchText}>Ver Cursos</Text>
      </TouchableOpacity>
      <TouchableHighlight style={styles.touchAdd} onPress>
        <Text style={styles.touchText}>Agregar Materia</Text>
      </TouchableHighlight>
      <TouchableOpacity style={styles.touch} onPress>
        <Text style={styles.touchText}>Ver Materias</Text>
      </TouchableOpacity>
      <TouchableHighlight style={styles.touchAdd} onPress>
        <Text style={styles.touchText}>Agregar Profesor</Text>
      </TouchableHighlight>
      <TouchableOpacity style={styles.touch} onPress>
        <Text style={styles.touchText}>Ver Profesor</Text>
      </TouchableOpacity>
      <TouchableHighlight style={styles.touchAdd} onPress>
        <Text style={styles.touchText}>Agregar Alumno</Text>
      </TouchableHighlight>
      <TouchableOpacity style={styles.touch} onPress>
        <Text style={styles.touchText}>Ver Alumnos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 30, color: "#fff" },
  touchAdd: {backgroundColor: "red", activeOpacity=0.6, underlayColor="#DDDDDD"},
  touch: { margin: 10, backgroundColor: "blue", padding: 7, borderRadius: 10 },
  touchText: { color: "white" },
});
