import React, { useContext } from "react";
import CenterView from "../../utils/CenterView";
import { AuthContext } from "../../providers/AuthProvider";
import {Text, View, TouchableHighlight, StyleSheet, Image } from "react-native";


const StudentScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  return (
    <CenterView>
      <Text style={styles.title}>
        ¡Hola {user.name}
        {user.lastname}! Bienvenido
      </Text>
      <View style={styles.alumn}>
          <TouchableHighlight
            style={styles.touch}
            activeOpacity={0.6}
            underlayColor=""
            onPress={() =>
              navigation.navigate("Mis Materias", {screen:"StudentSubjects"})
            }
          >
            <View style={styles.button}>
              <Image
                source={require("../../assets/5836.jpg")}
                style={styles.img}
              />
              <Text style={styles.touchText}>MIS MATERIAS</Text>
            </View>
          </TouchableHighlight>
        </View>
      <View style={styles.cont}>
        <View style={styles.materias}>
          <TouchableHighlight
            style={styles.touch}
            activeOpacity={0.6}
            underlayColor=""
            onPress={() =>
              navigation.navigate("Mi Perfil", {screen: "StudentProfile"})
            }
          >
            <View style={styles.button}>
              <Image
                source={require("../../assets/53571.jpg")}
                style={styles.img}
              />
              <Text style={styles.touchText}>MI PERFIL</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </CenterView>
  );
};

const styles = StyleSheet.create({
  cont: {
    marginTop: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  materias: {
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    marginTop: 5,
    width: 156,
    height: 168,
  },
  title: {
    fontSize: 20,
    color: "#2290CD",
    marginTop: 25,
  },
  touch: {
    margin: 7,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  touchText: {
    fontSize: 18,
    color: "#000000",
  },
});

export default StudentScreen;
