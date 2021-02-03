import React, { useState } from "react";
import {
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { ReactNativeFile } from "apollo-upload-client";
import { useMutation } from "@apollo/client";
import { CREATE_TEACHERS_WITH_CSV } from "./graphql";
import { Card } from "react-native-paper";
import { GET_ALL_TEACHERS } from "../screens/SuperAdmin/SuperAdminListTeachers";

export default function CreateTeachersWithCsv() {
  const [sendFile, { data, loading, error }] = useMutation(
    CREATE_TEACHERS_WITH_CSV
  );

  let bigSize = {
    marginBottom: 20,
    width: 600,
    height: 180,
    resizeMode: "center",
  };
  let normalSize = {
    marginBottom: 20,
    width: 300,
    height: 60,
    resizeMode: "center",
  };
  const [file, setFile] = useState();
  const [typeError, setTypeError] = useState();
  const [imageState, setImageState] = useState(normalSize);

  // The courseId should be received by route params
  const pickFile = async () => {
    try {
      const filePicked = await DocumentPicker.getDocumentAsync();

      if (filePicked.type !== "cancel") {
        // We check if the file is .csv if thats not the case we show an error
        if (filePicked.name.slice(-3) !== "csv")
          setTypeError("Please select a .csv file");
        else {
          // If the file is .csv we clear the errors and set the state with a native file
          setTypeError(null);
          const nativeFile = new ReactNativeFile({
            uri: filePicked.uri,
            name: filePicked.name,
            type: "text/csv",
          });

          setFile(nativeFile);
        }
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  const onClick = (a) => {
    setImageState(a ? bigSize : normalSize);
  };

  if (loading)
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );

  if (error)
    return (
      <View style={styles.center}>
        {console.log(error)}
        <Text>{JSON.stringify(error)}</Text>
      </View>
    );

  if (data)
    return (
      <View style={styles.center}>
        <Text>Archivo enviado correctamente</Text>
      </View>
    );

  return (
    <ScrollView centerContent={true} horizontal={true} vertical={true}>
      <View style={styles.center}>
        {/* This img should be clicable and opened in a modal pero ni idea como hacer eso :( */}

        <Text style={styles.title}>Subir Alumnos con archivo .CSV</Text>
        <Text>Ejemplo:</Text>
        <TouchableHighlight
          onPress={() => onClick(imageState.normalSize ? false : true)}
        >
          <Image
            style={imageState}
            source={require("../assets/ejemplocsv.png")}
          />
        </TouchableHighlight>

        {/* If the file is not .csv we show a error message */}
        {typeError && <Text style={{ color: "red" }}>{typeError}</Text>}
        <TouchableHighlight onPress={pickFile} style={styles.onPress}>
          <Text style={styles.btn}>Bajar esquema .csv</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.onPress}
          onPress={() =>
            // First we check that we have a correct file and then we send it
            file &&
            sendFile({
              variables: { file },
              refetchQueries: [{ query: GET_ALL_TEACHERS }],
            })
          }
        >
          <Text style={styles.btn}>Enviar archivo .csv</Text>
        </TouchableHighlight>
        <View style={styles.exampleVw}>
          <Card style={styles.box}>
            <View style={styles.instructionBox}>
              <Text style={styles.underline}>Instrucciones:</Text>
              {/* <Card.Divider /> */}
              <Text style={styles.intruction}>El archivo debe ser .csv</Text>
              <Text style={styles.intruction}>
                La primera fila debe contener solo los titulos de los campos
              </Text>
              <Text style={styles.intruction}>
                Deben estar acomodados en el orden propuesto y sin usar comas
              </Text>
            </View>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = new StyleSheet.create({
  title: {
    marginBottom: 30,
    textDecorationLine: "underline",
    fontSize: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D5D2D2",
    minWidth: 365,
  },
  underline: {
    color: "black",
    textDecorationLine: "underline",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 6,
  },
  onPress: {
    backgroundColor: "#2290CD",
    padding: 7,
    borderRadius: 7,
    alignItems: "center",
    marginRight: 15,
    width: 200,
    height: 52,
    justifyContent: "center",
    margin: 10,
  },
  btn: {
    fontSize: 16,
    alignItems: "flex-start",
    color: "white",
  },

  exampleImg: {
    marginBottom: 20,
    width: 300,
    height: 60,
    resizeMode: "center",
  },
  box: {
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  instructionBox: {
    marginTop: 20,
    marginRight: "auto",
    marginLeft: "auto",
    width: 240,
  },
  intruction: {
    marginBottom: 10,
  },
});
