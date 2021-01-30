import React, { useState } from "react";
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
  mutation EditSubject(
      $_id: ID!
      $teacher: ID!
  ) {
    editSubject(
        _id: $_id
      input: {
        teacher: $teacher
        }
    ) {
        name
        teacher {
            _id
        name
      }
    }
  }
`;



export default function AddTeacherToSubject ({ navigation, route }) {
  const id = route.params.params.id
  const { data, loading, error } = useQuery(GET_ALL_TEACHERS);
  const [editSubject, {mutationData, mutationLoading, mutationError }] = useMutation(EDIT_SUBJECT);

  const handleOnPress = async (teacherId, id, name, lastname) => {
    try {
      await editSubject({
        variables: {
          _id: id,
          teacher: teacherId
        },
        // refetchQueries: [{ query: GET_SUBJECTS_FROM_COURSE_BY_ID }],
      });
      navigation.navigate("GradeScreen")
      //   "SuperAdminListSubject",{
      //   screen: "SuperAdminListSubject",
      //   params: id,
      // })
      if (mutationError) {
        console.log(mutationError);
        return false;
      }
      return alert(
        `El profesor ${name} ${lastname} fue agregado exitosamente!`
      );
    } catch (err) {
      console.error("soy el catch", err);
    }
  };



  if (loading || mutationLoading)
  { return (
    <CenterView>
        <ActivityIndicator />
      </CenterView>
    );}
    
    if (data) {
      const { teachers } = data;
      return (
        
      <ScrollView>
        <CenterView>
        <View style={styles.principal}>
        <Card>
          <Card.Title>Profesor para</Card.Title>
          <Card.Divider />
        {teachers.map((teacher, i) =>{
         // {isTeacher=false}
          return(
            <Card key={teacher._id} style={styles.card}>
            <Text style={styles.prof}>{teacher.name} {teacher.lastname}</Text>
            <TouchableHighlight
            style={styles.onPress}
            onPress={()=>handleOnPress(teacher._id, id,
              teacher.name, teacher.lastname)}
            >
              <Text style={styles.cardT}>Agregar</Text>
            </TouchableHighlight>
          </Card>
          )
        })}
        </Card>
        </View>
        </CenterView>
      </ScrollView>
    );
  } else if (error  || mutationError)
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
  // cardcont: {
  //   display: "flex",
  //   flexDirection: "column",
  // },
  prof: {
    fontSize: 17,
   },
  // img: {
  //   width: 14,
  //   height: 14,
  //   marginTop: 10,
  //   marginRight: 25,
  // },
  // name: {
  //   fontSize: 16,
  //   width: 280,
  //   // fontFamily: "roboto",
  //   color: "#000000",
  //   marginLeft: 10,
  //   fontWeight: "bold",
  // },
  // desc: {
  //   flexDirection: "row",
  // },
  // description: {
  //   fontSize: 14,
  //   // fontFamily: "roboto",
  //   color: "#000000",
  //   marginLeft: 10,
  // },
  // touchText: {
  //   marginTop: 15,
  //   marginBottom: 15,
  //   // fontFamily: "roboto",
  //   fontSize: 14,
  //   alignItems: "flex-start",
  //   color: "#2290CD",
  // },
  // touch: {
  //   justifyContent: "flex-start",
  //   margin: 5,
  //   marginLeft: 12,
  // },
  onPress: {
    backgroundColor: "#2290CD",
    padding: 7,
    borderRadius: 7,
    alignItems: "center",
    marginTop: 2
  },
  cardT: {
  color: "white",}
});