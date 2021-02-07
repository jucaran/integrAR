import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import CenterView from "../../utils/CenterView";
import { useQuery, gql } from "@apollo/client";
import * as WebBrowser from "expo-web-browser";
import { LOCAL_IP } from "@env";
import { Card } from "react-native-paper";

export const GET_STUDENTS = gql`
  {
    students {
      _id
      name
      lastname
      dni
      course {
        _id
        name
      }
    }
  }
`;

export const GET_CLASS_BY_ID = gql`
  query GetClassById($_id: ID) {
    classes(_id: $_id) {
      _id
      name
      deliveries
    }
  }
`;

const StudentsHomeworks = ({ navigation, route }) => {
  const { _id } = route.params;

  const {
    data: dataClass,
    loading: dataClassLoading,
    error: dataClassError,
  } = useQuery(GET_CLASS_BY_ID, {
    variables: { _id },
  });

  const {
    data: dataStudent,
    loading: loadingStudent,
    error: errorStudent,
  } = useQuery(GET_STUDENTS);

  const handleFilePress = (dni) => {
    for(let i = 0; i < dataStudent.students.length; i++) {
      if(dni == dataStudent.students[i].dni) {
        return WebBrowser.openBrowserAsync(
          `http://${LOCAL_IP}:4000/download/students/${_id}/${dni}.pdf`
        );
      }
    }
  };


  if (dataClassLoading) {
    return (
      <CenterView>
        <ActivityIndicator size="large" color="#2290CD" />
        <Text>Cargando...</Text>
      </CenterView>
    );
  }

  if (dataClassError) {
    return (
      <CenterView>
        <Text>ERROR</Text>
      </CenterView>
    );
  }

  if (dataClass) {
    const homeworkList = dataClass.classes[0].deliveries;

    return (
      <View>
        <Text style={styles.name}>Tareas de los Alumnos</Text>
        {homeworkList.length ? (
          <FlatList
            data={homeworkList}
            renderItem={({ item, index }) => {
              return (
                <Card key={index} style={styles.card}>
                  <View style={styles.cardIn}>
                    <TouchableOpacity
                      onPress={() => handleFilePress(item.split(".")[0])}
                    >
                      <Text style={styles.cardText}>
                        {}{item}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Card>
              );
            }}
            keyExtractor={(index) => index}
          />
        ) : (
          <Text>Al parecer tus alumnos son un poco irresponsables...</Text>
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    padding: 5,
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
  cardIn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    justifyContent: "space-between",
    display: "flex",
    margin: 10,
  },
  button: {
    backgroundColor: "#00aadd",
    padding: 8,
    borderRadius: 13,
    minWidth: 40,
    minHeight: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 30,
    height: 30,
  },
  name: {
    marginBottom: 5,
    marginLeft: 12,
    fontWeight: "bold",
    fontSize: 15,
    alignItems: "flex-start",
  },
});
export default StudentsHomeworks;
