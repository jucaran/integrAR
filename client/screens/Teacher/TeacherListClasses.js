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

export const GET_ALL_CLASSES_MODULES = gql`
  query GetClassesFromModules($_id: ID) {
    modules(_id: $_id) {
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
  mutation DeleteClass($_id: ID) {
    deleteClass(_id: $_id) {
      name
    }
  }
`;


const TeacherListClasses = ({ navigation, route }) => {
  console.log("Data ruta ", route);

  const _id = route.params.params.id; // aca llega id de subjects
  const { data, loading, error } = useQuery(GET_ALL_CLASSES_MODULES, {
    variables: { _id },
  });

  const [deleteClass, {data: mutationData, loading: mutationLoading, error: mutationError}] = useMutation(DELETE_CLASS);

  if (loading || mutationLoading) {
    return (
      <CenterView>
        <ActivityIndicator size="large" color="#2290CD" />
        <Text>Cargando...</Text>
      </CenterView>
    );
  }

  if (error || mutationError) {
    return (
      <CenterView>
        <Text>ERROR</Text>
      </CenterView>
    );
  }

  if (data) {
    // console.log('soy data',data)
    const  classes  = data.modules[0];

    return (
      <ScrollView>
        <View style={styles.cont}>
          <TouchableHighlight
            style={styles.touch}
            activeOpacity={0.6}
            underlayColor=""
            onPress={() => navigation.navigate("AddClassToModule", {params: { id:_id}})}
          >
            <Text style={styles.touchText}>Agregar Clase</Text>
          </TouchableHighlight>

          {classes ? (
            <Card>
              <Card.Title>Clases de {classes.name}</Card.Title>
              <Card.Divider />
              {classes.classes.map((clase, i) => {
                return (
                  <View key={clase._id} style={styles.cardIn}>
                    <Text style={{ fontSize: 18 }}>{clase.name}</Text>
                    <TouchableHighlight
                      style={styles.button}
                      activeOpacity={0.6}
                      onPress={() =>
                        navigation.navigate("ClassDetail", {
                          screen: "ClassDetail",
                          params: { id: clase._id },
                        })
                      }
                    >
                      <Text style={styles.textHigh}>Detalle</Text>
                    </TouchableHighlight>
                    <View>
                      <TouchableHighlight
                        activeOpacity={0.6}
                        style={styles.onPress}
                        onPress={() =>
                          Alert.alert(
                            "Eliminar Clase",
                            `¿Está seguro que desea eliminar la clase ${clase.name}?`,
                            [
                              {
                                text: "Cancelar",
                                style: "cancel",
                              },
                              {
                                text: "OK",
                                onPress: () =>
                                  deleteClass({
                                    variables: { _id: clase._id },
                                    refetchQueries: [
                                      { query: GET_ALL_CLASSESS_MODULES },
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
    justifyContent: "space-between",
    display: "flex",
    margin: 10,
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