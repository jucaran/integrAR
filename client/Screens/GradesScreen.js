import React from "react";
import { View, Text, StyleSheet, TouchableHighlight, ActivityIndicator } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import { gql, useQuery } from "@apollo/client";

const GET_ALL_GRADES = gql`
  {
    grades {
      _id
      name
    }
  }
`;

const GradesScreen = ({navigation}) => {
  const { data, loading, error } = useQuery(GET_ALL_GRADES);
  if (data) {
    const { grades } = data;
    return (
      <ScrollView>
        <View>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="ligthgrey"
            onPress={() =>
              navigation.navigate("Courses", {
                screen: "SuperAdminAddGrade",
              })
            }
            >
            <Text style={styles.text}>Agregar Año</Text>
          </TouchableHighlight>
          <FlatList
            data={grades}
            renderItem={({ item: grade  }) => {
              return (
                <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="ligthgrey"
                onPress={() =>
                      navigation.navigate("SuperAdminListCourses", {
                        screen: "SuperAdminListCourses",  params: { id: grade._id }
                      })
                    }
                    >
                    <Card key={grade._id} style={styles.card}>
                    <Text style={styles.cardText}>{grade.name}</Text>
                    </Card>
                </TouchableHighlight>
                   
                   
              );
            }}
            keyExtractor={({ _id }) => _id}
          />
        </View>
      </ScrollView>
    );
  } else if (error)
    return (
      <View>
        <Text>{JSON.stringify(error)}</Text>
      </View>
    );
  else if (loading)
    return (
      <View>
        <ActivityIndicator/>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 25,
    // marginBottom: 20,
    // marginTop: 20,
    marginLeft: 20,
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
  },
});
export default GradesScreen;
