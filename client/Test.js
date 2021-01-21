import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useQuery, gql } from "@apollo/client";

const QUERY = gql`
  query {
    course(id: 2) {
      title
      author
      url
    }
  }
`;
export default () => {
  const { loading, error, data } = useQuery(QUERY);
  return (
    <View style={styles.container}>
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error</Text>}
      {console.log(data)}
      {data && (
        <View>
          <Text>{data.course[0].author}</Text>
          <Text>{data.course[0].title}</Text>
          <Text>{data.course[0].url}</Text>
        </View>
      )}
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
