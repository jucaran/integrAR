import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useMutation, gql, useQuery } from "@apollo/client";
import CenterView from "../../utils/CenterView";
import { GET_STUDENTS } from "./SuperAdminListStudents";

//Falta hacer la query para traer la info del alumno a editar

const EDIT_STUDENT = gql`
  mutation AddStudent(
    $_id: ID
    $name: String
    $lastname: String
    $email: String
    $whatsapp: String
    $picture: String
    $address: String
  ) {
    editStudent(
      _id: $_id
      input: {
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

const GET_STUDENT = gql`
  query Students($_id: ID) {
    students(_id: $_id) {
      _id
      name
      lastname
      email
      whatsapp
      address
      birthday
      picture
    }
  }
`;
function EditStudentScreen({ route, navigation }) {
  const { studentId } = route.params;
  const [student, setStudent] = useState({
    name: "",
    lastname: "",
    email: "",
    whatsapp: "",
    course: "",
    address: "",
    birthday: "",
    picture: "",
  });

  const { data, loading: queryLoading, error: queryError } = useQuery(
    GET_STUDENT,
    {
      variables: {
        _id: studentId,
      },
    }
  );
  const [editStudent, { loading, error }] = useMutation(EDIT_STUDENT);

  const handleChange = (name, value) => {
    setStudent({ ...student, [name]: value });
  };

  const handleOnPress = ({
    name,
    lastname,
    email,
    whatsapp,
    address,
    picture,
  }) => {
    Alert.alert(
      "Editar Alumno",
      `Se sobreescribiran los datos del alumno.
        ¿Desea continuar?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: async () => {
            try {
              // falta agregar el ID para que funque
              await editStudent({
                variables: {
                  _id: studentId,
                  lastname,
                  name,
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
              // return alert(`El alumno ${name} fue actualizado exitosamente!`);

              Alert.alert(
                "Excelente!",
                `El alumno ${name} fue actualizado exitosamente!`,
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
          },
        },
      ],
      { cancelable: false }
    );
    // try {
    //     dni = parseInt(dni);
    //     // falta agregar el ID para que funque
    //     await editStudent({
    //         variables: {
    //             name,
    //             dni,
    //             email,
    //             whatsapp,
    //             address,
    //             picture
    //         },
    //     })
    //     if(error) {
    //         console.log(error)
    //         return false;
    //     }
    //     return alert(`El alumno ${name} fue actualizado exitosamente!`);
    // } catch (err) {
    //     console.error('soy el catch', err);
    // }
  };

  if (queryLoading || loading)
    return (
      <CenterView>
        <ActivityIndicator size="large" color="#2290CD" />
        <Text>Cargando...</Text>
      </CenterView>
    );

  if (error || queryError)
    return (
      <CenterView>
        <Text>{error && JSON.stringify(error)}</Text>
        <Text>{queryError && JSON.stringify(queryError)}</Text>
      </CenterView>
    );

  if (data) {
    console.log(data);
    const [
      { name, lastname, email, whatsapp, address, picture },
    ] = data.students;

    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Datos del Alumno</Text>

          <View>
            <TextInput
              style={styles.input}
              placeholder={name ? `Nombre: ${name}` : "Agregar nombre..."}
              onChangeText={(value) => handleChange("name", value)}
            />

            <TextInput
              style={styles.input}
              placeholder={
                lastname ? `Apellido: ${lastname}` : "Agregar apellido..."
              }
              onChangeText={(value) => handleChange("lastname", value)}
            />

            {/* <TextInput style={styles.input} placeholder="Curso" onChangeText={(value) => handleChange('course', value)}/> */}

            <TextInput
              style={styles.input}
              placeholder={email ? `Apellido: ${email}` : "Agregar email..."}
              onChangeText={(value) => handleChange("email", value)}
            />

            <TextInput
              style={styles.input}
              placeholder={
                whatsapp ? `Teléfono: ${whatsapp}` : "Agregar telefono..."
              }
              onChangeText={(value) => handleChange("whatsapp", value)}
            />

            <TextInput
              style={styles.input}
              placeholder={
                address ? `Direccion: ${address}` : "Agregar dirección..."
              }
              onChangeText={(value) => handleChange("address", value)}
            />

            {/* <TextInput style={styles.input} placeholder="Fecha de Nacimiento" onChangeText={(value) => handleChange('birthday', value)}/> */}

            <TextInput
              style={styles.input}
              placeholder={picture ? `Foto: ${picture}` : "Agregar foto..."}
              onChangeText={(value) => handleChange("picture", value)}
            />
          </View>
          <View>
            <Button
              style={styles.button}
              title="Actualizar Alumno"
              onPress={() => handleOnPress(student)}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
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

export default EditStudentScreen;
