import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  View,
  ActivityIndicator,
  Text,
  TouchableHighlight,
  Alert,
  StyleSheet,
} from "react-native";
import CenterView from "../utils/CenterView";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Card } from "react-native-elements";
import { Button } from "react-native-elements";

const GET_SUBJECTS_FROM_COURSE_BY_ID = gql`
  query GetSubjectsFromCourseId($_id: ID) {
    courses(_id: $_id) {
      _id
      name
      subjects {
        _id
        name
      }
    }
  }
`;

const DELETE_SUBJECT_BY_ID = gql`
  mutation DeleteSubject($_id: ID) {
    deleteSubject(_id: $_id) {
      _id
      name
    }
  }
`;

const SuperAdminListSubjects = ({ navigation, route }) => {
  const { _id } = route.params.params;
  const { data, loading, error } = useQuery(GET_SUBJECTS_FROM_COURSE_BY_ID, {
    variables: { _id },
  });

  const [deleteSubject, mutationData] = useMutation(DELETE_SUBJECT_BY_ID);
  if (error) {
    return (
      <CenterView>
        <Text>ERROR</Text>
      </CenterView>
    );
  } else if (data) {
    const subjects = data.courses[0].subjects;

    return (
      <ScrollView>
        <View
          style={{
            flex: 1,
            padding: 5,
          }}
        >
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="ligthgrey"
            onPress={() =>
              navigation.navigate("SuperAdminAddSubject", {
                params: data.courses[0]._id,
              })
            }
          >
            <Text
              style={{
                fontSize: 25,
                marginLeft: 20,
              }}
            >
              Agregar Materia
            </Text>
          </TouchableHighlight>
          {subjects.length ? (
            <Card>
              <Card.Title>MATERIAS DE {data.courses[0].name}</Card.Title>
              <Card.Divider />
              {subjects.map((subject, i) => {
                return (
                  <View
                    key={subject._id}
                    style={{
                      justifyContent: "space-between",
                      display: "flex",
                      flexDirection: "row",
                      margin: 20,
                      maxWidth: 900,
                    }}
                  >
                    <Text style={{ fontSize: 18 }}>{subject.name}</Text>
                    <Button
                      title="Eliminar Materia"
                      onPress={() =>
                        Alert.alert(
                          "Eliminar curso",
                          `¿Está seguro que desea eliminar esta materia:
    "${subject.name}"?`,
                          [
                            {
                              text: "Cancelar",
                              style: "cancel",
                            },
                            {
                              text: "OK",
                              onPress: async () =>
                                await deleteSubject({
                                  variables: { _id: subject._id },
                                  refetchQueries: [
                                    { query: GET_SUBJECTS_FROM_COURSE_BY_ID },
                                  ],
                                }),
                            },
                          ]
                        )
                      }
                    />
                  </View>
                );
              })}
            </Card>
          ) : (
            <CenterView>
              <Text>NO HAY MATERIAS PARA ESTE CURSO</Text>
            </CenterView>
          )}
        </View>
      </ScrollView>
    );
  } else
    return (
      <CenterView>
        <ActivityIndicator size="large" />
      </CenterView>
    );
};
const styles = StyleSheet.create({
  cont: {
    flex: 1,
    padding: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  touchText: {
    marginTop: 5,
    marginBottom: 15,
    // fontFamily: "roboto",
    fontSize: 16,
    alignItems: "flex-start",
    color: "#2290CD",
  },
  touch: {
    justifyContent: "flex-start",
    marginLeft: 12,
  },
  card: {
    margin: 5,
    backgroundColor: "#00aadd",
    borderRadius: 10,
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    fontSize: 20,
    padding: 10,
    color: "white",
  },
  cardText: {
    fontSize: 20,
    padding: 10,
    color: "white",
  },
  img: {
    color: "white",
    fontSize: 15,
  },
  cardIn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 344,
  },
});

// <TouchableHighlight
// activeOpacity={0.6}
// underlayColor="ligthgrey"
// onPress={() =>
//   Alert.alert(
//     "Eliminar curso",
//     `¿Está seguro que desea eliminar esta materia:
//     "${subject.name}"?`,
//     [
//       {
//         text: "Cancelar",
//         style: "cancel",
//       },
//       {
//         text: "OK",
//         onPress: () => console.log("holis"),
//       },
//     ]
//   )
// }
// >
// <Button title="Eliminar Materia" />
// </TouchableHighlight>
export default SuperAdminListSubjects;
