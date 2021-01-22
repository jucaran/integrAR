import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, Image, StyleSheet } from "react-native";
import CenterView from "../../utils/CenterView";
import { AuthContext } from "../../contexts/AuthProvider";
import { TouchableOpacity } from "react-native-gesture-handler";

const LoginScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    dni: "",
    pass: "",
  });
  const { login } = useContext(AuthContext);

  const handleChange = (txt, input) => {
    setInputs({
      ...inputs,
      [input]: txt,
    });
  };

  return (
    <CenterView>
      <Image
        source={require("../../assets/login_splash.png")}
        style={styles.landingImg}
      />
      <TextInput
        style={[styles.input, styles.marginBottom]}
        placeholder="DNI..."
        value={inputs.dniInput}
        onChangeText={(txt) => handleChange(txt, "dni")}
      />
      <View style={{ marginBottom: 30 }}>
        <TextInput
          style={[styles.input, { marginBottom: 5 }]}
          placeholder="Contraseña..."
          value={inputs.passInput}
          onChangeText={(txt) => handleChange(txt, "password")}
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={() => navigation.navigate("ResetPass")}>
          <Text style={{ color: "#2290CD" }}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>
      <Button
        title="Ingresar"
        onPress={() => {
          login(inputs);
        }}
      />
    </CenterView>
  );
};

const styles = StyleSheet.create({
  landingImg: {
    marginBottom: 50,
    width: 250,
    height: 250,
  },
  input: {
    padding: 5,
    width: 300,
    borderBottomColor: "#2290CD",
    borderBottomWidth: 2,
  },
  marginBottom: {
    marginBottom: 30,
  },
});

export default LoginScreen;
