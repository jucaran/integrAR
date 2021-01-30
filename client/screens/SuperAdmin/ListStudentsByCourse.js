import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  View,
  Text,
  TouchableHighlight,
  Alert,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Switch
} from "react-native";
import CenterView from "../../utils/CenterView";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Card } from "react-native-elements";


const GET_STUDENTS_BY_COURSE = gql`
  query GetSubjectById($_id: ID) {
    courses(_id: $_id) {
        _id
        name 
        students {
          name
          lastname
          _id
        }
    }
  }
`;

 const DELETE_STUDENT_FROM_COURSE = gql`
  mutation DeleteStudentFromCourse(
      $_id: ID!
      $studentId: ID!
  ) {
    editCourse(
        _id: $_id
        studentId: $studentId
        deleteMode: true
    ) {
        name
        student {
            _id
        name
      }
    }
  }
`;



export default function ListStudentsByCourse ({ navigation, route }) {
  const _id = route.params.params._id
  const { data, loading, error } = useQuery(GET_STUDENTS_BY_COURSE, {
    variables: { _id },
  });
  const [deleteStudentFromCourse, {mutationData, mutationLoading, mutationError }] = useMutation(DELETE_STUDENT_FROM_COURSE);



  if (loading)
  //  || mutationLoading)
  { return (
    <CenterView>
        <ActivityIndicator />
      </CenterView>
    );}
    
    if (data) {
      const course = data.courses[0]
      console.log(course)
      return (
        
      <ScrollView>
        <TouchableHighlight
                      activeOpacity={0.6}
                      underlayColor="ligthgrey"
                      onPress={() =>navigation.navigate("AddStudentToACourse",
                      {params: {id: _id, name: course.name}})
                      }>
        <Text style={styles.touchText}>Agregar alumno</Text>
        </TouchableHighlight>
      <Card>
        <Card.Title>Alumnos de {course.name}</Card.Title>
  <Card.Divider />
        {course.students.length ? (
          <FlatList
            data={course.students}
            renderItem={({ item }) => {
              console.log(item)
              return (
                <Card key={item._id} style={styles.card}>
                  <View style={styles.cardIn}>
                    <Text 
                    style={styles.cardText}
                    >{item.name} {item.lastname}</Text>
                    <TouchableHighlight
                    style={styles.onPress}
                      activeOpacity={0.6}
                      onPress={() =>
                        Alert.alert(
                          "Eliminar curso",
                          `¿Está seguro que desea eliminar este alumno ${item.name} 
                          ${item.lastname} del curso ${course.name}?`,
                          [
                            {
                              text: "Cancelar",
                              style: "cancel",
                            },
                            {
                              text: "OK",
                              onPress: () =>
                                deleteStudentFromCourse({
                                  variables: { _id: course._id , studentId: item._id  },
                                  //refetchQueries: [{ query: GET_ALL_COURSES }],
                                }),
                            },
                          ]
                        )
                      }
                    >
                      <Text style={styles.cardT}> X </Text>
                    </TouchableHighlight>
                  </View>
                </Card>
              );
            }}
            keyExtractor={({ _id }) => _id}
          />
        ) : (
          <CenterView>
            <Text>No hay alumnos agregados para este curso</Text>
          </CenterView>
        )} 
        </Card>
      </ScrollView>
    );
  } else if (error)
    // || mutationError)
   { return (
      <View>
        <Text>ERROR</Text>
      </View>
    );
};}

const styles = StyleSheet.create({
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
  prof: {
    fontSize: 17,
  },
  onPress: {
    backgroundColor: "red",
    padding: 7,
    borderRadius: 7,
    alignItems: "center",
    marginTop: 2,
    width: 30,
    height: 32,
    justifyContent: "center"
  },
  cardT: {
  color: "white"},
  touchText: {
    marginTop: 5,
    marginLeft: 20,
    marginBottom: 15,
    // fontFamily: "roboto",
    fontSize: 20,
    alignItems: "flex-start",
    color: "#2290CD",
  },
});