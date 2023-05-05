import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './pages/home';
import DetailResep from './pages/detail';
import Bahan from './pages/bahan';
import React from 'react';
import Cara from './pages/cara';
import ShowGambar from './pages/gambar';
import AddResep from './pages/form/AddResep';
import AddBahan from './pages/form/AddBahan';
import AddCara from './pages/form/AddCara';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown:false}}
        />
        <Stack.Screen name="Detail" component={DetailResep} options={{headerTransparent : true, headerBackButtonMenuEnabled : true, headerTitle : ""}}/>
        <Stack.Screen name="Bahan" component={Bahan} options={{headerTransparent : true, headerBackButtonMenuEnabled : true, headerTitle : ""}}/>
        <Stack.Screen name="Cara" component={Cara} options={{headerTransparent : true, headerBackButtonMenuEnabled : true, headerTitle : ""}}/>
        <Stack.Screen name="AddResep" component={AddResep} options={{headerTransparent : true, headerBackButtonMenuEnabled : true, headerTitle : ""}}/>
        <Stack.Screen name="AddBahan" component={AddBahan} options={{headerTransparent : true, headerBackButtonMenuEnabled : true, headerTitle : ""}}/>
        <Stack.Screen name="AddCara" component={AddCara} options={{headerTransparent : true, headerBackButtonMenuEnabled : true, headerTitle : ""}}/>
        <Stack.Screen name="Gambar" component={ShowGambar}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
