import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { ReactNativeFile } from "apollo-upload-client";
import { useMutation } from "@apollo/client";
import { CREATE_STUDENTS_WITH_CSV } from "./graphql";

export default function CreateStudentsWithCsv() {
  const [sendFile, { data, loading, error }] = useMutation(CREATE_STUDENTS_WITH_CSV);
  const [file, setFile] = useState();
  const [typeError, setTypeError] = useState();

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
    <View style={styles.center}>
      {/* If the file is not .csv we show a error message */}
      {typeError && <Text style={{ color: "red" }}>{typeError}</Text>}
      <TouchableOpacity onPress={pickFile}>
        <Text>Get .csv file</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          // First we check that we have a correct file and then we send it
          file &&
          sendFile({
            // The courseId should be received by route params
            variables: { file, courseId: "6011af6d26f4941c64553b94" },
          })
        }
      >
        <Text>Send .csv file</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = new StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
