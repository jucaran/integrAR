import React, { useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import CenterView from "../utils/CenterView";

const AddCourseScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    grado: "",
    curso: "",
  });

  const handleChange = (text, input) => {
    setInputs({
      ...inputs,
      [input]: text,
    });
  };

  return (
    <CenterView>
      <Text style={styles.title}>AGREGAR CURSO</Text>
      <View>
        <Text style={styles.description}>Año</Text>
        <TextInput
          style={styles.input}
          placeholder="Año..."
          value={inputs.gradoInput}
          onChangeText={(text) => handleChange(text, "grado")}
        />
      </View>
      <View>
        <Text style={styles.description}>Curso</Text>
        <TextInput
          style={styles.input}
          placeholder="Curso..."
          value={inputs.cursoInput}
          onChangeText={(text) => handleChange(text, "curso")}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        underlayColor="lightblue"
        style={styles.button}
        onPress={() => navigation.navigate("AgregarMateriaPorCurso")}
      >
        <Text style={styles.textButton}>AGREGAR</Text>
      </TouchableOpacity>
    </CenterView>
  );
};

const styles = StyleSheet.create({
  title: {
    //fontFamily: 'roboto',
    fontSize: 25,
    color: "#000000",
    marginBottom: 45,
  },
  description: {
    //fontFamily: 'roboto',
    fontSize: 20,
    color: "#000000",
    marginBottom: 2,
    marginLeft: 2,
  },
  input: {
    padding: 5,
    width: 237,
    height: 50,
    borderColor: "#2290CD",
    borderWidth: 2,
    marginBottom: 60,
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
    // fontFamily: 'roboto',
    fontSize: 16,
    color: "white",
  },
});

export default AddCourseScreen;
