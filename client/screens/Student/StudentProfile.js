import React, { useContext } from "react";
import CenterView from "../../utils/CenterView";
import { AuthContext } from "../../providers/AuthProvider";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useQuery, gql } from "@apollo/client";
import { FlatList } from "react-native-gesture-handler";
import { Card } from "react-native-paper";

export const GET_A_STUDENT = gql`
  query GetAStudent($dni: String) {
    students(dni: $dni) {
      name
      lastname
      _id
      dni
      email
      whatsapp
      address
      birthday
      picture
      course {
        name
      }
    }
  }
`;

const StudentProfile = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { dni } = user;
  const { data, loading, error } = useQuery(GET_A_STUDENT, {
    variables: { dni },
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
    const student = data.students[0];

    return (
      <View style={styles.cont}>
        <Text>Mi Perfil</Text>
        <Text>Editar</Text>
        {student ? (
          <FlatList
            data={[student]}
            renderItem={({ item }) => {
              return (
                <Card key={item._id}>
                  <View >
                    <Text style={styles.cardText}>{item.name}</Text>
                    <Text style={styles.cardText}>{item.lastname}</Text>
                    <Text style={styles.cardText}>{item.dni}</Text>
                    <Text style={styles.cardText}>{item.email}</Text>
                    <Text style={styles.cardText}>{item.whatsapp}</Text>
                    <Text style={styles.cardText}>{item.address}</Text>
                    <Text style={styles.cardText}>{item.birthday}</Text>
                    <Text style={styles.cardText}>{item.picture}</Text>
                    <Text style={styles.cardText}>{item.course.name}</Text>
                    <Text
                      style={styles.cardText}
                      onPress={() => {
                        navigation.navigate("", {
                          params: { _id: item._id },
                        });
                      }}
                    >
                      Editar
                    </Text>
                  </View>
                </Card>
              );
            }}
            keyExtractor={({ _id }) => _id}
          />
        ) : (
          <CenterView>
            <Text>Error</Text>
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
    marginLeft: 12,
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
    color: "black",
  },
  img: {
    color: "white",
    fontSize: 15,
  },
  cardIn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 344,
  },
});

export default StudentProfile;
