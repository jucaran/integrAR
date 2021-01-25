import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, Button } from "react-native";

function AddStudentScreen({navigation}) {
    const [student, setStudent] = useState({
        photo: '',
        name: '',
        address: '',
        email: '',
        birthdate: '',
        phone: '',
        dni: ''
    })
    const handleChange = (name, value) => {
        setStudent({...student, [name]: value})
    }

    return ( 
        <ScrollView>
            <View style={styles.form} >
                <Text>Datos del Alumno</Text>

                <View>
                    <TextInput placeholder="Nombre" onChangeText={(value) => handleChange('name', value)}/>
                </View>
                <View>
                    <TextInput placeholder="Email" onChangeText={(value) => handleChange('email', value)}/>
                </View>
                <View>
                    <TextInput placeholder="Telefono" onChangeText={(value) => handleChange('phone', value)}/>
                </View>
                <View>
                    <TextInput placeholder="Direccion" onChangeText={(value) => handleChange('address', value)}/>
                </View>
                <View>
                    <TextInput placeholder="Fecha de Nacimiento" onChangeText={(value) => handleChange('birthdate', value)}/>
                </View>
                <View>
                    <TextInput placeholder="Foto" onChangeText={(value) => handleChange('photo', value)}/>
                </View>
                <View>
                    <TextInput placeholder="DNI" onChangeText={(value) => handleChange('dni', value)}/>
                </View>
                <View>
                    <Button title="Agregar Alumno" onPress={() => navigation.navigate('AddTeacher')} />
                </View>

            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        margin: 35,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default AddStudentScreen;