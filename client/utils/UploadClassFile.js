import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { ReactNativeFile } from "apollo-upload-client";
import { useMutation } from "@apollo/client";
import { UPLOAD_CLASS_FILE } from "./graphql";

export default function UploadClassFile() {
  const [sendFile, { data, loading, error }] = useMutation(UPLOAD_CLASS_FILE);
  const [file, setFile] = useState();

  const pickFile = async () => {
    try {
      const filePicked = await DocumentPicker.getDocumentAsync();

      if (filePicked.type !== "cancel") {
        const nativeFile = new ReactNativeFile({
          uri: filePicked.uri,
          name: filePicked.name,
          type: "*/*",
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
      <TouchableOpacity onPress={pickFile}>
        <Text>Pick file</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          sendFile({
            variables: { file, classId: "601474c919cd38595fb64eb3" },
          })
        }
      >
        <Text>Upload file</Text>
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
