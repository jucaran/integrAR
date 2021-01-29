import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { ReactNativeFile } from "apollo-upload-client";
import { useMutation } from "@apollo/client";
import { UPLOAD_FILE } from "./graphql";

export default function GetFile() {
  const [sendFile, { data, loading, error }] = useMutation(UPLOAD_FILE);
  const [file, setFile] = useState();

  const pickFile = async () => {
    try {
      const filePicked = await DocumentPicker.getDocumentAsync({
        // type: "text/csv",
      });
      console.log("file received: ", filePicked);

      if (filePicked.type !== "cancel") {
        const nativeFile = new ReactNativeFile({
          uri: filePicked.uri,
          name: filePicked.name,
          type: "text/csv",
        });

        setFile(nativeFile);
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
      {console.log(file)}
      <TouchableOpacity onPress={pickFile}>
        <Text>Get .csv file</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => sendFile({ variables: { file } })}>
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
