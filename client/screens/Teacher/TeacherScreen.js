import React, { useContext } from "react";
import CenterView from "../../utils/CenterView";
import { Text, View, TouchableHighlight, StyleSheet } from "react-native";
import { AuthContext } from "../../providers/AuthProvider";

// Necesito:
// user.name
// user.lastname
// OJO -> Rutas modificar antes de push

const TeacherView = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  return (
    <CenterView>
      <Text style={styles.title}>
        ¡Hola {user.name}{user.lastname}! Bienvenido
      </Text>
      <View style={styles.cont}>
        <View style={styles.materias}>
          <TouchableHighlight
            style={styles.touch}
            activeOpacity={0.6}
            underlayColor="lightgrey"
            onPress={() =>
              navigation.navigate("Materias", { screen: "TeacherListSubjects"})
            }
          >
            <Text style={styles.touchText}>MATERIAS</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.alumn}>
          <TouchableHighlight
            style={styles.touch}
            activeOpacity={0.6}
            underlayColor="lightgrey"
            onPress={() =>
              navigation.navigate("Cursos", { screen: "TeacherListCourses"})
            }
          >
            <View style={styles.button}>
              <Text style={styles.touchText}>CURSOS</Text>
            </View>
          </TouchableHighlight>
        </View>
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
  materias: {
    justifyContent: "center",
    alignItems: "center",
  },
  courses: {
    marginBottom: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    marginTop: 10,
    width: 156,
    height: 168,
  },
  title: {
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
    fontSize: 18,
    color: "#000000",
  },
});

export default TeacherView;

// Crear Screens:
// TeacherScreen --> Ready
//    TeacherListSubjects : --> Ready
//      TeacherListUnity (AddUnity, DeleteUnity) :
//        TeacherListClass (AddClass, DeleteClass)
//    TeacherListCourse :  --> Ready
//      TeacherListStudent
//        StudentDetail
