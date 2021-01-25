import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Image,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import CenterView from "../utils/CenterView";

const SuperAdminListTeachers = ({ navigation }) => {
  let [teachers, setTeachers] = useState(
    (teachers = [
      {
        id: 1,
        Nombre: "Carlos",
        Apellido: "Fila",
        materias: ["Matemática", "Química"],
        grado: ["1A", "2C"],
      },
      {
        id: 2,
        Nombre: "Ana",
        Apellido: "González",
        materias: ["Lengua", "Física"],
        grado: ["3A", "6C"],
      },
      {
        id: 3,
        Nombre: "José",
        Apellido: "Rosas",
        materias: [],
        grado: ["4A", "5C"],
      },
      { id: 4, Nombre: "Leila", Apellido: "Núñez", materias: [], grado: [] },
      { id: 5, Nombre: "Franco", Apellido: "Fontana", materias: [], grado: [] },
      { id: 6, Nombre: "Luisina", Apellido: "Añon", materias: [], grado: [] },
      { id: 7, Nombre: "María", Apellido: "Frank", materias: [], grado: [] },
      { id: 8, Nombre: "Luis", Apellido: "Bono", materias: [], grado: [] },
      {
        id: 9,
        Nombre: "Sebastian",
        Apellido: "Rama",
        materias: [],
        grado: ["2A", "1C"],
      },
    ])
  );
  return (
    <ScrollView>
      <View style={styles.principal}>
        <View style={styles.touch}>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="ligthgrey"
            onPress={() =>
              navigation.navigate("", { screen: "SuperAdminAddTeacher" })
            }
          >
            <Text style={styles.touchText}>AGREGAR PROFESOR</Text>
          </TouchableHighlight>
        </View>
        <FlatList
          data={teachers}
          renderItem={({ item }) => {
            return (
              <Card key={item.id} style={styles.card}>
                <View style={styles.cardcont}>
                  <View style={styles.prof}>
                    <Text style={styles.name}>
                      {item.Nombre} {item.Apellido}
                    </Text>
                    <TouchableHighlight
                      activeOpacity={0.6}
                      underlayColor="ligthgrey"
                      onPress={() =>
                        navigation.navigate("", {
                          screen: "SuperAdminEditTeacher",
                        })
                      }
                    >
                      <Image
                        source={require("../assets/edit.png")}
                        style={styles.img}
                      />
                    </TouchableHighlight>
                    <TouchableHighlight
                      activeOpacity={0.6}
                      underlayColor="ligthgrey"
                      onPress={() =>
                        navigation.navigate("", {
                          screen: "SuperAdminDeleteTeacher",
                        })
                      }
                    >
                      <Image
                        source={require("../assets/x.png")}
                        style={styles.img}
                      />
                    </TouchableHighlight>
                  </View>
                  <View style={styles.desc}>
                    {item.materias?.length > 0 ? (
                      item.materias.map((materia, i) => {
                        return (
                          <Text key={i} style={styles.description}>
                            {materia}
                          </Text>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </View>
                  <View style={styles.desc}>
                    {item.grado?.length > 0 ? (
                      item.grado.map((g, i) => {
                        return (
                          <Text key={i} style={styles.description}>
                            {g}
                          </Text>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </View>
                </View>
              </Card>
            );
          }}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  principal: {
    backgroundColor: "white",
  },
  card: {
    width: 360,
    height: 66,
    margin: 5,
    alignItems: "flex-start",
    flexDirection: "column",
  },
  cardcont: {
    display: "flex",
    flexDirection: "column",
  },
  prof: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 14,
  },
  img: {
    width: 14,
    height: 14,
    marginTop: 10,
    marginRight: 25,
  },
  name: {
    fontSize: 16,
    width: 280,
    fontFamily: "roboto",
    color: "#000000",
    marginLeft: 10,
    fontWeight: "bold",
  },
  desc: {
    flexDirection: "row",
  },
  description: {
    fontSize: 14,
    fontFamily: "roboto",
    color: "#000000",
    marginLeft: 10,
  },
  touchText: {
    marginTop: 15,
    marginBottom: 15,
    fontFamily: "roboto",
    fontSize: 14,
    alignItems: "flex-start",
    color: "#2290CD",
  },
  touch: {
    justifyContent: "flex-start",
    margin: 5,
    marginLeft: 12,
  },
});

export default SuperAdminListTeachers;
