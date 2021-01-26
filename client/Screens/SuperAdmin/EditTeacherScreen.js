import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  ActivityIndicator,
} from "react-native";
import { useMutation, gql } from "@apollo/client";
import CenterView from "../../utils/CenterView";

//Falta mandarle el ID para que funque
const EDIT_TEACHER = gql`
  mutation EditTeacher(
    $_id: ID!
    $dni: Int
    $name: String
    $email: String
    $whatsapp: String
    $picture: String
    $address: String
  ) {
    editTeacher(
      _id: $id
      input: {
        dni: $dni
        name: $name
        email: $email
        whatsapp: $whatsapp
        picture: $picture
        address: $address
      }
    ) {
      name
    }
  }
`;

function EditTeacherScreen({ route }) {
  const { teacherId } = route.params;
  const [teacher, setTeacher] = useState({
    picture: "",
    name: "",
    address: "",
    email: "",
    birthdate: "",
    whatsapp: "",
    course: "",
    dni: "",
  });

  const handleChange = (name, value) => {
    setTeacher({ ...teacher, [name]: value });
  };

  const [editTeacher, { data, loading, error }] = useMutation(EDIT_TEACHER);

  const handleOnPress = async ({
    name,
    dni,
    email,
    whatsapp,
    address,
    picture,
  }) => {
    try {
      dni = parseInt(dni);
      await editTeacher({
        variables: {
          _id: teacherId,
          name,
          dni,
          email,
          whatsapp,
          address,
          picture,
        },
      });
      if (error) {
        console.log(error);
        return false;
      }
      return alert(`El profesor ${name} fue actualizado exitosamente!`);
    } catch (err) {
      console.error("soy el catch", err);
    }
  };

  if (loading)
    return (
      <CenterView>
        <ActivityIndicator />
      </CenterView>
    );

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Datos del Profesor</Text>

        <View>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            onChangeText={(value) => handleChange("name", value)}
          />

          {/* <TextInput style={styles.input} placeholder="Curso" onChangeText={(value) => handleChange('course', value)}/> */}

          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(value) => handleChange("email", value)}
          />

          <TextInput
            style={styles.input}
            placeholder="Telefono"
            onChangeText={(value) => handleChange("whatsapp", value)}
          />

          <TextInput
            style={styles.input}
            placeholder="Direccion"
            onChangeText={(value) => handleChange("address", value)}
          />

          {/* <TextInput style={styles.input} placeholder="Fecha de Nacimiento" onChangeText={(value) => handleChange('birthdate', valuepicture */}

          <TextInput
            style={styles.input}
            placeholder="Foto"
            onChangeText={(value) => handleChange("picture", value)}
          />

          <TextInput
            style={styles.input}
            placeholder="DNI"
            onChangeText={(value) => handleChange("dni", value)}
          />
        </View>
        <View>
          <Button
            style={styles.button}
            title="Agregar Profesor"
            onPress={() => handleOnPress(teacher)}
          />
        </View>
      </View>
    </ScrollView>
  );
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
    // padding: 10,
    borderBottomWidth: 2,
    borderColor: "#2290CD",
  },
  button: {
    backgroundColor: "skyblue",
  },
});

export default EditTeacherScreen;
