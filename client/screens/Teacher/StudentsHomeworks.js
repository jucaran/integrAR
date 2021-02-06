import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import CenterView from "../../utils/CenterView";
import { useQuery, gql, useMutation } from "@apollo/client";
import * as WebBrowser from "expo-web-browser";
import { LOCAL_IP } from "@env";
import { Card } from "react-native-paper";

// const GET_STUDENTS_BY_COURSE = gql`
//   query GetSubjectById($_id: ID) {
//     courses(_id: $_id) {
//       _id
//       name
//       students {
//         _id
//         name
//         lastname
//         dni
//       }
//     }
//   }
// `;


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
    }
  }
`;

// string.split(".")[0]   -> esto sirve para sacar el .pdf

const StudentsHomeworks = ({ navigation, route }) => {
  const { _id } = route.params;

  const {
    data: dataClass,
    loading: dataClassLoading,
    error: dataClassError,
  } = useQuery(GET_CLASS_BY_ID, {
    variables: { _id },
  });

  const dniFromData = dataClass?.classes[0].deliveries.map(
    (el) => el.split(".")[0]
  );

  // dniFromData = ["583691", "369147", "836914"] de los pdf subidos


  const {
    data: dataStudent,
    loading: loadingStudent,
    error: errorStudent,
  } = useQuery(GET_STUDENTS);

  const allStudents = dataStudent?.students

  // console.log("dataStudent.students: ", allStudents);

  
  
  // dniFromStudents = ["258369", "583691", "836914", "369147", "691472", "914725"]  son los dni de todos los estudiantes

  // const handleFilePress = () => {
  //   WebBrowser.openBrowserAsync(
  //     `http://${LOCAL_IP}:4000/download/students/${_id}/${dni}`
  //   );
  // };

  // dataStudent.student.filter(student => 
  // student.dni === dniFromData
  //   return (
  //       <Text>{student.name}</Text>
  //   )

  //)

              
  if (dataClassLoading) {
    return (
      <CenterView>
        <ActivityIndicator size="large" color="#2290CD" />
        <Text>Cargando...</Text>
      </CenterView>
    );
  }

  if (dataClassError) {
    return (
      <CenterView>
        <Text>ERROR</Text>
      </CenterView>
    );
  }

  if (dataClass) {
    const homeworkList = dataClass.classes[0].deliveries;
    const dniFromData = dataClass?.classes[0].deliveries.map(
      (el) => el.split(".")[0]
    );

    return (
      <View>
        <Text style={styles.name}>Tareas de los Alumnos</Text>
        {homeworkList.length ? (
          <FlatList
          data={homeworkList}
          renderItem={({ item, index }) => {
            
            // dniFromData = ["583691", "369147", "836914"] de los pdf subidos
            // dataStudent.student
            
            // const matchDni = dniFromData.filter(value => dniFromStudents.includes(value));
            const student = allStudents.find(student => dniFromdata.includes(student.dni));



             // const student = allStudents.dni.find(value => dniFromData.value)
              console.log("student: ",student)
              return (
                <Card key={index} style={styles.card}>
                  <View style={styles.cardIn}>
                    <TouchableOpacity
                    // onPress={() => handleFilePress()}
                    >
                      <Text style={styles.cardText}>{student?.name} {item}</Text>
                    </TouchableOpacity>
                  </View>
                </Card>
              );
            }}
            keyExtractor={(index) => index}
          />
        ) : (
          <Text>Al parecer tus alumnos son un poco irresponsables...</Text>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    justifyContent: "space-between",
    display: "flex",
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
});
export default StudentsHomeworks;
