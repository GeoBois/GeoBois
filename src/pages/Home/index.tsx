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
  const [latitude, setLatitude] = useState<any>();
  const [longitude, setLongitude] = useState<any>();
  const [pontosRefencia, setPontosReferencia] = useState<[]>([]);
  const [endereco, setEndereco] = useState('');
  const apiKey = 'AIzaSyAlo0EjLzymr_1Jtwsk8Fr108wy7V2Jk5E';
  const mapRef = useRef(null);

  const setCordinates = async() => {
    await mapRef.current.animateToRegion({
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
      ...coords,
    });
    setLatitude(coords.latitude);
    setLongitude(coords.longitude);
  };


  useEffect(() => {
    setCordinates();
  },[coords]);

  useEffect(() => {
    console.log('chamada reference', {latitude, longitude});
    const url =
      `https://maps.googleapis.com/maps/api/place/textsearch/json?location=${latitude}%2C-${longitude}}&query=mercados&radius=5000&key=${apiKey}`;

    fetch(url)
      .then(data => data.json())
      .then(data => {
        console.log('refenreces', data);
        setPontosReferencia(data.results);
      });

  },[latitude, longitude]);

  const buscarEndereco = () => {

    const urlEnderecoBuscado = `https://maps.googleapis.com/maps/api/geocode/json?address=${endereco}&key=${apiKey}`;

    fetch(urlEnderecoBuscado)
    .then(data => data.json())
    .then(data => {
      mapRef.current.animateToRegion({
        latitude: data.results[0]?.geometry.location.lat,
        longitude: data.results[0]?.geometry.location.lng,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
      console.log('latitude busca', data.results[0]?.geometry.location.lat);
      setLatitude(data.results[0]?.geometry.location.lat);
      setLongitude(data.results[0]?.geometry.location.lng);
    });
  };
  console.log('useLocations', coords);
  console.log('coordenadas', {latitude, longitude});
  return (
    <View style={Styles.container}>
    <Header endereco={endereco} setEndereco={setEndereco}  />
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      showsMyLocationButton={true}
      toolbarEnabled={true}
      style={{
        width: '100%',
        flex: 1,
      }}
      initialRegion={{
        ...coords,
        latitude,
        longitude,
        latitudeDelta: 0.195,
        longitudeDelta: 0.1921,
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
