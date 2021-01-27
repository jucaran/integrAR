import React from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import {
  View,
  ActivityIndicator,
  Text,
  Image,
  TouchableHighlight,
} from "react-native";
import CenterView from "../utils/CenterView";
import { gql, useQuery } from "@apollo/client";
import { Card, ListItem, Button, Icon, Avatar } from "react-native-elements";

const GET_ALL_SUBJECTS = gql`
  {
    subjects {
      _id
      name
    }
  }
`;

const SuperAdminListSubjects = ({ navigation }) => {
  const { data, loading, error } = useQuery(GET_ALL_SUBJECTS);
  if (data) {
    const { subjects } = data;

    return (
      <ScrollView>
        <View
          style={{
            flex: 1,
            padding: 5,
          }}
        >
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="ligthgrey"
            onPress={() =>
              navigation.navigate("Courses", {
                screen: "SuperAdminAddSubject",
              })
            }
          >
            <Text
              style={{
                fontSize: 25,
                // marginBottom: 20,
                // marginTop: 20,
                marginLeft: 20,
              }}
            >
              Agregar Materia
            </Text>
          </TouchableHighlight>
          {subjects.length ? (
            // <Card>
            //   <Card.Title>MATERIAS</Card.Title>
            //   <Card.Divider />
            //   {subjects.map(({ name, _id }, i) => {
            //     //_id name __typename
            //     return (
            //       <View key={_id}>
            //         <Text>{name}</Text>
            //       </View>
            //     );
            //   })}
            // </Card>
            <Card containerStyle={{ padding: 0 }}>
              {subjects.map(({ name, _id }, i) => (
                <ListItem key={i}>
                  <Avatar
                    source={{
                      uri:
                        "https://static.wikia.nocookie.net/simpsons/images/b/bd/Homer_Simpson.png/revision/latest/top-crop/width/360/height/360?cb=20201222215437",
                    }}
                  />
                  <ListItem.Content>
                    <ListItem.Title>{name}</ListItem.Title>
                    {/* <ListItem.Subtitle></ListItem.Subtitle> */}
                  </ListItem.Content>
                </ListItem>
              ))}
            </Card>
          ) : (
            <CenterView>
              <Text>ERROR, NO HAY MATERIAS</Text>
            </CenterView>
          )}
        </View>
      </ScrollView>
    );
  } else if (error)
    return (
      <View>
        <Text>ERROR</Text>
      </View>
    );
  else
    return (
      <CenterView>
        <ActivityIndicator size="large" />
      </CenterView>
    );
};
export default SuperAdminListSubjects;
