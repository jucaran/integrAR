import React, { useContext } from "react";
import { StyleSheet, Text, Button, View } from "react-native";
import { AuthContext } from "../../providers/AuthProvider";

const Options = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aqui podes editar tu perfil, {user.name}</Text>
      <View style={styles.buttonsContainer}>
        <Button
          title="Editar información personal"
          onPress={() => navigation.navigate("EditProfile")}
        />
        <Button
          title="Cambiar contraseña"
          onPress={() => navigation.navigate("ResetPass")}
        />
        <Button title="Cerrar Sesión" onPress={logout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: "center",
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
  buttonsContainer: {
    height: 200,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
export default Options;
