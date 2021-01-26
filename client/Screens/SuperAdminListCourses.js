import React, { useState } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { Card } from "react-native-paper";
import { gql, useQuery } from "@apollo/client";
import CenterView from "../utils/CenterView";

export const GET_ALL_COURSES = gql`
  query GetCoursesFromAGrade($_id: ID) {
    grades(_id: $_id) {
      _id
      name
      courses {
        _id
        name
      }
    }
  }
`;

const SuperAdminListCourses = ({ navigation, route }) => {
  const { id: _id } = route.params.params;
  const { data, loading, error } = useQuery(GET_ALL_COURSES, {
    variables: { _id },
  });
  const arrCour = [];

  if (loading)
    return (
      <CenterView>
        <ActivityIndicator size="large" />
      </CenterView>
    );

  if (data) {
    console.log(data);
    const courses = data.grades[0].courses;

    return (
      <ScrollView>
        <View style={styles.cont}>
          <TouchableHighlight
            activeOpacity={0.6}
            style={styles.touch}
            underlayColor="ligthgrey"
            onPress={() =>
              navigation.navigate("SuperAdminAddCourse", {
                screen: "SuperAdminAddCourse",
                params: id,
              })
            }
          >
            <Text style={styles.touchText}>Agregar Curso</Text>
          </TouchableHighlight>
          {courses.forEach((course) => {
            if (course.grade?._id === id) arrCour.push(course._id);
          })}
          {console.log(arrCour)}
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="ligthgrey"
            style={styles.touch}
            onPress={() =>
              navigation.navigate("SuperAdminAddSubject", {
                screen: "SuperAdminAddSubject",
                params: arrCour,
              })
            }
          >
            <Text style={styles.touchText}>Agregar Materia</Text>
          </TouchableHighlight>
          <FlatList
            data={courses}
            renderItem={(item) => {
              if (item.item.grade?._id === id) {
                return (
                  <Card key={item.item._id} style={styles.card}>
                    <Text style={styles.cardText}>{item.item.name}</Text>
                  </Card>
                );
                //  keyExtractor={({ item._id }) => item._id}
              }
              // else {
              //   return(<CenterView>
              //     <Text>No hay cursos agregados para este grado</Text>
              //   </CenterView>)}
            }}
          />
        </View>
      </ScrollView>
    );
  } else if (error)
    return (
      <View>
        <Text>ERROR</Text>
      </View>
    );
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
  cardText: {
    fontSize: 20,
    padding: 10,
  },
});

export default SuperAdminListCourses;
