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
import { GET_STUDENTS } from "./SuperAdminListStudents";

const ADD_STUDENT = gql`
  mutation AddStudent(
    $dni: Int!
    $name: String!
    $email: String!
    $lastname: String!
    $whatsapp: String!
    $picture: String
    $address: String
  ) {
    createStudent(
      input: {
        dni: $dni
        name: $name
        lastname: $lastname
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

function AddStudentScreen({ navigation }) {
  const [student, setStudent] = useState({
    name: "",
    lastname: "",
    dni: "",
    email: "",
    whatsapp: "",
    course: "",
    address: "",
    birthday: "",
    picture: "",
  });

  const [createStudent, { error }] = useMutation(ADD_STUDENT);

  const handleChange = (name, value) => {
    setStudent({ ...student, [name]: value });
  };

  const handleOnPress = async ({
    name,
    lastname,
    dni,
    email,
    whatsapp,
    address,
    picture,
  }) => {
    try {
      await createStudent({
        variables: {
          name,
          lastname,
          dni,
          email,
          whatsapp,
          address,
          picture,
        },
        refetchQueries: [{ query: GET_STUDENTS }],
      });
      if (error) {
        console.log(error);
        return false;
      }

      Alert.alert(
        "Excelente!",
        `El alumno ${name} fue agregado exitosamente!`,
        [
          {
            text: "Continuar",
            onPress: () => navigation.navigate("ListStudents"),
          },
        ]
      );
    } catch (err) {
      console.error("soy el catch", err);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Datos del Alumno</Text>

        <View>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            onChangeText={(value) => handleChange("name", value)}
          />

          <TextInput
            style={styles.input}
            placeholder="Apellido"
            onChangeText={(value) => handleChange("lastname", value)}
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

          {/* <TextInput style={styles.input} placeholder="Fecha de Nacimiento" onChangeText={(value) => handleChange('birthday', value)}/> */}

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
            title="Agregar Alumno"
            onPress={() => handleOnPress(student)}
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

export default AddStudentScreen;
