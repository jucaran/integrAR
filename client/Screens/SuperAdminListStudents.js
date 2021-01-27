import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";
import CenterView from "../utils/CenterView";
import { useQuery, gql } from "@apollo/client";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-paper";

export const GET_STUDENTS = gql`
  {
    students {
      _id
      name
      lastname
    }
  }
`;

function SuperAdminListStudents() {
  const { data, loading, error } = useQuery(GET_STUDENTS);

  if (error){
    console.log(error)
    return (
      <CenterView>
        <Text>ERROR</Text>
      </CenterView>
    );}
  else if (data)
    return (
      <ScrollView>
        <View style={styles.principal}>
          <Text
            style={{
              fontSize: 25,
              // marginBottom: 20,
              // marginTop: 20,
              marginLeft: 20,
            }}
          >
            Estudiantes
          </Text>
          {data.students ? (
            <FlatList
              data={data.students}
              keyExtractor={({ _id }) => _id}
              renderItem={({ item: { _id, name, lastname } }) => {
                return (
                  <Card
                  key={_id}
                  style={{
                    margin: 5,
                    backgroundColor: "#00aadd",
                    borderRadius: 10,
                    padding: 20,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        padding: 10,
                      }}
                    >
                      Nombre: {name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        padding: 10,
                      }}
                    >
                      Apellido: {lastname}
                    </Text>
                  </Card>
                );
              }}
            />
          ) : (
            <View>
              <Text>Nada</Text>
            </View>
          )}
        </View>
      </ScrollView>
    );
  else
    return (
      <CenterView>
        <ActivityIndicator size="large" />
      </CenterView>
    );
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
  prof: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 14,
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
export default SuperAdminListStudents;
