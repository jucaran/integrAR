import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import CenterView from "../../utils/CenterView";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Card } from "react-native-paper";

export const GET_STUDENTS_FROM_COURSE = gql`
  query GetStudentsFromACourse($_id: ID) {
    courses(_id: $_id) {
      _id
      name
      students {
        _id
        name
        lastname
      }
    }
  }
`;

const TeacherListStudents = ({ navigation, route }) => {
  const { _id } = route.params.params;
  const { data, loading, error } = useQuery(GET_STUDENTS_FROM_COURSE, {
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
    const students = data.courses[0].students;

    return (
      <View style={styles.centerView}>
        <View style={styles.principal}>
          <View style={styles.touch}>
            <Text style={styles.touchText}>
              ALUMNOS DE {data.courses[0].name}{" "}
            </Text>
          </View>
          {students.length > 0 ? (
            <FlatList
              data={students}
              renderItem={({ item: { _id, name, lastname } }) => {
                return (
                  <Card key={_id} style={styles.card}>
                    <View style={styles.cardcont}>
                      <View style={styles.alum}>
                        <TouchableHighlight
                          activeOpacity={0.6}
                          underlayColor=""
                          onPress={() =>
                            navigation.navigate("Cursos", {
                              screen: "StudentDetail",
                              params: { _id },
                            })
                          }
                        >
                          <Text
                            style={styles.name}
                          >{`${name} ${lastname}`}</Text>
                        </TouchableHighlight>
                      </View>
                    </View>
                  </Card>
                );
              }}
              keyExtractor={({ _id }) => _id}
            />
          ) : (
            <CenterView>
              <Text>Este Curso no tiene Estudiantes</Text>
            </CenterView>
          )}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
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
  alum: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 14,
  },
  name: {
    fontSize: 16,
    width: 280,
    color: "#000000",
    marginTop: 10,
    marginLeft: 10,
    fontWeight: "bold",
  },
  touchText: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 14,
    alignItems: "flex-start",
    color: "#2290CD",
    width: 180,
  },
  touch: {
    justifyContent: "flex-start",
    margin: 5,
    marginLeft: 12,
  },
});
export default TeacherListStudents;
