import React, { useContext }  from "react";
import { AuthContext } from "../../providers/AuthProvider";
import CenterView from "../../utils/CenterView";
import { useQuery, gql } from "@apollo/client";
import { FlatList } from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
  Alert,
} from "react-native";

export const GET_ALL_COURSES_TEACHER = gql`
  query GetCoursesFromATeacher($dni: String) {
    teachers(dni: $dni) {
      _id
      name
      courses {
        _id
        name
      }
      subjects {
        _id
        name
        course {
          _id
          name
        }
      }
    }
  }
`;

const TeacherListCourses = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { dni } = user
  console.log("user: ", user)
  //const dni = 23453213
  const { data, loading, error } = useQuery(GET_ALL_COURSES_TEACHER, {
    variables: { dni },
  });
  console.log("data: ", data)

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
    const courses = data.teachers[0].subjects[0].course; // OPCIÓN DESDE MATERIA 
    //const courses = data.teachers[0].courses[0]; // OPCIÓN DESDE CURSO

    return (
      <View style={styles.cont}>
        {courses.__typename == "Course" ? (
          <FlatList
            data={[courses]}
            renderItem={({ item }) => {
              return (
                <Card key={item._id} style={styles.card}>
                  <View style={styles.cardIn}>
                    <Text style={styles.cardText}>{item.name}</Text>
                    <Text
                      style={styles.cardText}
                      onPress={() => {
                        navigation.navigate("TeacherListStudents", {
                          params: { _id: item._id },
                        });
                      }}
                    >
                      Alumnos
                    </Text>
                  </View>
                </Card>
              );
            }}
            keyExtractor={({ _id }) => _id}
          />
        ) : (
          <CenterView>
            <Text>No tienes Cursos asignados</Text>
          </CenterView>
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
  cardSee: {
    fontSize: 17,
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

export default TeacherListCourses;
