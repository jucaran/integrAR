import React, { useState } from "react";
import { render } from "react-dom";
import { View, Text, StatusBar } from "react-native";
import { Avatar } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import { Card } from "react-native-paper";

const SuperAdminListCourses = () => {
  const [cursos, setCursos] = useState([
    { title: "Primer Año 1" },
    { title: "Segundo Año 2" },
    { title: "Tercer Año 3" },
    { title: "Cuarto Año 4" },
    { title: "Quinto Año 5" },
    { title: "Sexto Año 6" },
  ]);
  return (
    <View
      style={{ flex: 1, padding: 5, marginTop: StatusBar.currentHeight || 0 }}
    >
      <Text
        style={{
          fontSize: 25,
          marginBottom: 20,
          marginTop: 20,
          marginLeft: 20,
        }}
      >
        Cursos
      </Text>
      <FlatList
        data={cursos}
        renderItem={({ item, index }) => {
          return (
            <Card
              key={index}
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
                {item.title}
              </Text>
            </Card>
          );
        }}
        keyExtractor={({ item }) => item}
      />
    </View>
  );
};

export default SuperAdminListCourses;
