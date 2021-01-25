import React, { useState } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { View, Text, StatusBar, TouchableHighlight } from "react-native";
import { Card } from "react-native-paper";
import { gql, useQuery } from "@apollo/client";
/**
 * TODO: Acordarse de cuando hayan grades traerlos tambien o fijarse si son necesarios o no
 */
const GET_ALL_COURSES = gql`
  {
    courses {
      _id
      name
    }
  }
`;

const SuperAdminListCourses = (props) => {
  const { data, loading, error } = useQuery(GET_ALL_COURSES);

  if (data) {
    const { courses } = data;
    return (
      <ScrollView>
        <View
          style={{
            flex: 1,
            padding: 5 /*  marginTop: StatusBar.currentHeight || 0 */,
          }}
        >
          <Text
            style={{
              fontSize: 25,
              // marginBottom: 20,
              // marginTop: 20,
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
                // marginBottom: 20,
                // marginTop: 20,
                marginLeft: 20,
              }}
            >
              Agregar Materia
            </Text>
          </TouchableHighlight>
          <FlatList
            data={courses}
            renderItem={({ item: course }) => {
              return (
                <Card
                  key={course._id}
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
                    {course.name}
                  </Text>
                </Card>
              );
            }}
            keyExtractor={({ _id }) => _id}
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
  else
    return (
      <View>
        <Text>LOADING</Text>
      </View>
    );
};

export default SuperAdminListCourses;
