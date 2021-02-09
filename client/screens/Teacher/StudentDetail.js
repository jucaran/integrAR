import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import UserAvatar from "react-native-user-avatar";
import CenterView from "../../utils/CenterView";
import { useQuery, gql } from "@apollo/client";

export const GET_STUDENTS_BY_ID = gql`
  query GetStudentById($_id: ID) {
    students(_id: $_id) {
      _id
      name
      lastname
      dni
      email
      whatsapp
      address
      birthday
      picture
    }
  }
`;

function StudentDetail({ route }) {
  const { _id } = route.params;
  const { data, loading, error } = useQuery(GET_STUDENTS_BY_ID, {
    variables: { _id },
  });

  if (loading) {
    return (
      <CenterView>
        <ActivityIndicator size="large" color="#2290CD" />
        <Text>Cargando...</Text>
      </CenterView>
    );
  }

  if (error) {
    return (
      <CenterView>
        <Text>ERROR</Text>
      </CenterView>
    );
  }

  if (data) {
    const student = data.students[0];

    return (
      <CenterView>
        <View style={styles.card}>
          <ScrollView>
            <View style={styles.centerView}>
              <View>
                <UserAvatar
                  size={100}
                  name={`${student.name} ${student.lastname}`}
                  style={{
                    backgroundColor: "#2290CD",
                    width: 140,
                    height: 140,
                    borderRadius: 100,
                    marginTop: 20,
                    alignSelf: "center",
                  }}
                />
              </View>

              <Text style={styles.textName}>
                {`${student.name} ${student.lastname}`}
              </Text>
              <Text style={styles.textRole}>Estudiante</Text>

              <View style={styles.cardcount}>
                <Text style={styles.count}>Calificaciones</Text>
              </View>
              <View style={styles.inputScore}>
                <Text style={styles.touchScore}>
                  Actividad        Puntos             Evaluación
                </Text>
              </View>
              <View style={styles.inputScore}>
                <Text style={styles.touchScore}>
                  Tarea 1                7                    Bien 
                </Text>
              </View>
              <View style={styles.inputScore}>
                <Text style={styles.touchScore}>
                  Tarea 2                9                    Muy Bien 
                </Text>
              </View>
              <View style={styles.inputScore}>
                <Text style={styles.touchScore}>
                  Tarea 3                6                    Bien
                </Text>
              </View>

              <View style={styles.inputScore}>
                <Text style={styles.touchScore}>
                  Quiz 4                  -                    --------
                </Text>
              </View>
            </View>

            {/* -------------------------------------------------------------- */}
            <View style={styles.cardcount}>
                <Text style={styles.count}>Datos Personales</Text>
              </View>

            <View style={styles.input}>
              <Text style={styles.touch}>Correo: {`${student.email}`}</Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.touch}>DNI: {`${student.dni}`}</Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.touch}>
                Dirección: {`${student.address}`}
              </Text>
            </View>
            <View style={[styles.input, styles.inputMateria]}>
              <Text style={styles.touch}>Fecha: {`${student.birthday}`}</Text>
            </View>
          </ScrollView>
        </View>
      </CenterView>
    );
  }
}

const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  principal: {
    backgroundColor: "white",
  },
  touchText: {
    marginTop: 15,
    marginBottom: 10,
    color: "#2290CD",
    width: 90,
    textAlign: "center",
    fontSize: 14,
  },
  touch: {
    justifyContent: "flex-start",
    marginTop: 5,
    marginBottom: 5,
  },

  touchLink: {
    justifyContent: "flex-start",
    marginTop: 5,
    marginBottom: 5,
    shadowOpacity: 80,
    elevation: 10,
    borderRadius: 15,
    backgroundColor: "#fff",
  },
  card: {
    width: `100%`,
    height: `100%`,
    margin: 5,
    alignItems: "center",
    flexDirection: "column",
    padding: 10,
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  cardcount: {
    width: `100%`,
    height: 50,
    alignItems: "center",
    flexDirection: "column",
  },
  count: {
    fontSize: 20,
    color: "#2290CD",
    marginTop: 20,
    marginLeft: 15,
    fontWeight: "bold",
  },
  user: {
    backgroundColor: "#2290CD",
    width: 140,
    height: 140,
    borderRadius: 100,
    marginTop: 20,
    alignSelf: "center",
  },
  textName: {
    fontSize: 25,
    fontWeight: "bold",
    padding: 10,
    alignSelf: "center",
  },
  textRole: {
    fontSize: 15,
    fontWeight: "bold",
    color: "grey",
    alignSelf: "center",
  },
  input: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#fff",
    width: 300,
    padding: 10,
    paddingBottom: 10,
    borderRadius: 10,
    shadowOpacity: 80,
    elevation: 15,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  inputScore: {
    alignSelf: "auto",
    flexDirection: "row",
    justifyContent: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    width: 300,
    borderRadius: 10,
    shadowOpacity: 80,
    elevation: 5,
    marginTop: 8,
  },
  touchScore: {
    justifyContent: "flex-start",
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 20,
  },
  inputMateria: {
    marginBottom: 15,
  },
  link: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default StudentDetail;
