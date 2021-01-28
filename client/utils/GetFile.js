import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { useMutation, gql } from "@apollo/client";

const UPLOAD_FILE = gql`
  mutation UploadFile($file: Upload) {
    uploadfile(file: $file) {
      status
    }
  }
`;

export default function GetFile() {
  const [sendFile, { data, loading, error }] = useMutation(UPLOAD_FILE);
  const [file, setFile] = useState();

  const getFile = async () => {
    let res;
    try {
      const fileReceived = await DocumentPicker.getDocumentAsync();
      console.log("file", fileReceived);
      if (fileReceived.type !== "cancel") {
        const fileRaw = await FileSystem.readAsStringAsync(fileReceived.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        console.log("raw", fileRaw);
        setFile(fileRaw);
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );

  if (error)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {console.log(error)}
        <Text>{JSON.stringify(error)}</Text>
      </View>
    );

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity onPress={getFile}>
        <Text>Get .csv file</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => sendFile({ variables: { file } })}>
        <Text>Send .csv file</Text>
      </TouchableOpacity>
    </View>
  );
}
