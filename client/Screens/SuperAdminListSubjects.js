import React from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import {
  View,
  ActivityIndicator,
  Text,
  StatusBar,
  TouchableHighlight,
} from "react-native";
import { Card } from "react-native-paper";
import CenterView from "../utils/CenterView";
// import { gql, useQuery } from "@apollo/client";

// const GET_ALL_SUBJECTS = gql`
//   {
//     courses {
//       _id
//       name
//     }
//   }
// `;

const SuperAdminListSubjects = () => {
  // const { data, loading, error } = useQuery(GET_ALL_SUBJECTS);

  if (data) {
    // const { courses } = data;
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
      <CenterView>
        <ActivityIndicator size="large" />
      </CenterView>
    );
};
export default SuperAdminListSubjects;
