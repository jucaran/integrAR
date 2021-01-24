import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { MyStack } from "../App";

const Options = (props) => {
  return (
    <View style={styles.container}>
      <Text>Options</Text>
      <Button
        title="Ir a test2"
        onPress={() => props.navigation.navigate("Test2")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Options;
