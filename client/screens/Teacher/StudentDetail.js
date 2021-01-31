import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import CenterView from "../../utils/CenterView";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Card } from "react-native-paper";

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
  const { id: _id } = route.params.params;
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
    // const students = data.courses[0].students;
    const { students } = data;
    console.log("estos son los estudiantes: ", data);

    return (
      <View style={styles.centerView}>
        <View style={styles.principal}>
          <Text style={styles.name}>
            Alumno: {`${students.name} ${students.lastname}`}
          </Text>
          <Image
            source={{
              uri: `${students.picture}`,
            }}
          />
          <Text>Correo: {`${students.email}`}</Text>
          {/* <Text>{`Correo: ${students.email}`}</Text> */}
          <Text>WhatsApp: {`${students.whatsapp}`}</Text>
          <Text>Dirección: {`${students.adress}`}</Text>
          <Text>Fecha de nacimiento: {`${students.birthday}`}</Text>
        </View>
      </View>
    );
  }
}

export default StudentDetail;