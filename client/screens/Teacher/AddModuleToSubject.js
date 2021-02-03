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
import { useMutation, gql, useQuery } from "@apollo/client";
import { GET_ALL_MODULES_SUBJECT } from "./TeacherListModules"
import { GET_ALL_SUBJECTS_TEACHER } from "./TeacherListSubjects";


const ADD_MODULE = gql`
  mutation CreateModule($input: ModuleInput) {
    createModule(input: $input) {
      inpiu
      name
      test
      subject {
        _id 
      }
    }
  },
`


// cuando se cree una nueva unidad, asociarle la subject
// creo que en este caso no haría falta editar la subject
// porque no se crea una unidad por si sola


function AddModuleToSubject({ navigation, route }) {
  const { _id } = route.params.params;
  const [createModule, {error}] = useMutation(ADD_MODULE);
  const [unit, setUnit] = useState({
    name: "",
  });
  
  // console.log("id en add ", _id)
  // console.log("Unit: ", unit)
  //console.log("data en add: ", data)
  
  const handleChange = (prop, value) => {
    setUnit({ ...unit, [prop]: value});
  };
  
  const handleOnPress = async ({
    name,
  }) => {
    try {
      console.log("name y id", name, _id)
      await createModule({
        variables: {
          input:{
            name,
            subject:_id
          }
        },
        refetchQueries: [{ query: GET_ALL_MODULES_SUBJECT }]
      });
      

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
      console.log("estoy en catch")
      console.error(err);
    }
  }

  if (error) {
    console.log(error);

    return <View><Text>{JSON.stringify(error)}</Text></View>;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Datos de la Unidad</Text>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={unit.moduleInput}
            onChangeText={(value) => handleChange("name", value)}
          />
        </View>
        <View>
          <Button
            style={styles.button}
            title="Agregar Unidad"
            onPress={() => handleOnPress(unit, _id)}
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


export default AddModuleToSubject;
