import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

const Cadastrar = ({ navigation }) => {
  const [mensagem, setMensagem] = useState('');
  const [formData, setFormData] = useState({
    nome: '',
    marca: '',
    numero: '',
    tipo: '',
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleCadastrar = async () => {
    if (!formData.nome || !formData.marca || !formData.numero || !formData.tipo) {
      setMensagem('Todos os campos são obrigatórios!');
      return;
    }

    try {
      const response = await axios.post('http://10.0.2.2:3002/registrar', formData);

      if (response.status === 201) {
        setFormData('')
        setMensagem('Cadastro efetuado com sucesso!!!');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          setMensagem('Erro de autenticação ao cadastrar!');
        } else {
          console.log(error)
          setMensagem('Erro ao cadastrar');
        }
      } else if (error.request) {
        setMensagem('Não foi possível conectar-se ao servidor. Verifique sua conexão ou se a API está ativa.');
      } else {
        setMensagem('Erro inesperado: ' + error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        onChangeText={(text) => handleInputChange('nome', text)}
        value={formData.nome}
      />
      <TextInput
        style={styles.input}
        placeholder="marca"
        onChangeText={(text) => handleInputChange('marca', text)}
        value={formData.marca}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="numero"
        onChangeText={(text) => handleInputChange('numero', text)}
        value={formData.numero}
      />
      <TextInput
        style={styles.input}
        placeholder="tipo"
        onChangeText={(text) => handleInputChange('tipo', text)}
        value={formData.tipo}
      />

      <View style={styles.buttonsContainer}>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.customButton}
            onPress={handleCadastrar}
          >
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.customButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {mensagem ? <Text style={styles.mensagem}>{mensagem}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '80%',
  },
  buttonsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '40%',
    marginTop: 20,
  },
  button: {
    marginBottom: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  customButton: {
    backgroundColor: '#ff0000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  mensagem: {
    color: 'red',
    marginTop: 10,
  },
});

export default Cadastrar;