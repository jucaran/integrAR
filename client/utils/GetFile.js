import { Text, TouchableOpacity, View } from "react-native";
import DocumentPicker from "expo-document-picker";

const getFile = () => {
  const res = DocumentPicker.getDocumentAsync({
    type: "text/csv",
  });
};

export default function GetFile() {
  return (
    <View>
      <TouchableOpacity onPress={getFile}>
        <Text>Get .csv file</Text>
      </TouchableOpacity>
    </View>
  );
}
