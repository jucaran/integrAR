import React from "react";
import { ScrollView } from "react-native-gesture-handler";
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
import {GET_SUBJECTS_FROM_COURSE_BY_ID} from "./SuperAdminListSubjects"

const GET_ALL_TEACHERS = gql`
  {
    teachers {
      _id
      name
      lastname
      courses {
        name
      }
      subjects {
        name
      }
    }
  }
`;

const EDIT_SUBJECT = gql`
  mutation EditSubject($_id: ID!, $teacher: ID!) {
    editSubject(_id: $_id, input: { teacher: $teacher }) {
      name
      teacher {
        _id
        name
      }
    }
  }
`;

export default function AddTeacherToSubject({ navigation, route }) {
  const id = route.params.params.id;
  const subjectName = route.params.params.name
  console.log(id)
  const { data, loading, error } = useQuery(GET_ALL_TEACHERS);
  const [
    editSubject,
    { mutationData, mutationLoading, mutationError },
  ] = useMutation(EDIT_SUBJECT);

  const handleOnPress = async (teacherId, id, name, lastname) => {
    try {
      console.log('teacherId',teacherId)
      console.log('id',id)
      console.log('name',name)
      console.log('lastname',lastname)
      await editSubject({
        variables: {
          _id: id,
          teacher: teacherId
        },
        refetchQueries: [{ query: GET_SUBJECTS_FROM_COURSE_BY_ID}],
      });
      navigation.pop()

      // if (mutationLoading) {
      //   return (
      //     <CenterView>
      //       <ActivityIndicator />
      //     </CenterView>
      //   );
      // }
      if (mutationError) {
        console.log(mutationError);
        return false;
      }
      return Alert.alert(
        `El profesor ${name} ${lastname} fue agregado exitosamente!`
      );
    } catch (err) {
      console.error("soy el catch", err);
    }
  };

  if (loading || mutationLoading) {
    return (
      <CenterView>
        <ActivityIndicator />
      </CenterView>
    );
  }

  if (data) {
    const { teachers } = data;
    return (
      <ScrollView>
          <View>
            <Card>
              <Card.Title>Agregar profesor a {subjectName}</Card.Title>
              <Card.Divider />
              {teachers.map((teacher, i) => {
                return (
                  <Card key={teacher._id} style={styles.card}>
                    <Text style={styles.prof}>
                      {teacher.name} {teacher.lastname}
                    </Text>
                    <TouchableHighlight
                      style={styles.onPress}
                      onPress={() =>
                        handleOnPress(
                          teacher._id,
                          id,
                          teacher.name,
                          teacher.lastname
                        )
                      }
                    >
                      <Text style={styles.cardT}>Agregar</Text>
                    </TouchableHighlight>
                  </Card>
                );
              })}
            </Card>
          </View>
      </ScrollView>
    );
  } else if (error || mutationError) {
    return (
      <View>
        <Text>ERROR</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    marginTop: 5,
  },
  cardT: {
    color: "white",
  },
});
