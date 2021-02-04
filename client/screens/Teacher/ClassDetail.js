import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableHighlight
} from "react-native";
import CenterView from "../../utils/CenterView";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Card } from "react-native-paper";

export const GET_CLASSES_BY_ID = gql`
  query GetClassesById($_id: ID) {
    classes(_id: $_id) {
      _id
      name
      files
      homework
    }
  }
`;

function ClassDetail({ navigation, route }) {
  const _id  = route.params.params.id;
  const { data, loading, error } = useQuery(GET_CLASSES_BY_ID, {
    variables: { _id },
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
    const clase = data.classes[0]
    //console.log("clase: ", clase)
 
    return (
      <CenterView>
        {/* <View style={styles.centerView}> */}
          <View style={styles.principal}>
            <Text style={styles.name}>
              {/* En construcción */}
              Clase: {`${clase.name}`}
            </Text>
            <TouchableHighlight
              style={styles.button}
              activeOpacity = {0.6}
              onPress = {() => 
              navigation.navigate("FilesFromClass", {
                params: { id: clase._id }
              })}
            >
              <Text style={styles.textHigh}>Archivos</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              activeOpacity = {0.6}
              onPress = {() => 
              navigation.navigate("HomeworkFromClass", {
                params: { id: clase._id }
              })}
            >
            <Text style={styles.textHigh}>Tareas</Text>
            </TouchableHighlight>
          </View>
        {/* </View> */}
      </CenterView> 
    );
  }
}

const styles = StyleSheet.create({
  // centerView: {
  //   flex: 1,
  //   alignItems: "center",
  //   backgroundColor: "white",
  // },
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
    marginLeft: 15,
    marginTop: 10,
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
  button: {
    margin: 15,
    backgroundColor: "#2290CD",
    justifyContent: "center",
    alignItems: "center",
    width: 237,
    height: 50,
    padding: 7,
    borderRadius: 7,
  },
  textHigh: {
    color: "white",
  },
});

export default ClassDetail;