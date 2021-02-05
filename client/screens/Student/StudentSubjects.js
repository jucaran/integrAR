import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import CenterView from "../../utils/CenterView";
import { useQuery, gql } from "@apollo/client";
import { FlatList } from "react-native-gesture-handler";
import {
  Text,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";

export const GET_A_STUDENT_SUBJECTS = gql`
  query GetAStudentSubjects($dni: String) {
    students(dni: $dni) {
      name
      lastname
      _id
      course {
        name
        _id
        subjects {
          name
          _id
        }
      }
    }
  }
`;

const colors = [
  "#F91E1E",
  "#DC1EF6",
  "#F61E49",
  "#86FB11",
  "#1CCC71",
  "#CC741C",
  "#1EF6BB",
  "#1EA4F6",
  "#F61E2B",
  "#F61EA1",
  "#1EE2F6",
  "#1EF669",
  "#561EF6",
  "#1EF669",
  "#1E56F6",
  "#F0FB11",
  "#3FF61E",
  "#F9A31E",
  "#1EF669",
  "#1EA4F6",
];

const StudentsSubjects = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { dni } = user;
  const { data, loading, error } = useQuery(GET_A_STUDENT_SUBJECTS, {
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
    const student = data.students[0];
    console.log(student.course.subjects);

    return (
      <CenterView>
        <Text style={styles.text}>Curso: {student.course.name}</Text>
        {student.course.subjects.length ? (
          <FlatList
            data={student.course.subjects}
            renderItem={({ item, index }) => {
              return (
                <TouchableHighlight
                  activeOpacity={0.6}
                  underlayColor="white"
                  key={item._id}
                  onPress={() =>
                    navigation.navigate("StudentSubjectDetail", {
                      params: { id: item._id },
                    })
                  }
                  style={{
                    backgroundColor: colors[index],
                    margin: 5,
                    borderRadius: 10,
                    padding: 20,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minWidth: 300,
                    fontWeight: "bold",
                  }}
                >
                  <Text style={styles.touchText}>{item.name}</Text>
                </TouchableHighlight>
              );
            }}
            keyExtractor={({ _id }) => _id}
          />
        ) : (
          <CenterView>
            <Text>Este curso no tiene materias asignadas</Text>
          </CenterView>
        )}
      </CenterView>
    );
  }
};

const styles = StyleSheet.create({
  cont: {
    padding: 5,
  },
  text: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#121212",
  },
  touchText: {
    fontSize: 16,
    color: "#201F1F",
    fontWeight: "bold",
  },
});

export default StudentsSubjects;
