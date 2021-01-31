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
  Switch,
} from "react-native";
import CenterView from "../../utils/CenterView";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Card } from "react-native-elements";
import {GET_SUBJECTS_FROM_COURSE_BY_ID} from "./SuperAdminListSubjects"

const GET_SUBJECT_BY_ID = gql`
  query GetSubjectById($_id: ID) {
    subjects(_id: $_id) {
      _id
      name
      teacher {
        name
        lastname
        _id
      }
    }
  }
`;

const DELETE_TEACHER_FROM_SUBJECT = gql`
  mutation DeleteTeacherFromSubject($_id: ID!, $teacher: ID!, $deleteMode: Boolean) {
    editSubject(_id: $_id, input: {teacher: $teacher}, deleteMode: $deleteMode) {
      name
      teacher {
        _id
        name
      }
    }
  }
`;


export default function DeleteTeacherFromSubject({ navigation, route }) {
  const _id = route.params.params.id;
  const { data, loading, error } = useQuery(GET_SUBJECT_BY_ID, {
    variables: { _id: _id },
  });
  const [
    deleteTeacherFromSubject,
    { mutationData, mutationLoading, mutationError },
  ] = useMutation(DELETE_TEACHER_FROM_SUBJECT);


  const handleOnPress = async (teacherId, id, name, lastname, subjectName) => {
    try {
      await deleteTeacherFromSubject({
        variables: {
          _id: id,
          teacher: teacherId,
          deleteMode: true
        },
         refetchQueries: [{ query: GET_SUBJECTS_FROM_COURSE_BY_ID }],
      });
      navigation.pop();
      //   "SuperAdminListSubject",{
      //   screen: "SuperAdminListSubject",
      //   params: id,
      // })
      if (mutationError) {
        console.log(mutationError);
        return false;
      }
      return alert(
        `El profesor ${name} ${lastname} fue eliminado de ${subjectName}!`
      );
    } catch (err) {
      console.error("soy el catch", err);
    }
  };

  if (loading || mutationLoading){
    return (
      <CenterView>
        <ActivityIndicator />
      </CenterView>
    );
  }

  if (data) {
    const subject = data.subjects[0];
    //const subjects = data.courses[0].subjects;
    console.log(subject)
    return (
      <ScrollView>
        <CenterView>
          <View style={styles.principal}>
            <Card>
              <Card.Title>Eliminar profesor</Card.Title>
              <Card.Divider />
              <Card key={subject.teacher._id} style={styles.card}>
                <Text style={styles.prof}>
                  {subject.teacher.name} {subject.teacher.lastname}
                </Text>
                <TouchableHighlight
                  style={styles.onPress}
                  onPress={() =>
                    handleOnPress(
                      subject.teacher._id,
                      _id,
                      subject.teacher.name,
                      subject.teacher.lastname,
                      subject.name
                    )
                  }
                >
                  <Text style={styles.cardT}>Eliminar</Text>
                </TouchableHighlight>
              </Card>
            </Card>
          </View>
        </CenterView>
      </ScrollView>
    );
  } else if (error || mutationError){
    console.log(error, 'error 1')
    console.log(mutationError, 'error 2')
    return (
      <View>
        <Text>ERROR</Text>
      </View>
    );
  }
}

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
    backgroundColor: "#2290CD",
    padding: 7,
    borderRadius: 7,
    alignItems: "center",
    marginTop: 2,
  },
  cardT: {
    color: "white",
  },
});
