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


export const GET_STUDENTS_FROM_COURSE = gql`
  query GetStudentsFromACourse($_id: ID) {
    courses(_id: $_id) {
      _id
      name
      students {
        _id
        name
        lastname
      }
    }
  }
`;


const TeacherListStudents =({ navigation, route }) => {
  const { id: _id} = route.params.params;
  console.log("soy el id:", _id)
  const { data, loading, error } = useQuery(GET_STUDENTS_FROM_COURSE, {
    variables: { _id }
  });

  if (loading) {
    return (
      <CenterView>
        <ActivityIndicator size="large" color="#2290CD" />
        <Text>Cargando...</Text>
      </CenterView>
    );
  }

  if(error) {
    return (
      <CenterView>
        <Text>ERROR</Text>
      </CenterView>
    )
  }

  if(data) {
    // const students = data.courses[0].students;
    const { students } = data;
    console.log("estos son los estudiantes: ", data)

    
// esto trae data
//     courses: Array(5)
// 0: {__typename: "Course", _id: "6010d7eeb32b4b37a0877eb5", name: "1º A", students: Array(1)}
// 1: {__typename: "Course", _id: "6010d819b32b4b37a0877eb7", name: "1° B", students: Array(0)}
// 2: {__typename: "Course", _id: "6010d838b32b4b37a0877ebb", name: "2° A", students: Array(0)}
// 3: {__typename: "Course", _id: "6010d849b32b4b37a0877ebd", name: "2° B", students: Array(0)}
// 4: {__typename: "Course", _id: "6011af6d26f4941c64553b94", name: "2º D", students: Array(0)}
// length: 5

    return (
      <View style={styles.centerView}>
        <View style={styles.principal}>
          <FlatList
            data={students}
            renderItem={({ item: { students } }) => {
              {console.log("este es el item: ", item)}
              {console.log("estos son los estudiantes: ", students)}
              return (
                <Card key={_id} style={styles.card}>
                  <View style={styles.cardcont}>
                    <View style={styles.alum}>
                      <TouchableHighlight
                      activeOpacity={0.6}
                      onPress = {() => navigation.navigate("StudentDetail_Teacher", {
                        params: _id,
                      })}
                      >
                        <Text style={styles.name}>{`${students}`}</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                </Card>
              );
            }}
            keyExtractor={({ _id }) => _id}
          />
        </View> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
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
  alum: {
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
export default TeacherListStudents;
