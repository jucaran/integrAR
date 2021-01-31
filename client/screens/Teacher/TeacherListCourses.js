import React from "react";
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
  query GetCoursesFromATeacher($_id: ID) {
    teachers(_id: $_id) {
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

const TeacherListCourses = ({ navigation, route }) => {
  //const { id: _id } = route.params.params;
  //console.log(" id: _id ", _id)
  const _id = "6014f33a4309a313907f1582";
  const { data, loading, error } = useQuery(GET_ALL_COURSES_TEACHER, {
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
    console.log("data en if ", data.teachers[0].subjects[0].course);
    const courses = data.teachers[0].subjects[0].course;
    console.log(
      "courses: ",
      courses.name,
      "largo: ",
      courses.__typename == "Course"
    );

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
                        navigation.navigate("Estudiantes", {
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
