import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
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
  const { _id }  = route.params;
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
    const students = data.students[0]
 
    return (
      <CenterView>
        <View style={styles.centerView}>
          <View style={styles.card}>
            <Text style={styles.touchText}>
              Alumno: {`${students.name} ${students.lastname}`}
            </Text>
            <Image
              source={{
                uri: `${students.picture}`,
              }}
            />
            <Text style={styles.touch}>Correo: {`${students.email}`}</Text>
            <Text style={styles.touch}>WhatsApp: {`${students.whatsapp}`}</Text>
          </View>
          <View style={styles.cardcount}>
            <Text style={styles.count}>
              Calificaciones
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.touch}>
              Homework 1 ------------------------- Bien "Editar"
            </Text>
            <Text style={styles.touch}>
              Homework 2 ------------------------- Muy Bien "Editar"

            </Text>
            <Text style={styles.touch}>
              Homework 3 ------------------------- Bien "Editar"
            </Text>
            <Text style={styles.touch}>
              Homework 4 ------------------------- "Calificar"
            </Text>
          </View>
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
    fontSize: 16,
    alignItems: "flex-start",
    color: "#2290CD",
  },
  touch: {
    justifyContent: "flex-start",
    marginTop: 5,
    marginBottom: 5,
    
  },
  card: {
    width: 360,
    height: 110,
    margin: 5,
    alignItems: "flex-start",
    flexDirection: "column",
  },
  cardcount: {
    width: 360,
    height: 50,
    alignItems: "center",
    flexDirection: "column",
  },
  count: {
    fontSize: 20,
    color: "#2290CD",
    marginTop: 10,
    marginLeft: 10,
    fontWeight: "bold",
  },

  
});

export default StudentDetail;