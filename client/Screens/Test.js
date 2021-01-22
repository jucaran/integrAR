import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useQuery, gql } from "@apollo/client";
import { Avatar, ListItem } from "react-native-elements";
const QUERY = gql`
  query {
    course {
      title
      author
      url
    }
  }
`;

export default () => {
  const { loading, error, data } = useQuery(QUERY);
  console.log(data);
  return (
    <View style={styles.container}>
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error</Text>}
      {data?.course?.length ? (
        data.course.map((dato) => {
          console.log(dato);
          return (
            <ListItem>
              <Avatar
                source={{ uri: "https://picsum.photos/200/300" }}
                rounded={true}
              />
            </ListItem>
          );
        })
      ) : (
        <Text>Error</Text>
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
