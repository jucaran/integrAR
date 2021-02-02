import React from "react";
import CenterView from "../../utils/CenterView";
import { useQuery, gql } from "@apollo/client";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";

export const GET_CLASS_BY_ID = gql`
  query GetClassById($_id: ID) {
    class(_id: $_id) {
      _id
      name
      files
    }
  }
`;

const TeacherClassDetails = ({ navigation, route }) => {
  console.log("Ruta classDetails: ", route);
  const { _id: _id } = route.params;
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
    const clase = data.classes[0]

    return (
      <View style={styles.cont}>
        <Text>{clase.name}</Text>
        <TouchableHighlight
          style={styles.button}
          activeOpacity={0.6}
          onPress={() => navigation.navigate("", {params: {_id: clase._id}})}
        >
          <Text  style={styles.buttonText}>Agregar Archivos</Text>
        </TouchableHighlight>
        {clase.files ? (
          <FlatList
            data={clase}
            renderItem={({ item }) => {
              return (
                <Card key={item._id} style={styles.card}>
                  <View style={styles.cardIn}>
                    <Text style={styles.cardText}>{item.name}</Text>
                    <TouchableHighlight
                      activeOpacity={0.6}
                      style={styles.onPress}
                      // onPress={() =>
                      //   Alert.alert(
                      //     "Eliminar archivo",
                      //     `¿Está seguro que desea eliminar este archivo ${item.name}?`,
                      //     [
                      //       {
                      //         text: "Cancelar",
                      //         style: "cancel",
                      //       },
                      //       {
                      //         text: "OK",
                      //         onPress: () =>
                      //           deleteFile({
                      //             variables: { name: item.name },
                      //             refetchQueries: [{ query: GET_CLASS_BY_ID, variables: { _id: clase._id  }}],
                      //           }),
                      //       },
                      //     ]
                      //   )
                      // }
                    >
                      <Text style={styles.img}>X</Text>
                    </TouchableHighlight>
                  </View>
                </Card>
              );
            }}
            keyExtractor={({ _id }) => _id}
          />
        ) : (
          <CenterView>
            <Text>No hay archivos agregados para esta clase</Text>
          </CenterView>
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
  button: {
    margin: 5,
    backgroundColor: "#00aadd",
    borderRadius: 10,
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 20,
    alignItems: "flex-start",
    color: "#2290CD",
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
  cardSee: {
    fontSize: 17,
    padding: 10,
    color: "white",
  },
  cardText: {
    fontSize: 20,
    padding: 10,
    color: "white",
    marginLeft: 20, 
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
  img: {
    color: "white",
    fontSize: 18,
  },
  cardIn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 344,
  },
});

export default TeacherClassDetails;
