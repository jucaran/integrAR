import React, { useState } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import {
  ActivityIndicator,
  View,
  Text,
  StatusBar,
  TouchableHighlight,
} from "react-native";
import { Card } from "react-native-paper";
import { gql, useQuery } from "@apollo/client";
import CenterView from "../utils/CenterView";

const GET_ALL_COURSES = gql`
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

  if (data) {
    const courses = data.grades[0].courses;

    return (
      <ScrollView>
        <View
          style={{
            flex: 1,
            padding: 5,
          }}
        >
          <Text
            style={{
              fontSize: 25,
              marginLeft: 20,
            }}
          >
            Cursos
          </Text>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="ligthgrey"
            onPress={() =>
              navigation.navigate("Courses", {
                screen: "SuperAdminAddSubject",
              })
            }
          >
            <Text
              style={{
                fontSize: 25,
                marginLeft: 20,
              }}
            >
              Agregar Materia
            </Text>
          </TouchableHighlight>
          {/* MAPPING ALL THE COURSES OF THE GRADE CHOOSED */}
          {courses.length ? (
            <FlatList
              data={courses}
              renderItem={({ item: { _id, name } }) => {
                return (
                  <Card
                    key={_id}
                    style={{
                      margin: 5,
                      backgroundColor: "#00aadd",
                      borderRadius: 10,
                      padding: 20,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        padding: 10,
                      }}
                    >
                      {name}
                    </Text>
                  </Card>
                );
              }}
              keyExtractor={({ _id }) => _id}
            />
          ) : (
            <CenterView>
              <Text>ERROR, NO HAY CURSOS PARA ESTE GRADO</Text>
            </CenterView>
          )}
        </View>
      </ScrollView>
    );
  } else if (error)
    return (
      <View>
        <Text>ERROR</Text>
      </View>
    );
  else
    return (
      <CenterView>
        <ActivityIndicator size="large" />
      </CenterView>
    );
};

export default SuperAdminListCourses;
