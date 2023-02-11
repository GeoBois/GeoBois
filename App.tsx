import React from 'react';
import HomeScreen from './src/pages/Home/index';
import {enableLatestRenderer} from 'react-native-maps';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { BemVindo } from './src/pages/BemVindo';

enableLatestRenderer();
GoogleSignin.configure({
  webClientId: "622571970286-ugciu6boc7gvbpcnq38ekfspe4sl349g.apps.googleusercontent.com",
  offlineAccess: true
})

function App() {
  return <BemVindo />
}

export default App;
