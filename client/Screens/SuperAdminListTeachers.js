import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
  ActivityIndicator,
  FlatList,
  Alert,
} from "react-native";
import { Card } from "react-native-paper";
import CenterView from "../utils/CenterView";
import { useQuery, gql, useMutation } from "@apollo/client";

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

const DELETE_TEACHER = gql`
  mutation DeleteTeacher($_id: ID) {
    deleteTeacher(_id: $_id) {
      name
    }
  }
`;

const SuperAdminListTeachers = ({ navigation }) => {
  const { data, loading, error } = useQuery(GET_ALL_TEACHERS);
  const [deleteTeacher, mutationData] = useMutation(DELETE_TEACHER);

  if (loading || mutationData.loading)
    return (
      <CenterView>
        <ActivityIndicator />
      </CenterView>
    );

  if (data) {
    const { teachers, courses, subjects } = data;
    return (
<<<<<<< HEAD
      <ScrollView>
        <CenterView>
        <View style={styles.principal}>
          <View style={styles.touch}>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="ligthgrey"
              onPress={() =>
                navigation.navigate("", { screen: "SuperAdminAddTeacher" })
              }
            >
              <Text style={styles.touchText}>AGREGAR PROFESOR</Text>
            </TouchableHighlight>
          </View>
          <FlatList
            data={teachers}
            renderItem={({ item: teacher }) => {
              return (
                <Card key={teacher._id} style={styles.card}>
                  <View style={styles.cardcont}>
                    <View style={styles.prof}>
                      <Text style={styles.name}>
                        {teacher.name} {teacher.lastname}
                      </Text>
                      <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor="ligthgrey"
                        onPress={() =>
                          navigation.navigate("", {
                            screen: "SuperAdminEditTeacher",
                          })
                        }
                      >
                        <Image
                          source={require("../assets/edit.png")}
                          style={styles.img}
                        />
                      </TouchableHighlight>
                      <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor="ligthgrey"
                        onPress={() =>
                          navigation.navigate("", {
                            screen: "SuperAdminDeleteTeacher",
                          })
                        }
                      >
                        <Image
                          source={require("../assets/x.png")}
                          style={styles.img}
                        />
                      </TouchableHighlight>
                    </View>
                    <View style={styles.desc}>
                      {teacher.subjects?.length > 0 ? (
                        teacher.subjects.map((subject, i) => {
                          return (
                            <Text key={i} style={styles.description}>
                              {subject}
                            </Text>
                          );
                        })
                      ) : (
                        <></>
                      )}
                    </View>
                    <View style={styles.desc}>
                      {teacher.courses?.length > 0 ? (
                        teacher.courses.map((course, i) => {
                          return (
                            <Text key={i} style={styles.description}>
                              {course}
                            </Text>
                          );
=======
      <View style={styles.principal}>
        <View style={styles.touch}>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="ligthgrey"
            onPress={() =>
              navigation.navigate("", { screen: "SuperAdminAddTeacher" })
            }
          >
            <Text style={styles.touchText}>AGREGAR PROFESOR</Text>
          </TouchableHighlight>
        </View>
        <FlatList
          data={teachers}
          renderItem={({ item: teacher }) => {
            return (
              <Card key={teacher._id} style={styles.card}>
                <View style={styles.cardcont}>
                  <View style={styles.prof}>
                    <Text style={styles.name}>
                      {teacher.name} {teacher.lastname}
                    </Text>
                    <TouchableHighlight
                      activeOpacity={0.6}
                      underlayColor="ligthgrey"
                      onPress={() =>
                        navigation.navigate("", {
                          screen: "SuperAdminEditTeacher",
>>>>>>> f68796c77a71c4afdb31e2608e179e0ff9892854
                        })
                      }
                    >
                      <Image
                        source={require("../assets/edit.png")}
                        style={styles.img}
                      />
                    </TouchableHighlight>
                    <TouchableHighlight
                      activeOpacity={0.6}
                      underlayColor="ligthgrey"
                      onPress={() =>
                        Alert.alert(
                          "Eliminar usuario",
                          `¿Está seguro que desea eliminar al profesor ${teacher.name}?`,
                          [
                            {
                              text: "Cancelar",
                              style: "cancel",
                            },
                            {
                              text: "OK",
                              onPress: () =>
                                deleteTeacher({
                                  variables: { _id: teacher._id },
                                  refetchQueries: [{ query: GET_ALL_TEACHERS }],
                                }),
                            },
                          ]
                        )
                      }
                    >
                      <Image
                        source={require("../assets/x.png")}
                        style={styles.img}
                      />
                    </TouchableHighlight>
                  </View>
<<<<<<< HEAD
                </Card>
              );
            }}
            keyExtractor={({ _id }) => _id}
          />
        </View>
        </CenterView>
      </ScrollView>
    );
  } else if (error)
    return (
      <View>
        <Text>ERROR</Text>
=======
                  <View style={styles.desc}>
                    {teacher.subjects?.length > 0 ? (
                      teacher.subjects.map((subject, i) => {
                        return (
                          <Text key={i} style={styles.description}>
                            {subject}
                          </Text>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </View>
                  <View style={styles.desc}>
                    {teacher.courses?.length > 0 ? (
                      teacher.courses.map((course, i) => {
                        return (
                          <Text key={i} style={styles.description}>
                            {course}
                          </Text>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </View>
                </View>
              </Card>
            );
          }}
          keyExtractor={({ _id }) => _id}
        />
>>>>>>> f68796c77a71c4afdb31e2608e179e0ff9892854
      </View>
    );
  } else if (error || mutationData.error)
    return (
      <View>
        <Text>ERROR</Text>
      </View>
    );
};

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

export default SuperAdminListTeachers;
