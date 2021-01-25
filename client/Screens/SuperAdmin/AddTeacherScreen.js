import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, Button } from "react-native";

function AddTeacherScreen({navigation}) {
    const [teacher, setTeacher] = useState({
        photo: '',
        name: '',
        address: '',
        email: '',
        birthdate: '',
        phone: '',
        dni: ''
    })
    const handleChange = (name, value) => {
        setTeacher({...teacher, [name]: value})
    }

    return ( 
        <ScrollView>
            <View>
                <Text>Datos del Profesor</Text>
            </View>
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
                <Button title="Agregar Profesor" onPress={() => navigation.navigate('AddTeacherForm')} />
            </View>
        </ScrollView>
    )
}

export default AddTeacherScreen;