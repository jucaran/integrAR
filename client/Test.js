import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, TextInput } from "react-native";
import { useMutation, useQuery, gql } from "@apollo/client";
import { Button } from "react-native";

const QUERY = gql`
  query {
    course {
      title
    }
  }
`;

const ADD_COURSE = gql`
  mutation AddCourse(
    $title: String
    $author: String
    $topic: String
    $url: String
    $id: Int
  ) {
    addCourse(
      id: $id
      title: $title
      author: $author
      topic: $topic
      url: $url
    ) {
      title
    }
  }
`;

export default () => {
  const [addCourse] = useMutation(ADD_COURSE);
  const [input, setInput] = useState("");
  let aux;

  useEffect(() => {
    const queryRes = useQuery(QUERY);
    aux = queryRes;
  }, []);

  const { loading, error, data } = aux;

  const handleChange = (text) => {
    setInput(text);
  };

  const handleSubmit = async () => {
    const res = await addCourse({ variables: { title: input } });
    console.log(res);
  };

  return (
    <View style={styles.container}>
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error</Text>}
      {console.log(data)}
      <TextInput value={input} onChangeText={(e) => handleChange(e)} />
      <Button title="mandar" onPress={handleSubmit} />
      {data && (
        <FlatList
          // style={[styles.container, { background: "pink" }]}
          contentContainerStyle={[styles.container, { background: "pink" }]}
          data={data.course}
          renderItem={({ item }) => (
            <View /*key={item.id && item.id.toString()}*/>
              <Text>{item.title}</Text>
            </View>
          )}
        />
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
