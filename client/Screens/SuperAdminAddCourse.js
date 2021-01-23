import React, { useState } from 'react';
import { Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity 
} from "react-native";
import CenterView from "../../utils/CenterView";

const AddCourseScreen = ({navigation}) => {
  const [inputs, setInputs] = useState({
    grado: '',
    curso: '',
  })

const handleChange = (text, input) => {
  setInputs({
    ...inputs,
    [input]: text,
  })
}

return(
  <CenterView>
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
      <Text  style={styles.description} >Curso</Text>
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
      onPress={() => navigation.navigate("AgregarMaterias")}>
        <Text style={styles.textButton}>Agregar</Text>
    </TouchableOpacity>
  </CenterView>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    fontSize: 25,
    color: "#000000",
    marginBottom: 2,
  },
  input: {
    padding: 5,
    width: 250,
    height: 50,
    borderColor: "#2290CD",
    borderWidth: 2,
    marginBottom: 60
  },
  button: { 
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
  textButton: {
    fontSize: 20,
    color: "white"
  }
})

export default AddCourseScreen