import React from "react";
import CenterView from "../../utils/CenterView";
import { Card } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { gql, useQuery } from "@apollo/client";
import { FlatList } from "react-native-gesture-handler";

export const GET_ALL_MODULES_SUBJECT = gql`
  query GetModulesFromSubjects($_id: ID) {
    subjects(_id: $_id) {
      _id
      name
      modules {
        _id
        name
      }
      teacher{
        name
        lastname
      }
    }
  }
`;


const SutudentSubjectDetail = ({ navigation, route }) => {
  const _id  = route.params.params.id;
  console.log(_id)

  const { data, loading, error } = useQuery(GET_ALL_MODULES_SUBJECT, {
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
    console.log(data)
    const { modules } = data.subjects[0];

    return (
      <ScrollView>
        <View style={styles.cont}>
        <CenterView>
          <Text>Materia: {data.subjects[0].name}. Profesor: {data.subjects[0].teacher.name} {data.subjects[0].teacher.lastname}</Text>
        </CenterView>
            <Card>
              <Card.Title>Unidades</Card.Title>
              <Card.Divider />
          {modules.length ? (
              <FlatList
              data={modules}
              renderItem={({ item }) => {
                return (
                  <View key={item._id} style={styles.cardIn}>
                  <TouchableHighlight
                    style={styles.button}
                    activeOpacity={0.6}
                    underlayColor="white"
                    onPress={() =>
                      navigation.navigate("StudentListClasses", {
                        params: { id: item._id },
                      })
                    }
                  >
                    <Text style={styles.textHigh}>{item.name}</Text>
                  </TouchableHighlight>
                </View>
                );
               }}
               keyExtractor={({ _id }) => _id}
               />
               ) : (
                 <CenterView>
              <Text>NO HAY UNIDADES EN ESTA ASIGNATURA</Text>
            </CenterView>
          )}
          </Card>
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

  onPress: {
    backgroundColor: "#DE2525",
    padding: 7,
    borderRadius: 7,
    alignItems: "center",
    minWidth: 40,
    minHeight: 39,
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
    justifyContent: "center",
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
export default SutudentSubjectDetail;


