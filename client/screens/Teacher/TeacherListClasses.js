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

export const GET_ALL_CLASSES_SUBJECT = gql`
  query GetClassessFromUnits($_id: ID) {
    units(_id: $_id) {
      _id
      name
      classes {
        _id
        name
      } 
    }
  }
`;
const DELETE_CLASS = gql`
  mutation DeleteUnit($_id: ID) {
    deleteClass(_id: $_id) {
      name
    }
  }
`;


const TeacherListClasses = ({ navigation, route }) => {
  console.log("Data ruta ", route);

  const { _id } = route.params.params; // aca llega id de subjects
  // const { data, loading, error } = useQuery(GET_ALL_CLASSES_SUBJECT, {
  //   variables: { _id },
  // });
  // const data = {
  //   units: [
  //     {
  //       _id: "2",
  //       name: "Unidad 1.A",
  //     },
  //   ],
  // };
  console.log("Data unidad ", data);
  const [deleteClass, mutationData] = useMutation(DELETE_CLASS);

  // if (loading || mutationData.loading) {
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

  if (data) {
    const { classes } = data;

    return (
      <ScrollView>
        <View style={styles.cont}>
          <TouchableHighlight
            style={styles.touch}
            activeOpacity={0.6}
            onPress={() => navigation.navigate("AddUnitToSubject")}
          >
            <Text style={styles.touchText}>Agregar Unidad</Text>
          </TouchableHighlight>

          {classes.length ? (
            <Card>
              <Card.Title>Clases de {classes[0].name}</Card.Title>
              <Card.Divider />
              {classes.map((oneClass, i) => {
                return (
                  <View key={oneClass._id} style={styles.cardIn}>
                    <Text style={{ fontSize: 18 }}>{oneClass.name}</Text>
                    <TouchableHighlight
                      style={styles.button}
                      activeOpacity={0.6}
                      onPress={() =>
                        navigation.navigate("TeacherListClassess", {
                          screen: "TeacherListClassess",
                          params: { id: oneClass._id },
                        })
                      }
                    >
                      <Text style={styles.textHigh}>Clases</Text>
                    </TouchableHighlight>
                    <View>
                      <TouchableHighlight
                        activeOpacity={0.6}
                        style={styles.onPress}
                        onPress={() =>
                          Alert.alert(
                            "Eliminar Clase",
                            `¿Está seguro que desea eliminar la clase ${oneClass.name}?`,
                            [
                              {
                                text: "Cancelar",
                                style: "cancel",
                              },
                              {
                                text: "OK",
                                onPress: () =>
                                  deleteClass({
                                    variables: { _id: oneClass._id },
                                    refetchQueries: [
                                      { query: GET_ALL_CLASSESS_SUBJECT },
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
              <Text>NO HAY CLASES EN ESTA UNIDAD</Text>
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
    height: 30,
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
    justifyContent: "space-around",
    width: 334,
    justifyContent: "space-between",
    display: "flex",
    
    // marginTop: 20,
    // marginBottom: 20,
    // maxWidth: 900,
  },
  button: {
    backgroundColor: "#2290CD",
    padding: 5,
    borderRadius: 3,
  },
  buttonDel: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 3,
  },
  buttonEx: {
    backgroundColor: "#2290CD",
    padding: 7,
    borderRadius: 3,
    width: 24,
  },
  textHigh: {
    color: "white",
  },
});
export default TeacherListClasses;
