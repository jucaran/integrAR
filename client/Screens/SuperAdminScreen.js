import React, { useContext } from "react";
import {
  Text,
  TouchableHighlight,
  StyleSheet,
  View,
  Image,
} from "react-native";
import CenterView from "../utils/CenterView";
import { AuthContext } from "../providers/AuthProvider";

const SuperAdminView = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  return (
    <CenterView>
      <Text style={styles.title}>¡Hola {user.name}! Bienvenido</Text>
      <View style={styles.cont}>
        <View style={styles.courses}>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="ligthgrey"
            style={styles.touch}
            onPress={() =>
              navigation.navigate("Cursos", { screen: "GradesScreen" })
            }
          >
            <View style={styles.button}>
              <Image source={require("../assets/bro.png")} style={styles.img} />
              <Text style={styles.touchText}>VER GRADOS</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.teachers}>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="ligthgrey"
            style={styles.touch}
            onPress={() =>
              navigation.navigate("Teachers", {
                screen: "SuperAdminListTeachers",
              })
            }
          >
            <View style={styles.button}>
              <Image
                source={require("../assets/Character.png")}
                style={styles.img}
              />
              <Text style={styles.touchText}>VER PROFESORES</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
      <View style={styles.alumn}>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="ligthgrey"
          style={styles.touch}
          onPress={() => navigation.navigate("Students", {
            screen: "ListStudents"
          })}
        >
          <View style={styles.button}>
            <Image source={require("../assets/alumn.png")} style={styles.img} />
            <Text style={styles.touchText}>VER ALUMNOS</Text>
          </View>
        </TouchableHighlight>
      </View>
    </CenterView>
  );
};

const styles = StyleSheet.create({
  cont: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  teachers: {
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  alumn: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  courses: {
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    marginTop: 10,
    width: 156,
    height: 168,
  },
  title: {
    // fontFamily: "roboto",
    fontSize: 20,
    color: "#2290CD",
    marginTop: 25,
  },
  touch: {
    margin: 15,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  touchText: {
    // fontFamily: "roboto",
    fontSize: 18,
    color: "#000000",
  },
});

export default SuperAdminView;
