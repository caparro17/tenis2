import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const Atualizar = ({ navigation, route}) => {
  const [nome, setNome] = useState('');
  const [marca, setMarca] = useState('');
  const [numero, setNumero] = useState('');
  const [tipo, setTipo] = useState('');

  const id = route.params.id;

  console.log(id);

  const handleAtualizar = () => {
    if (!nome || !marca || !numero || !tipo) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const data = {
      nome,
      marca,
      numero,
      tipo
    };

    axios.patch(`http://10.0.2.2:3001/atualizar/${id}`, data)
      .then(response => {
        Alert.alert('Sucesso', 'Usuário atualizado com sucesso!');
        setNome('');
        setMarca('');
        setNumero('');
        setTipo('');

        navigation.navigate('Home');
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          console.log(error);
          Alert.alert('Erro', 'ID de usuário não encontrado na base de dados.');
        } else {
          Alert.alert('Erro', 'Ocorreu um erro ao atualizar o usuário. Por favor, tente novamente.');
          console.log(error)
        }
      });      
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Atualizar</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="marca"
        value={marca}
        onChangeText={setMarca}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="numero"
        value={numero}
        onChangeText={setNumero}
      />
      <TextInput
        style={styles.input}
        placeholder="tipo"
        value={tipo}
        onChangeText={setTipo}
      />
      <View style={styles.buttonContainer}>
        <Button title="Atualizar" onPress={handleAtualizar} />
        <View style={styles.buttonSpacer} />
        <Button title="Voltar" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: 'white',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonSpacer: {
    width: 10,
  },
});

export default Atualizar;

