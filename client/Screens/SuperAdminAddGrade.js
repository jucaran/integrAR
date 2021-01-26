import React, { useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import CenterView from "../utils/CenterView";
import { useMutation, gql } from "@apollo/client";

const CREATE_GRADE = gql`
  mutation CreateGrade( $input: GradeInput) {
    createGrade(input: $input) {
      name
    }
  }
`;

const AddCourseScreen = ({ navigation }) => {
  const [createGrade, { data, error }] = useMutation(CREATE_GRADE);
  const [inputs, setInputs] = useState({
    grade: "",
  });

  const handleChange = (text, input) => {
    setInputs({
      ...inputs,
      [input]: text,
    });
  }

  const handleSubmit = async (name) => {
    try { 
      console.log(name)
      await createGrade({
      variables: { input: { name } },
    })}
    catch (error) {
      console.log(error);
      return false;
    }
  
  }  
  

  return (
    <CenterView>
      <Text style={styles.title}>AGREGAR AÑO</Text>
      <View>
        <Text style={styles.description}>Año</Text>
        <TextInput
          style={styles.input}
          placeholder="Año..."
          value={inputs.gradeInput}
          onChangeText={(text) => handleChange(text, "grade")}
        />
        {console.log(inputs)}
      </View>
      {/* <View>
        <Text style={styles.description}>Curso</Text>
        <TextInput
          style={styles.input}
          placeholder="Curso..."
          value={inputs.cursoInput}
          onChangeText={(text) => handleChange(text, "curso")}
        />
      </View> */}
      <TouchableOpacity
        activeOpacity={0.8}
        underlayColor="lightblue"
        style={styles.button}
        onPress={()=>handleSubmit(inputs.grade)}
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
