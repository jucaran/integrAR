import React, { useState } from "react";
import { TouchableHighlight,
  StyleSheet, 
  Text,
  View,
  TextInput
} from "react-native";
import CheckBox from "@react-native-community/checkbox"; //importar npm install @react-native-community/checkbox --save
import CenterView from "../../utils/CenterView";

let profesores = [{'Nombre': 'Carlos', 'Apellido': 'Fila'}, {'Nombre': 'Ana', 'Apellido': 'González'}, {'Nombre': 'José', 'Apellido': 'Rosas'},{'Nombre': 'Leila', 'Apellido': 'Núñez'}, {'Nombre': 'Franco', 'Apellido': 'Fontana'}, {'Nombre': 'Luisina', 'Apellido': 'Añon'},{'Nombre': 'María', 'Apellido': 'Frank'}, {'Nombre': 'Luis', 'Apellido': 'Bono'}, {'Nombre': 'Sebastian', 'Apellido': 'Rama'}]
const AddSubjectScreen = ({navigation}) => {
  const [inputs, setInputs] = useState({
    materia: '',   
  })
  const [check, setCheck] = useState(false);

const handleChange = (text, input) => {
  setInputs({
    ...inputs,
    [input]: text,
  })
}

return(
  <CenterView>
    <Text 
        style={styles.title}>
          AGREGAR MATERIA
      </Text>
    <View>
    <Text style={styles.description}>Materia</Text>
    <TextInput
      style={styles.input}
      placeholder="Materia..."
      value={inputs.materiaInput}
      onChangeText={(text) => handleChange(text, "grado")}
    />
    </View>
    <View>
    <Text  style={styles.description} >Agregar Profesor</Text>
    </View>
    {profesores.map((profesor, i) => {return (
    <View style={styles.checkboxContainer}>
    <CheckBox
      key={i}
      disabled={false}
      value={check}
      onValueChange={() => setCheck(!check)}
      style={styles.checkbox}
    />
    <Text style={styles.label}>{profesor.Nombre} + ' ' + {profesor.Apellido}</Text>
    </View>
    )})} 

    <TouchableHighlight 
      activeOpacity={0.8}
      underlayColor="lightblue"
      style={styles.button} 
      onPress={() => navigation.navigate("AgregarAlumnosPorCurso")}>
        <Text style={styles.textButton}>AGREGAR</Text>
    </TouchableHighlight>
  </CenterView>
  )
}

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
    marginLeft: 2
  },
  input: {
    padding: 5,
    width: 237,
    height: 50,
    borderColor: "#2290CD",
    borderWidth: 2,
    marginBottom: 60
  },
  button: { 
    margin: 15, 
    backgroundColor: "#006DEE",
    justifyContent: "center",
    alignItems: "center",
    width: 237,
    height: 50,
    padding: 7,
    borderRadius: 7
  },
  textButton: {
    fontSize: 20,
    color: "white"
  },
   checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
})

export default AddSubjectScreen