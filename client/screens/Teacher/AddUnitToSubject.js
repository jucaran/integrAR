import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import { useMutation, gql } from "@apollo/client";
import { GET_ALL_UNITS_SUBJECT } from "./TeacherListUnits"


const ADD_UNIT = gql`
  mutation CreateModule($input: ModuleInput) {
    createModule(input: $input) {
      name,
      subject {
        _id
      }
    }
  }
`


// cuando se cree una nueva unidad, asociarle la subject
// creo que en este caso no haría falta editar la subject
// porque no se crea una unidad por si sola


function AddUnitToSubject({ navigation, route }) {
  // const { id } = route.params.params;
  const [unit, setUnit] = useState({
    name: "",
  });

  const [createUnit, {error}] = useMutation(ADD_UNIT);

  const handleChange = (prop, value) => {
    setUnit({ ...unit, [prop]: value});
  };

  const handleOnPress = async ({
    name,
  }) => {
    try {
      await createUnit({
        variables: {
          name,
        },
        refetchQueries: [{ query: GET_ALL_UNITS_SUBJECT }]
      });
      if (error) {
        console.log(error);
        return false;
      }

      Alert.alert(
        "Excelente!",
        `La unidad ${name} fue agregada exitosamente!`,
        [
          {
            text: "Ok",
            onPress: () => navigation.navigate("TeacherListSubjects")
          }
        ]
      )
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Datos de la Unidad</Text>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            onChangeText={(value) => handleChange("name", value)}
          />
        </View>
        <View>
          <Button
            style={styles.button}
            title="Agregar Unidad"
            onPress={() => handleOnPress(unit)}
          />
        </View>
      </View>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginTop: 2,
  },
  title: {
    fontSize: 15,
    margin: 10,
  },
  input: {
    width: 200,
    height: 50,
    marginBottom: 20,
    borderBottomWidth: 2,
    borderColor: "#2290CD",
  },
  button: {
    backgroundColor: "skyblue",
  },
});


export default AddUnitToSubject;
