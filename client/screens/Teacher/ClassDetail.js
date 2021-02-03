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

export const GET_CLASS_BY_ID = gql`
  query GetClassById($_id: ID) {
    classes(_id: $_id) {
      _id
      name
      files
      homework
    }
  }
`;

function ClassDetail({ route }) {
  console.log("route.params: ", route.params )
  const { _id }  = route.params;
  const { data, loading, error } = useQuery(GET_CLASS_BY_ID, {
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
    console.log("data: ", data)
    // const clase = data.clase[0]
 
    return (
      <CenterView>
        <View style={styles.centerView}>
          <View style={styles.principal}>
            <Text style={styles.name}>
              {/* En construcción */}
              Clase: {`${clase.name}`}
            </Text>
            <TouchableHighlight></TouchableHighlight>
            <Text>Archivos: {`${clase.files}`}</Text>
            {/* <Text>Tareas: {`${clase.homework}`}</Text> */}
          </View>
        </View>
      </CenterView> 
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

export default ClassDetail;