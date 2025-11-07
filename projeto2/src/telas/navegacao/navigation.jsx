import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../Aula03/Home';
import Cadastrar from "../Aula03/Cadastrar";
import Listar from "../Aula03/Listar";
import Atualizar from "../Aula03/Atualizar";
import Deletar from "../Aula03/Deletar";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
          <Stack.Screen name="Cadastrar" component={Cadastrar} options={{ headerShown: false }}/>
          <Stack.Screen name="Listar" component={Listar} options={{headerShown:false}}/>
          <Stack.Screen name="Atualizar" component={Atualizar}/>
          <Stack.Screen name="Deletar" component={Deletar} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}