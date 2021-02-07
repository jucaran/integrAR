import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import CenterView from "../../utils/CenterView";
import { useQuery, gql } from "@apollo/client";
import * as WebBrowser from "expo-web-browser";
import { LOCAL_IP } from "@env";
import { Card } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

export const GET_STUDENTS = gql`
  {
    students {
      _id
      name
      lastname
      dni
      course {
        _id
        name
      }
    }
  }
`;

export const GET_CLASS_BY_ID = gql`
  query GetClassById($_id: ID) {
    classes(_id: $_id) {
      _id
      name
      deliveries
    }
  }
`;

const StudentsHomeworks = ({ navigation, route }) => {
  const { _id } = route.params;

  const {
    data: dataClass,
    loading: dataClassLoading,
    error: dataClassError,
  } = useQuery(GET_CLASS_BY_ID, {
    variables: { _id },
  });

  const {
    data: dataStudent,
    loading: loadingStudent,
    error: errorStudent,
  } = useQuery(GET_STUDENTS);

  const handleFilePress = (dni) => {
    for(let i = 0; i < dataStudent.students.length; i++) {
      if(dni == dataStudent.students[i].dni) {
        return WebBrowser.openBrowserAsync(
          `http://${LOCAL_IP}:4000/download/students/${_id}/${dni}.pdf`
        );
      }
    }
  };
  const [score, setScore] = useState()
  const numbers = ['1','2','3','4','5','6','7','8','9','10']


  if (dataClassLoading || loadingStudent) {
    return (
      <CenterView>
        <ActivityIndicator size="large" color="#2290CD" />
        <Text>Cargando...</Text>
      </CenterView>
    );
  }

  if (dataClassError || errorStudent) {
    return (
      <CenterView>
        <Text>ERROR</Text>
      </CenterView>
    );
  }

  if (dataClass || dataStudent) {
    const homeworkList = dataClass.classes[0].deliveries;
    const allStudents = dataStudent?.students;
    const dniFromData = dataClass?.classes[0].deliveries.map(
      (el) => el.split(".")[0]
    );

    const estudiante = allStudents.filter((student) => {
      if (dniFromData.includes(student.dni)) {
        return student;
      }
    });

    //Borrar setCorrection y usar la screen TeacherCorrections cuando se pueda
    const setCorrection = (correction) => {
      setScore(correction)
      alert(`La nota es ${correction}`)
    }

    return (
      <View>
        <Text style={styles.name}>Tareas de los Alumnos</Text>
        {homeworkList.length ? (
          <FlatList
            data={(estudiante)}
            renderItem={({ item }) => {
              return (
                <Card style={styles.card} >
                  <View style={styles.cardIn}>
                    <TouchableOpacity 
                      onPress={() => handleFilePress(item.dni)}>
                      <Text style={{color: 'white', fontSize: 15}} >
                        {item.name} {item.lastname} {item.dni}.pdf
                      </Text>
                    </TouchableOpacity>
                    <Text style={{paddingHorizontal: 10, color: 'white', fontSize: 15}} >Nota</Text>
                    <Picker 
                    selectedValue={score}
                    style={{ height: 25, width: 75, color: 'white'}}
                    onValueChange={(value) => setCorrection(value)}
                    >
                      {numbers.map((item, index) => {
                        return (<Picker.Item label={item} value={item} key={index}/>) 
                    })}
                    </Picker>
                  </View>
                </Card>
              );
            }}
            
            keyExtractor={({index}) => index}
          />
        ) : (
          <View>
            <CenterView>
              <Text>Al parecer tus alumnos son un poco irresponsables...</Text>
            </CenterView>
          </View>
        )}
      </View>
    );
  }
};


const styles = StyleSheet.create({
  cont: {
    flex: 1,
    padding: 5,
  },
  card: {
    margin: 5,
    backgroundColor: "#00aadd",
    borderRadius: 10,
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cardIn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    justifyContent: "space-between",
    display: "flex",
    margin: 10,
  },
  button: {
    backgroundColor: "#00aadd",
    padding: 8,
    borderRadius: 13,
    minWidth: 40,
    minHeight: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 30,
    height: 30,
  },
  name: {
    marginBottom: 5,
    marginLeft: 12,
    fontWeight: "bold",
    fontSize: 15,
    alignItems: "flex-start",
  },
});
export default StudentsHomeworks;