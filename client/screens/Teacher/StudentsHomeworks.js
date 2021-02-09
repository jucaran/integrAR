import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import CenterView from "../../utils/CenterView";
import { useQuery, gql, useMutation } from "@apollo/client";
import * as WebBrowser from "expo-web-browser";
import { LOCAL_IP } from "@env";
import { Card } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

export const GET_STUDENTS = gql`
  {
    students {
      _id
      name
      lastname
      dni
      course {
        _id
        name
      }
    }
  }
`;

export const GET_CLASS_BY_ID = gql`
  query GetClassById($_id: ID) {
    classes(_id: $_id) {
      _id
      name
      deliveries
      corrections {
        student {
          _id
          name
        }
        score
      }
    }
  }
`;

export const SET_CORRECTION = gql`
  mutation setCorrection($classID: ID!, $studentID: ID!, $score: String!) {
    editClass(
      _id: $classID
      input: { corrections: { student: $studentID, score: $score } }
    ) {
      corrections {
        student {
          _id
          name
        }
        score
      }
    }
  }
`;

const StudentsHomeworks = ({ route }) => {
  const { _id } = route.params;

  const {
    data: dataClass,
    loading: dataClassLoading,
    error: dataClassError,
  } = useQuery(GET_CLASS_BY_ID, {
    variables: { _id },
  });

  const {
    data: dataStudent,
    loading: loadingStudent,
    error: errorStudent,
  } = useQuery(GET_STUDENTS);

  const [
    editClass,
    { data: dataMutation, error: errorMutation, loading: loadingMutation },
  ] = useMutation(SET_CORRECTION);

  const handleFilePress = (dni) => {
    let dniSplitted = dni.split(".")[0];
    for (let i = 0; i < dataStudent.students.length; i++) {
      if (dniSplitted == dataStudent.students[i].dni) {
        return WebBrowser.openBrowserAsync(
          `http://${LOCAL_IP}:4000/download/students/${_id}/${dni}`
        );
      }
    }
  };

  if (dataClassLoading || loadingStudent || loadingMutation) {
    return (
      <CenterView>
        <ActivityIndicator size="large" color="#2290CD" />
        <Text>Cargando...</Text>
      </CenterView>
    );
  }

  if (dataClassError || errorStudent || errorMutation) {
    return (
      <CenterView>
        <Text>ERROR</Text>
      </CenterView>
    );
  }

  if (dataClass || dataStudent || dataMutation) {
    const homeworkList = dataClass.classes[0].deliveries;
    const allStudents = dataStudent?.students;
    const dniFromData = dataClass?.classes[0].deliveries.map(
      (el) => el.split(".")[0]
    );
    let scores = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

    const studentsCorrections = dataClass.classes[0].corrections;

    const handleOnPress = async ({ id, idStudent, score }) => {
      
      try {
        await editClass({
          variables: {
            classID: id,
            studentID: idStudent,
            score: score,
          },
          refetchQueries: [{ query: GET_CLASS_BY_ID }],
        });
      } catch (err) {
        console.log("error: ", err);
      }
    };

    const estudiante = allStudents.filter((student) => {
      if (dniFromData.includes(student.dni)) {
        return student;
      }
    });

    return (
      <View>
        <Text style={styles.name}>Tareas de los Alumnos</Text>
        {homeworkList.length ? (
          homeworkList.map((el, i) => {
            return (
              <Card style={styles.card} key={i}>
                <View style={styles.cardIn}>
                  {estudiante.map((_el, i) => {
                    if (_el.dni === el.split(".")[0]) {
                      return (
                        <View key={i}>
                          <Text style={styles.cardText}>
                            {_el.name} {_el.lastname}
                          </Text>
                          <TouchableOpacity onPress={() => handleFilePress(el)}>
                            <Text>{el}</Text>
                          </TouchableOpacity>
                          <Text
                            style={{
                              paddingHorizontal: 10,
                              color: "white",
                              fontSize: 15,
                            }}
                          >
                            <Picker
                              selectedValue={"1"}
                              style={{
                                height: 25,
                                width: 75,
                                color: "white",
                              }}
                              onValueChange={(item) =>
                                handleOnPress({
                                  id: _id,
                                  idStudent: _el._id,
                                  score: item,
                                })
                              }
                            >
                              {scores.map((item, index) => {
                                return (
                                  <Picker.Item
                                    label={item}
                                    value={item}
                                    key={index}
                                  />
                                );
                              })}
                            </Picker>
                            {studentsCorrections.map((studentScore, index2) => {
                              if (_el._id === studentScore.student._id) {
                                return (
                                  <View key={index2}>
                                    <Text>Nota: {studentScore.score}</Text>
                                  </View>
                                );
                              }
                            })}
                          </Text>
                        </View>
                      );
                    }
                  })}
                </View>
              </Card>
            );
          })
        ) : (
          <View>
            <CenterView>
              <Text>Al parecer tus alumnos son un poco irresponsables...</Text>
            </CenterView>
          </View>
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
  card: {
    margin: 5,
    backgroundColor: "#00aadd",
    borderRadius: 10,
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cardIn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    justifyContent: "space-between",
    margin: 10,
  },
  button: {
    backgroundColor: "#00aadd",
    padding: 8,
    borderRadius: 13,
    minWidth: 40,
    minHeight: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 30,
    height: 30,
  },
  name: {
    marginBottom: 5,
    marginLeft: 12,
    fontWeight: "bold",
    fontSize: 15,
    alignItems: "flex-start",
  },
  cardText: {
    color: "white",
    fontSize: 15,
  },
});
export default StudentsHomeworks;
