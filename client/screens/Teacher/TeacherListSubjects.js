import React, { useContext } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { AuthContext } from "../../providers/AuthProvider";
import {
  View,
  Text,
  TouchableHighlight,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import CenterView from "../../utils/CenterView";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Card } from "react-native-elements";

export const GET_ALL_SUBJECTS_TEACHER = gql`
  query GetSubjectsFromCourseId($dni: String) {
    teachers(dni: $dni) {
      _id
      name
      dni
      subjects {
        _id
        name
        course {
          name
          _id
        }
      }
    }
  }
`;

const TeacherListSubjects = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { dni } = user;
  const { data, loading, error } = useQuery(GET_ALL_SUBJECTS_TEACHER, {
    variables: { dni },
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
    console.log(data);
    const subjects = data.teachers[0].subjects;
    return (
      <ScrollView>
        <View
          style={{
            flex: 1,
            padding: 5,
          }}
        >
          {subjects.length ? (
            <Card>
              <Card.Title>
                MATERIAS DE {data.teachers[0].name.toUpperCase()}
              </Card.Title>
              <Card.Divider />
              {subjects.map((subject, i) => {
                return (
                  <View
                    key={subject._id}
                    style={{
                      justifyContent: "space-between",
                      display: "flex",
                      flexDirection: "row",
                      marginTop: 20,
                      marginBottom: 20,
                      maxWidth: 900,
                    }}
                  >
                    <Text style={{ fontSize: 18 }}>{subject.name}</Text>
                    <Text style={{ fontSize: 16 }}>{subject.course?.name}</Text>
                    <TouchableHighlight
                      style={styles.button}
                      activeOpacity={0.6}
                      underlayColor=""
                      onPress={() =>
                        navigation.navigate("TeacherListModules", {
                          screen: "TeacherListModules",
                          params: { _id: subject._id },
                        })
                      }
                    >
                      <Text style={styles.textHigh}>Unidades</Text>
                    </TouchableHighlight>
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
  }
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
    // marginLeft: 12,
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
    justifyContent: "space-around",
    //width: 334,
  },
  button: {
    backgroundColor: "#2290CD",
    padding: 5,
    borderRadius: 3,
  },
  buttonDel: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 3,
  },
  buttonEx: {
    backgroundColor: "#2290CD",
    padding: 7,
    borderRadius: 3,
    width: 24,
  },
  textHigh: {
    color: "white",
  },
});
export default TeacherListSubjects;
