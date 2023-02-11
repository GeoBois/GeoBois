/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect, useRef } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Header from '../../Components/Header';
import useLocation from '../../hooks/useLocation';
import { View, StyleSheet } from 'react-native';
import Bootom from '../../Components/Bootom';
import MarkerImpl from '../../Components/MarkerImpl';

export default function HomeScreen() {
  const {coords, errorMsg} = useLocation();
  const [latitude, setLatitude] = useState(-27.5448985);
  const [longitude, setLongitude] = useState(-48.5023547);
  const [pontos, setPontos] = useState();
  const [endereco, setEndereco] = useState('');
  const apiKey = 'AIzaSyAlo0EjLzymr_1Jtwsk8Fr108wy7V2Jk5E';
  const mapRef = useRef(null);


  function handleRegionChanged(region: { latitude: React.SetStateAction<number>; longitude: React.SetStateAction<number>; }) {
    setLatitude(region.latitude);
    setLongitude(region.longitude);
  }

  useEffect(() => {
    const url =
      `https://maps.googleapis.com/maps/api/place/textsearch/json?location=${latitude}%2C-${longitude}}&query=mercados&radius=500&key=${apiKey}`;

    fetch(url)
      .then(data => data.json())
      .then(data => setPontos(data.results));

  },[]);

  const buscarEndereco = () => {
    const urlEnderecoBuscado = `https://maps.googleapis.com/maps/api/geocode/json?address=${endereco}&key=${apiKey}`;

    fetch(urlEnderecoBuscado)
    .then(data => data.json())
    .then(data => {
      console.log('res',data.results[0].geometry.location);
      setLatitude(data.results[0]?.geometry.location.lat);
      setLongitude(data.results[0]?.geometry.location.lng);
    });
  };

  console.log('endereco', latitude, longitude);
  return (
    <View style={Styles.container}>
    <Header endereco={endereco} setEndereco={setEndereco}  />
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      onRegionChangeComplete={handleRegionChanged}
      showsMyLocationButton={true}
      toolbarEnabled={true}
      style={{
        // height: '100%',
        width: '100%',
        // position: 'absolute',
        flex: 1,
      }}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.195,
        longitudeDelta: 0.1921,
        ...coords,
      }}
    />
    <Bootom latitude={latitude} longitude={longitude} buscar={endereco ? buscarEndereco : () => {}}/>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
});
