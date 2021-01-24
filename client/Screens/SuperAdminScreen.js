import React from "react";
import { Text, 
  TouchableHighlight,
  StyleSheet
        } from "react-native";
import CenterView from "../utils/CenterView";

const SuperAdminView = ({navigation}) => {
  return (
    <CenterView>
      <Text 
        style={styles.title}>
          ¿Hola Admin! Bienvenido de nuevo
      </Text>
      <View>
        <Image
          source={require("../../assets/bro.png")}
          style={styles.landingImg}
        />
        <TouchableHighlight
          activeOpacity={0.8}
          underlayColor="lightblue"
          style={styles.touch}
          onPress={() => navigation.navigate("SuperAdminListCourses")}>
          <Text style={styles.touchText}>VER GRADOS</Text>
         </TouchableHighlight>
      </View>
      <View>
        <Image
          source={require("../../assets/Character.png")}
          style={styles.landingImg}
        />
        <TouchableHighlight
          activeOpacity={0.8}
          underlayColor="pink"
          style={styles.touch}
          onPress={() => navigation.navigate("AgregarCurso")}>
            <Text style={styles.touchText}>VER PROFESORES</Text>
        </TouchableHighlight>
      </View>
      <View>
        <Image
          source={require("../../assets/alumn.png")}
          style={styles.landingImg}
        />
        <TouchableHighlight
          activeOpacity={0.8}
          underlayColor="pink"
          style={styles.touch}
          onPress={() => navigation.navigate("AgregarMateria")}>
            <Text style={styles.touchText}>AGREGAR ALUMNO</Text>
        </TouchableHighlight>
      </View>
    </CenterView>
  );
}

const styles = StyleSheet.create({
  title: { 
    //fontFamily: 'roboto',
    fontSize: 20,
    color: "#2290CD",
    marginBottom: 25,
  },
  touch: {
    //fontFamily: 'roboto',
    fontSize: 18,
    color: "#000000",
    margin: 15, 
    justifyContent: "center",
    alignItems: "flex-start",
  },
  touchText: {
    //fontFamily: 'roboto',
    fontSize: 16,
    color: "white",
    marginLeft: 6
  },
});


export default SuperAdminView