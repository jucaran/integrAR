import React, { useState } from "react";
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  TextInput,
  Switch,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
//import CheckBox from '@react-native-community/checkbox';;
import CenterView from "../utils/CenterView";

const AddSubjectScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    materia: "",
  });
  //const [check, setCheck] = useState(false);
  //  const [isTeacher, setIsTeacher] = useState(Array.from({ length: teachers.length }, _ => false));
  //  const toggleSwitch = (index) => setIsTeacher(prev => prev.map((bool, i) => i !== index ? !bool : bool));
  let teachers = [
    { Nombre: "Carlos", Apellido: "Fila", materias: [] },
    { Nombre: "Ana", Apellido: "González", materias: [] },
    { Nombre: "José", Apellido: "Rosas", materias: [] },
    { Nombre: "Leila", Apellido: "Núñez", materias: [] },
    { Nombre: "Franco", Apellido: "Fontana", materias: [] },
    { Nombre: "Luisina", Apellido: "Añon", materias: [] },
    { Nombre: "María", Apellido: "Frank", materias: [] },
    { Nombre: "Luis", Apellido: "Bono", materias: [] },
    { Nombre: "Sebastian", Apellido: "Rama", materias: [] },
  ];

  const handleChange = (text, input) => {
    setInputs({
      ...inputs,
      [input]: text,
    });
  };

  return (
    <ScrollView>
    <CenterView>
      <Text style={styles.title}>AGREGAR MATERIA</Text>
      <View>
        <Text style={styles.description}>Materia</Text>
        <TextInput
          style={styles.input}
          placeholder="Materia..."
          value={inputs.materia}
          onChangeText={(text) => handleChange(text, "materia")}
        />
      </View>
      <View>
        <Text style={styles.description}>Agregar Profesor</Text>
      </View>
      <View style={styles.switchsCont}>
      {teachers.map((teacher, i) => {
        const [isTeacher, setisTeacher] = useState(false);
        if (teacher){
        return (
          <View key={i}  style={styles.switchsCont2}>
            <Text style={styles.switchTxt}>
              {teacher?.Nombre + ' ' +teacher?.Apellido}
            </Text>
            <Switch style={styles.switch}
              trackColor={{ false: "#767577", true: "#2290CD" }}
              thumbColor={isTeacher ? "#8FC6E4" : "#f4f3f4"}
              value={isTeacher}
              onValueChange={() => inputs?.materia ? setisTeacher((prev) => !prev) : null}
              {...isTeacher 
              ? teacher.materias.push(inputs.materia)
              : teacher.materias.pop(inputs.materia)}
              />
          </View>
        )}
      })} 
      </View>
      <TouchableHighlight
        activeOpacity={0.8}
        underlayColor="lightblue"
        style={styles.button}
        onPress={() => navigation.navigate("AgregarAlumnosPorCurso")}
      >
        <Text style={styles.textButton}>AGREGAR</Text>
      </TouchableHighlight>
    </CenterView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    //fontFamily: 'roboto',
    fontSize: 25,
    color: "#000000",
    marginBottom: 25,
    marginTop: 25
  },
  description: {
    //fontFamily: 'roboto',
    fontSize: 20,
    color: "#000000",
    marginBottom: 5,
    marginLeft: 2,
  },
  input: {
    padding: 5,
    width: 237,
    height: 50,
    borderColor: "#2290CD",
    borderWidth: 2,
    marginBottom: 40,
  },
  button: {
    margin: 15,
    backgroundColor: "#006DEE",
    justifyContent: "center",
    alignItems: "center",
    width: 237,
    height: 50,
    padding: 7,
    borderRadius: 7,
  },
  textButton: {
    fontSize: 20,
    color: "white",
  },
  switchsCont: {
    flexDirection: "column",
    margin: 4,
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  switch: {
    marginLeft: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  switchsCont2: {
  margin: 3
    
  }
});

export default AddSubjectScreen;
