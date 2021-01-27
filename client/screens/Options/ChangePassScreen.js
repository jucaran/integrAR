import React, { useState } from "react";
import { Text, TextInput, StyleSheet, Button, View } from "react-native";
import CenterView from "../../utils/CenterView";

const AddCourseScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (text, input) => {
    setInputs({
      ...inputs,
      [input]: text,
    });
  };

  return (
    <CenterView>
      <Text style={styles.title}>CAMBIAR CONTASEÑA</Text>
      <View>
        <Text style={styles.description}>Vieja contaseña:</Text>
        <TextInput
          style={styles.input}
          textContentType="password"
          secureTextEntry={true}
          placeholder="Vieja contraseña..."
          value={inputs.oldPassword}
          onChangeText={(text) => handleChange(text, "oldPassword")}
        />
      </View>
      <View>
        <Text style={styles.description}>Nueva contraseña:</Text>
        <TextInput
          style={styles.input}
          textContentType="password"
          secureTextEntry={true}
          placeholder="Nueva contraseña..."
          value={inputs.newPassword}
          onChangeText={(text) => handleChange(text, "newPassword")}
        />
      </View>
      <Button title="Cambiar contraseña" />
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
