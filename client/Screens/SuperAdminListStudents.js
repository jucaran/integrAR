import React from "react";
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  TouchableHighlight,
} from "react-native";
import CenterView from "../utils/CenterView";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Card } from "react-native-paper";

export const GET_STUDENTS = gql`
  {
    students {
      _id
      name
      lastname
    }
  }
`;

const DELETE_STUDENT = gql`
  mutation DeleteStudent($_id: ID) {
    deleteStudent(_id: $_id) {
      name
    }
  }
`;

function SuperAdminListStudents({ navigation }) {
  const { loading, data, error } = useQuery(GET_STUDENTS);
  const [deleteStudent, mutationData] = useMutation(DELETE_STUDENT);

  if (loading || mutationData.loading)
    return (
      <CenterView>
        <ActivityIndicator size="large" />
      </CenterView>
    );

  if (error || mutationData.error) {
    console.log(error);
    return (
      <CenterView>
        <Text>ERROR</Text>
      </CenterView>
    );
  } else if (data || mutationData.data) {
    const { students } = data;
    return (
      <View style={styles.centerView}>
        <View style={styles.principal}>
          <View style={styles.touch}>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="ligthgrey"
              onPress={() => navigation.navigate("AddStudent")}
            >
              <Text style={styles.touchText}>AGREGAR ALUMNO</Text>
            </TouchableHighlight>
          </View>
          <FlatList
            data={students}
            renderItem={({ item: { _id, name, lastname } }) => {
              return (
                <Card key={_id} style={styles.card}>
                  <View style={styles.cardcont}>
                    <View style={styles.alum}>
                      <Text style={styles.name}>{`${name} ${lastname}`}</Text>
                      <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor="ligthgrey"
                        onPress={() => {
                          navigation.navigate("EditStudent", {
                            studentId: _id,
                          });
                        }}
                      >
                        <Image
                          source={require("../assets/edit.png")}
                          style={styles.img}
                        />
                      </TouchableHighlight>
                      <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor="ligthgrey"
                        onPress={() =>
                          Alert.alert(
                            "Eliminar usuario",
                            `¿Está seguro que desea eliminar al alumno ${name}?`,
                            [
                              {
                                text: "Cancelar",
                                style: "cancel",
                              },
                              {
                                text: "OK",
                                onPress: () =>
                                  deleteStudent({
                                    variables: { _id },
                                    refetchQueries: [{ query: GET_STUDENTS }],
                                  }),
                              },
                            ]
                          )
                        }
                      >
                        <Image
                          source={require("../assets/x.png")}
                          style={styles.img}
                        />
                      </TouchableHighlight>
                    </View>
                  </View>
                </Card>
              );
            }}
            keyExtractor={({ _id }) => _id}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  principal: {
    backgroundColor: "white",
  },
  card: {
    width: 360,
    height: 66,
    margin: 5,
    alignItems: "flex-start",
    flexDirection: "column",
  },
  cardcont: {
    display: "flex",
    flexDirection: "column",
  },
  alum: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 14,
  },
  img: {
    width: 14,
    height: 14,
    marginTop: 10,
    marginRight: 25,
  },
  name: {
    fontSize: 16,
    width: 280,
    // fontFamily: "roboto",
    color: "#000000",
    marginLeft: 10,
    fontWeight: "bold",
  },
  desc: {
    flexDirection: "row",
  },
  description: {
    fontSize: 14,
    // fontFamily: "roboto",
    color: "#000000",
    marginLeft: 10,
  },
  touchText: {
    marginTop: 15,
    marginBottom: 15,
    // fontFamily: "roboto",
    fontSize: 14,
    alignItems: "flex-start",
    color: "#2290CD",
  },
  touch: {
    justifyContent: "flex-start",
    margin: 5,
    marginLeft: 12,
  },
});
export default SuperAdminListStudents;

// <ScrollView>
//   <View style={styles.principal}>
//     <Text
//       style={{
//         fontSize: 25,
//         // marginBottom: 20,
//         // marginTop: 20,
//         marginLeft: 20,
//       }}
//     >
//       Estudiantes
//     </Text>
//     {data.students ? (
//       <FlatList
//         data={data.students}
//         keyExtractor={({ _id }) => _id}
//         renderItem={({ item: { _id, name, dni } }) => {
//           return (
//             <Card
//             key={_id}
//             style={{
//               margin: 5,
//               backgroundColor: "#00aadd",
//               borderRadius: 10,
//               padding: 20,
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//             >
//               <Text
//                 style={{
//                   fontSize: 20,
//                   padding: 10,
//                 }}
//               >
//                 Nombre: {name}
//               </Text>
//               <Text
//                 style={{
//                   fontSize: 20,
//                   padding: 10,
//                 }}
//               >
//                 Apellido: {lastname}
//               </Text>
//             </Card>
//           );
//         }}
//       />
//     ) : (
//       <View>
//         <Text>Nada</Text>
//       </View>
//     )}
//   </View>
// </ScrollView>
