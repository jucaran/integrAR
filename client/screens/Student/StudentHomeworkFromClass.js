import React from "react";
import CenterView from "../../utils/CenterView";
import { useQuery, gql } from "@apollo/client";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableHighlight
} from "react-native";
import { Card } from "react-native-paper";
import { AuthContext } from "../../providers/AuthProvider";

export const GET_CLASS_BY_ID = gql`
  query GetClassById($_id: ID) {
    classes(_id: $_id) {
      _id
      name
      homework
    }
  }
`;

const StudentHomeworkFromClass = ({ navigation, route }) => {
  const _id = route.params?.id;
  const { data, loading, error } = useQuery(GET_CLASS_BY_ID, {
    variables: { _id },
  });
  const { user } = useContext(AuthContext);
  const { dni } = user;

  // const handleFilePress = (name) => {
  //   WebBrowser.openBrowserAsync(`http://${LOCAL_IP}:4000/download/${_id}/${name}`);
  // };

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
    const clase = data.classes[0];
    return (
      <View style={styles.cont}>
        <Text style={styles.name}>Tarea de la {clase.name}</Text>
        {clase.homework ? (
          <CenterView>
          <Text>{clase.homework}</Text>
          <TouchableHighlight
          style={styles.touch}
          activeOpacity={0.2}
          onPress={() =>
            navigation.navigate("UploadDelivery", {
              dni: dni, classId: _id
            })
          }
          >
            <Text>Subir Tarea</Text>
          </TouchableHighlight>
          </CenterView>
        ) : (
          <CenterView>
            <Text>No hay tarea para esta clase</Text>
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
  touchText: {
    marginTop: 15,
    marginBottom: 15,
    // fontFamily: "roboto",
    fontSize: 20,
    alignItems: "flex-start",
    color: "#2290CD",
  },
  name: {
    marginBottom: 5,
    marginLeft: 12,
    fontWeight: "bold",
    fontSize: 15,
    alignItems: "flex-start",
  },
  touch: {
    justifyContent: "flex-start",
    marginLeft: 12,
  },
});

export default StudentHomeworkFromClass;
