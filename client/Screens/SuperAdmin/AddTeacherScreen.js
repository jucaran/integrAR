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
            <View style={styles.container} >

                <Text style={styles.title}>Datos del Profesor</Text>

                <TextInput style={styles.input} placeholder="Nombre" onChangeText={(value) => handleChange('name', value)}/>

                <TextInput style={styles.input} placeholder="Email" onChangeText={(value) => handleChange('email', value)}/>

                <TextInput style={styles.input} placeholder="Telefono" onChangeText={(value) => handleChange('phone', value)}/>

                <TextInput style={styles.input} placeholder="Direccion" onChangeText={(value) => handleChange('address', value)}/>

                <TextInput style={styles.input} placeholder="Fecha de Nacimiento" onChangeText={(value) => handleChange('birthdate', value)}/>
                
                <TextInput style={styles.input} placeholder="Foto" onChangeText={(value) => handleChange('photo', value)}/>

                <TextInput style={styles.input} placeholder="DNI" onChangeText={(value) => handleChange('dni', value)}/>
            </View>

            <View>
                <Button style={styles.button} title="Agregar Profesor" onPress={() => navigation.navigate('AddTeacherForm')} />
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        marginTop: 2
    },
    title: {
        fontSize: 15,
        margin: 10
    },
    input: {
        height: 25,
        marginBottom: 20,
        padding: 10,
    },
    button: {
        backgroundColor: "skyblue"
    }

})

export default AddTeacherScreen;