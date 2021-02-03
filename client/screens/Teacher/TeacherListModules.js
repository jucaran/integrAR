import React from "react";
import CenterView from "../../utils/CenterView";
import { Card } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import {
  View,
  Text,
  TouchableHighlight,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { gql, useQuery, useMutation } from "@apollo/client";
import { assertLeafType } from "graphql";

export const GET_ALL_MODULES_SUBJECT = gql`
  query GetModulesFromSubjects($_id: ID) {
    subjects(_id: $_id) {
      _id
      name
      modules {
        _id
        name
      }
    }
  }
`;

const DELETE_MODULE = gql`
  mutation DeleteModule($_id: ID) {
    deleteModule(_id: $_id) {
      _id
      name
    }
  }
`;

const TeacherListModules = ({ navigation, route }) => {
  const { _id } = route.params.params;

  const { data, loading, error } = useQuery(GET_ALL_MODULES_SUBJECT, {
    variables: { _id },
  });
 
  console.log("data.subjects: ", data.subjects[0].modules); // Este es un array vacio
  const [deleteModule, mutationData] = useMutation(DELETE_MODULE);

  if (loading || mutationData.loading) {
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
  //  const data2 = {
  //   modules: [
  //     {
  //       _id: "1",
  //       name: "Ortografía",
  //     },
  //     {
  //       _id: "2",
  //       name: "Redacción",
  //     },
  //     {
  //       _id: "3",
  //       name: "Poesía",
  //     },
  //   ],
  // };

  if (data) {
    const { modules } = data.subjects[0];
    console.log("modules: ", modules)

    return (
      <ScrollView>
        <View style={styles.cont}>
          <TouchableHighlight
            style={styles.touch}
            underlayColor="ligthgrey"
            activeOpacity={0.6}
            onPress={() =>
              navigation.navigate("AddModuleToSubject", { params: { _id } })
            }
          >
            <Text style={styles.touchText}>Agregar Unidad</Text>
          </TouchableHighlight>

          {modules.length ? (
            <Card>
              <Card.Title>Unidades de {modules[0].name}</Card.Title>
              <Card.Divider />
              {modules.map((module, i) => {
                return (
                  <View key={module._id} style={styles.cardIn}>
                    <Text style={{ fontSize: 18 }}>{module.name}</Text>
                    <TouchableHighlight
                      style={styles.button}
                      activeOpacity={0.6}
                      onPress={() =>
                        navigation.navigate("TeacherListClasses", {
                          screen: "TeacherListClasses",
                          params: { id: module._id },
                        })
                      }
                    >
                      <Text style={styles.textHigh}>Clases</Text>
                    </TouchableHighlight>
                    <View>
                      <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor="ligthgrey"
                        style={styles.onPress}
                        onPress={() =>
                          Alert.alert(
                            "Eliminar Unidad",
                            `¿Está seguro que desea eliminar la unidad ${module.name}?`,
                            [
                              {
                                text: "Cancelar",
                                style: "cancel",
                              },
                              {
                                text: "OK",
                                onPress: () =>
                                  deleteModule({
                                    variables: { _id: module._id },
                                    refetchQueries: [
                                      { query: GET_ALL_MODULES_SUBJECT },
                                    ],
                                  }),
                              },
                            ]
                          )
                        }
                      >
                        <Text style={styles.img}>X</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                );
              })}
            </Card>
          ) : (
            <CenterView>
              <Text>NO HAY UNIDADES EN ESTA ASIGNATURA</Text>
            </CenterView>
          )}
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    padding: 5,
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
    marginLeft: 15,
  },
  onPress: {
    backgroundColor: "#DE2525",
    padding: 7,
    borderRadius: 7,
    alignItems: "center",
    marginRight: 15,
    width: 30,
    height: 32,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
    color: "white",
  },
  cardText: {
    fontSize: 20,
    padding: 10,
    color: "white",
  },
  img: {
    color: "white",
    fontSize: 15,
  },
  cardIn: {
    flexDirection: "row",
    alignItems: "center",
    width: 334,
    justifyContent: "space-between",
    display: "flex",
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#2290CD",
    padding: 5,
    borderRadius: 3,
    //marginLeft: 100,
  },
  textHigh: {
    color: "white",
  },
});
export default TeacherListModules;


