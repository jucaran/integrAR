import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import CenterView from "../../utils/CenterView";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Card } from "react-native-paper";

// export const GET_STUDENTS_FROM_COURSE = gql`
//   query GetStudentsFromACourse($_id: ID) {
//     courses(_id: $_id) {
//       _id
//       name
//       students {
//         _id
//         name
//         lastname
//       }
//     }
//   }
// `;

const StudentsHomeworks = ({ navigation, route }) => {
  // const { _id } = route.params.params;
  // const { data, loading, error } = useQuery(GET_STUDENTS_FROM_COURSE, {
  //   variables: { _id },
  // });

  // if (loading) {
  //   return (
  //     <CenterView>
  //       <ActivityIndicator size="large" color="#2290CD" />
  //       <Text>Cargando...</Text>
  //     </CenterView>
  //   );
  // }

  // if (error) {
  //   return (
  //     <CenterView>
  //       <Text>ERROR</Text>
  //     </CenterView>
  //   );
  // }

  // if (data) {
  //   const students = data.courses[0].students;

    return (
      <View>
        <Text>Lista Alumnos</Text>
      </View>
    );
  }


const styles = StyleSheet.create({
  
});
export default StudentsHomeworks;
