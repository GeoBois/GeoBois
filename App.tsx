import React from 'react';
import HomeScreen from './src/pages/Home/index';
import {enableLatestRenderer} from 'react-native-maps';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BemVindo } from './src/pages/BemVindo';

enableLatestRenderer();

const Stack = createNativeStackNavigator();
function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen name="login" component={BemVindo} />
        <Stack.Screen name="home"  component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App() {
  return <Router />;
}

export default App;
