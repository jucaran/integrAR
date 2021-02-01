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

export const GET_ALL_UNITS_SUBJECT = gql`
  query GetUnitsFromSubjects($_id: ID) {
    teachers(_id: $_id) {
      _id
      name
      subjects {
        _id
        name
        units {
          _id
          name
        }
      }
    }
  }
`;

const DELETE_UNIT = gql`
  mutation DeleteUnit($_id: ID) {
    deleteUnit(_id: $_id) {
      name
    }
  }
`;

const TeacherListUnits = ({ navigation, route }) => {
  const { _id } = route.params; // aca llega id de subjects
  const { data, loading, error } = useQuery(GET_ALL_UNITS_SUBJECT, {
    variables: { _id },
  });
  const [deleteUnit, mutationData] = useMutation(DELETE_UNIT);

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
    const { units } = data
    // const subjects = data.teachers[0].subjects;
    return (
      <ScrollView>
        <View
          style={{
            flex: 1,
            padding: 5,
          }}
        >
          {units.length ? (
            <Card>
              <Card.Title>
                Unidades de {`nombre del subject`}
              </Card.Title>
              <Card.Divider />
              {units.map((subject, i) => {
                return (
                  <View
                    key={subject._id}
                    style={{
                      justifyContent: "space-between",
                      display: "flex",
                      flexDirection: "row",
                      marginTop: 20,
                      marginBottom: 20,
                      maxWidth: 900,
                    }}
                  >
                    

                    <Text style={{ fontSize: 18 }}>{units.name}</Text>
                    <TouchableHighlight
                      style={styles.button}
                      activeOpacity={0.6}
                      underlayColor="lightgrey"
                      onPress={() =>
                        navigation.navigate("TeacherListUnits", {
                          screen: "TeacherListUnits",
                          params: { id: units._id },
                        })
                      }
                    >
                      <Text style={styles.textHigh}>Unidades</Text>
                    </TouchableHighlight>
                  </View>
                );
              })}
            </Card>
          ) : (
            <CenterView>
              <Text>NO HAY UNIDADES EN ESTA ASIGNATURA</Text>
              <TouchableHighlight
                style={styles.touch}
                activeOpacity={0.6}
                onPress={() => navigation.navigate("AddUnitToSubject")}
              >
                <Text style={styles.touchText}>Agregar Unidad</Text>
              </TouchableHighlight>
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
    // marginLeft: 12,
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
    //width: 334,
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
export default TeacherListUnits;
