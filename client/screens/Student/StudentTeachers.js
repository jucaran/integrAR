import React, { useContext } from "react";
import CenterView from "../../utils/CenterView";
import { Card } from "react-native-elements";
import { Linking } from "react-native";
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import { gql, useQuery } from "@apollo/client";
import { FlatList } from "react-native-gesture-handler";
import { AuthContext } from "../../providers/AuthProvider";

export const GET_TEACHERS_FROM_STUDENT = gql`
  query GetTeachersFromStudent($dni: String) {
    students(dni: $dni) {
      _id
      name
      course {
        name
        subjects {
          name
          teacher {
            name
            _id
            lastname
            whatsapp
          }
        }
      }
    }
  }
`;

const StudentTeachers = () => {
  const { user } = useContext(AuthContext);
  const dni = user.dni;
  const { data, loading, error } = useQuery(GET_TEACHERS_FROM_STUDENT, {
    variables: { dni },
  });

  if (loading) {
    return (
      <CenterView>
        <ActivityIndicator size="large" color="#2290CD" />
        <Text>Cargando...</Text>
      </CenterView>
    );
  }

  if (error) {
    return (
      <CenterView>
        <Text>ERROR</Text>
      </CenterView>
    );
  }

  if (data) {
    const teachers = data.students[0].course.subjects;
    return (
      <View style={styles.cont}>
        <Card style={styles.card}>
          <Card.Title>Mis Profesores</Card.Title>
          <Card.Divider />
          {teachers.length ? (
            <FlatList
              data={teachers}
              key={teachers._id}
              renderItem={({ item }) => {
                if (item.teacher) {
                  return (
                    <View style={styles.cardIn} key={item._id}>
                      <Text style={{ fontSize: 18 }}>{item.name}</Text>
                      <Text style={{ fontSize: 18 }}>
                        {item.teacher?.name} {item.teacher?.lastname}
                      </Text>

                      <TouchableHighlight
                        style={styles.button}
                        activeOpacity={0.2}
                        underlayColor=""
                        onPress={async () =>
                          await Linking.openURL(
                            `https://wa.me/${item.teacher?.whatsapp}`
                          )
                        }
                      >
                        <Image
                          key={item.teacher._id}
                          source={require("../../assets/whatsapp.png")}
                          style={styles.img}
                        />
                      </TouchableHighlight>
                    </View>
                  );
                } else {
                  return (
                    <View style={styles.cardIn} key={item._id}>
                      <Text style={{ fontSize: 18 }}>{item.name}</Text>
                      <Text>materia sin profesor</Text>
                    </View>
                  );
                }
              }}
              keyExtractor={({ _id }) => _id}
            />
          ) : (
            <CenterView>
              <Text>NO HAY MATERIAS ASIGNADAS</Text>
            </CenterView>
          )}
        </Card>
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
});
export default StudentTeachers;
