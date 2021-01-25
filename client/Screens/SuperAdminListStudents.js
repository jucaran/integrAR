import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";
import CenterView from "../utils/CenterView";
import { useQuery, gql } from "@apollo/client";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-paper";

const GET_STUDENTS = gql`
  {
    students(order_by: "desc", attribute: "lastname") {
      _id
      name
      lastname
    }
  }
`;

function SuperAdminListStudents() {
  const { data, loading, error } = useQuery(GET_STUDENTS);

  if (error)
    return (
      <CenterView>
        <Text>ERROR</Text>
      </CenterView>
    );
  else if (data)
    return (
      <ScrollView>
        <View>
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
              renderItem={({ item: { _id, name, lastname, __typename } }) => {
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
                      Identificador: {_id}
                    </Text>
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
                    <Text
                      style={{
                        fontSize: 20,
                        padding: 10,
                      }}
                    >
                      Tipo: {__typename}
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
  container: {},
});
export default SuperAdminListStudents;
