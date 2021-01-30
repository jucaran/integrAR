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

//  const EDIT_SUBJECT = gql`
//   mutation EditSubject(
//       $_id: ID!,
//       $teacher: 
//       $_id: ID!
//   ) {
//     editSubject(
//         _id: $_id
//       input: {
//         teacher: { 
//             _id: $_id}
//         }
//     ) {
//         name
//         teacher {
//             _id
//         name
//       }
//     }
//   }
// `;



export default function AddTeacherToSubject ({ navigation, route }) {
  const id = route.params.params.id
  const { data, loading, error } = useQuery(GET_ALL_TEACHERS);
  console.log('soy id', id)

  const handleOnPress = async (teacherId, id, name, lastname) => {
    console.log('soy id', id)
    console.log('soy teacherid', teacherId)
    console.log('soy teacher', name, lastname)
    // try {
    //   await editSubject({
    //     variables: {
    //       _id: id,
    //       teacher: {
    //       _id: teacherId
    //       }
    //     },
    //     refetchQueries: [{ query: GET_SUBJECTS_FROM_COURSE_BY_ID }],
    //   });
    //   navigation.navigate("SuperAdminListSubject", {
    //     params: id,
    //   })
    //   if (error) {
    //     console.log(error);
    //     return false;
    //   }
    //   return alert(
    //     `El profesor ${name} ${lastname} fue agregado exitosamente!`
    //   );
    // } catch (err) {
    //   console.error("soy el catch", err);
    // }
  };



  if (loading)
  //  || mutationData.loading)
  { return (
    <CenterView>
        <ActivityIndicator />
      </CenterView>
    );}
    
    if (data) {
      const { teachers, courses, subjects } = data;
      return (
        
      <ScrollView>
        <CenterView>
        <View style={styles.principal}>
        {teachers.map((teacher, i) =>{
         // {isTeacher=false}
          return(
          <View key={teacher._id}>
            <Text>{teacher.name} {teacher.lastname}</Text>
            {console.log('soy id', id)}
    {console.log('soy teacherid', teacher._id)}
    {console.log('soy teacher', teacher.name, teacher.lastname)}
            <TouchableHighlight
            onPress={handleOnPress(teacher._id, id, teacher.name, teacher.lastname)}
            >
              <Text>Agregar</Text>
            </TouchableHighlight>
          </View>
          )
        })}
            
          {/* <FlatList
          data={teachers}
          extraData={isTeacher}
          renderItem={({ item: teacher }) => {
            isTeacher=false
            return (
              <Card key={teacher._id} style={styles.card}>
                  {console.log(isTeacher)}
                  <View style={styles.cardcont}>
                    <View style={styles.prof}>
                      <Text style={styles.name}>
                        {teacher.name} {teacher.lastname}
                      </Text>
                      <Switch style={styles.switch}
                      trackColor={{ false: "#767577", true: "#2290CD" }}
                      thumbColor={isTeacher ? "#8FC6E4" : "#f4f3f4"}
                      value={isTeacher}
                      onValueChange={() =>setIsTeacher(true)}/>
                     </View>
                    </View>
                </Card>
              );
            }}
            keyExtractor={({ _id }) => _id}
          /> */}
        </View>
        </CenterView>
      </ScrollView>
    );
  } else if (error)//  || mutationData.error)
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
  cardcont: {
    display: "flex",
    flexDirection: "column",
  },
  prof: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 14,
  },
  img: {
    width: 14,
    height: 14,
    marginTop: 10,
    marginRight: 25,
  },
  name: {
    fontSize: 16,
    width: 280,
    // fontFamily: "roboto",
    color: "#000000",
    marginLeft: 10,
    fontWeight: "bold",
  },
  desc: {
    flexDirection: "row",
  },
  description: {
    fontSize: 14,
    // fontFamily: "roboto",
    color: "#000000",
    marginLeft: 10,
  },
  touchText: {
    marginTop: 15,
    marginBottom: 15,
    // fontFamily: "roboto",
    fontSize: 14,
    alignItems: "flex-start",
    color: "#2290CD",
  },
  touch: {
    justifyContent: "flex-start",
    margin: 5,
    marginLeft: 12,
  },
});