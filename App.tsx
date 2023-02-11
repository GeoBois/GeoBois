import React from 'react';
import HomeScreen from './src/pages/Home/index';
import {enableLatestRenderer} from 'react-native-maps';

enableLatestRenderer();

function App() {
  return <HomeScreen />;
}

export default App;
