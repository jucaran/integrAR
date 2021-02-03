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
import { GET_ALL_CLASSES_MODULES } from "./TeacherListClasses"



const ADD_CLASS = gql`
  mutation CreateClass($input: ClassInput) {
    createClass(input: $input) {
      _id
      name
      module {
        _id 
        name
      }
    }
  },
`

function AddClassToModule({ navigation, route }) {
  const  _id  = route.params.params.id;
  const [createClass, {error}] = useMutation(ADD_CLASS);
  const [clase, setClase] = useState({
    name: "",
  });
 
    
  const handleChange = (prop, value) => {
    setClase({ ...clase, [prop]: value});
  };
  
  const handleOnPress = async ({
    name,
  }) => {
    try {
      await createClass({
        variables: {
          input:{
            name,
            subject:_id
          }
        },
        refetchQueries: [{ query: GET_ALL_CLASSES_MODULES, variables: {_id: _id} }]
      })
      

      Alert.alert(
        "Excelente!",
        `La clase ${name} fue agregada exitosamente!`,
        [
          {
            text: "Ok",
            onPress: () => navigation.navigate("TeacherListClasses")
          }
        ]
      )
    } catch (err) {
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
        <Text style={styles.title}>Agregar Clase</Text>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={clase.classInput}
            onChangeText={(value) => handleChange("name", value)}
          />
        </View>
        <View>
          <Button
            style={styles.button}
            title="Agregar Clase"
            onPress={() => handleOnPress(clase, _id)}
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


export default AddClassToModule;
