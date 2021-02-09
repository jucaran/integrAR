import React, { useContext } from "react";
import CenterView from "../../utils/CenterView";
import { useQuery, gql } from "@apollo/client";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableHighlight,
} from "react-native";
import { Card } from "react-native-elements";
import { AuthContext } from "../../providers/AuthProvider";
import { LOCAL_IP } from "@env";
import * as WebBrowser from "expo-web-browser";

export const GET_CLASS_BY_ID = gql`
  query GetClassById($_id: ID) {
    classes(_id: $_id) {
      _id
      name
      homework
      deliveries
    }
  }
`;

const StudentHomeworkFromClass = ({ navigation, route }) => {
  const _id = route.params?._id;
  const { data, loading, error } = useQuery(GET_CLASS_BY_ID, {
    variables: { _id },
  });
  const { user } = useContext(AuthContext);
  const { dni } = user;
  let t = false;

  const handleFilePress = (name) => {
    WebBrowser.openBrowserAsync(
      `http://${LOCAL_IP}:4000/download/teachers/${_id}/${name}`
    );
  };

  const handleFilePress2 = () => {
    WebBrowser.openBrowserAsync(
      `http://${LOCAL_IP}:4000/download/students/${_id}/${dni}`
    );
  };

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
    let studentD = clase.deliveries?.map((dni) => dni.split(".", 1));
    let studentDni = studentD.flat(Infinity);
    studentDni.forEach((student) =>
      student === dni ? (t = true) : (t = false)
    );
    return (
      <View style={styles.cont}>
        <Card>
          <Card.Title>Tarea de la {clase.name}</Card.Title>
          <Card.Divider />
          {clase.homework ? (
            <View>
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor=""
                style={styles.card}
                onPress={() => handleFilePress(clase.homework)}
              >
                <Text style={styles.cardText}>{clase.homework}</Text>
              </TouchableHighlight>
              {t ? (
                <TouchableHighlight
                  style={styles.touch2}
                  activeOpacity={0.2}
                  underlayColor=""
                  onPress={() => handleFilePress2()}
                >
                  <Text style={styles.cardText}>Tarea Subida</Text>
                </TouchableHighlight>
              ) : (
                <TouchableHighlight
                  style={styles.touch}
                  activeOpacity={0.2}
                  underlayColor=""
                  onPress={() =>
                    navigation.navigate("UploadDelivery", {
                      dni: dni,
                      classId: _id,
                    })
                  }
                >
                  <Text style={styles.cardText}>Subir Tarea</Text>
                </TouchableHighlight>
              )}
            </View>
          ) : (
            <CenterView>
              <Text>No hay tarea para esta clase</Text>
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
    fontSize: 14,
    color: "white",
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
    margin: 5,
    backgroundColor: "#DE2525",
    borderRadius: 10,
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  touch2: {
    margin: 5,
    backgroundColor: "darkgreen",
    borderRadius: 10,
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StudentHomeworkFromClass;
