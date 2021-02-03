import React from "react";
import CenterView from "../../utils/CenterView";
import { useQuery, gql } from "@apollo/client";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";

export const GET_CLASS_BY_ID = gql`
  query GetClassById($_id: ID) {
    classes(_id: $_id) {
      _id
      name
      homework
    }
  }
`;

const TeacherClassDetails = ({ navigation, route }) => {
  // console.log("Ruta classDetails: ", route.params.params.id);
  const _id = route.params.params.id;
  const { data, loading, error } = useQuery(GET_CLASS_BY_ID, {
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
    console.log("Data en tarea ", data);
    const clase = data.classes[0];

    return (
      <View style={styles.cont}>
        <Text>Tarea</Text>
        {clase.homework ? (
          <Text>{clase.homework}</Text>
        ) : (
          <TouchableHighlight
            style={styles.button}
            activeOpacity={0.6}
            onPress={
              (() => navigation.navigate(""), { params: { _id: clase._id } })
            }
          >
            <Text style={styles.buttonText}>Agregar Tarea</Text>
          </TouchableHighlight>
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    padding: 5,
  },
  button: {
    margin: 5,
    backgroundColor: "#00aadd",
    borderRadius: 10,
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 20,
    alignItems: "flex-start",
    color: "white",
  },
});

export default TeacherClassDetails;
