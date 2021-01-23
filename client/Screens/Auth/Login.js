import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, Image, StyleSheet } from "react-native";
import CenterView from "../../utils/CenterView";
import { AuthContext } from "../../contexts/AuthProvider";
import { TouchableOpacity } from "react-native-gesture-handler";

const LoginScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState({});
  const [isFocused, setIsFocused] = useState({
    dni: false,
    password: false,
  });
  const { login } = useContext(AuthContext);

  const handleChange = (txt, input) => {
    setInputs({
      ...inputs,
      [input]: txt,
    });
  };

  const handleFocus = (input) => {
    setIsFocused({
      ...isFocused,
      [input]: true,
    });
  };

  const handleBlur = (input) => {
    setIsFocused({
      ...isFocused,
      [input]: false,
    });
  };

  return (
    <CenterView>
      <Image
        source={require("../../assets/login_splash.png")}
        style={styles.landingImg}
      />
      <TextInput
        style={[
          styles.input,
          { marginBottom: 30 },
          isFocused.dni ? styles.active : null,
        ]}
        placeholder="DNI"
        value={inputs.dniInput}
        onChangeText={(txt) => handleChange(txt, "dni")}
        onFocus={() => handleFocus("dni")}
        onBlur={() => handleBlur("dni")}
      />
      <View style={{ marginBottom: 30 }}>
        <TextInput
          style={[
            styles.input,
            { marginBottom: 5 },
            isFocused.password ? styles.active : null,
          ]}
          placeholder="Contraseña"
          value={inputs.passInput}
          secureTextEntry={true}
          onChangeText={(txt) => handleChange(txt, "password")}
          onFocus={() => handleFocus("password")}
          onBlur={() => handleBlur("password")}
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
    borderBottomColor: "#C2C2C2",
    borderBottomWidth: 2,
  },
  active: {
    borderBottomColor: "#2290CD",
  },
});

export default LoginScreen;
