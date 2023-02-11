/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-shadow */
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
import MapViewDirections from 'react-native-maps-directions';

export default function HomeScreen() {
  const {coords, errorMsg} = useLocation();
  const [latitude, setLatitude] = useState<any>();
  const [longitude, setLongitude] = useState<any>();
  const [pontosRefencia, setPontosReferencia] = useState<[]>([]);
  const [endereco, setEndereco] = useState('');
  const [localDirection, setLocalDirection] = useState<any>(null);
  const apiKey = 'AIzaSyAlo0EjLzymr_1Jtwsk8Fr108wy7V2Jk5E';
  const mapRef = useRef(null);
  const [chamadaApi, setChamadaApi] = useState(false);
  const [distanceAB, setDistanceAB] = useState({
    distance: '',
    duration: '',
  });

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

  const setDistance = (latiDistance: number, longDistance: number) => {
    // console.log('chamando distance', latiDistance, longDistance);
    const urlDistance = `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${latiDistance}%2C${longDistance}&origins=${coords.latitude}%2C${coords.longitude}&key=${apiKey}`;

    fetch(urlDistance)
      .then(data => data.json())
      .then(data => {
        const distance = data.rows[0].elements[0].distance.text;
        const duration = data.rows[0].elements[0].duration.text;
        setDistanceAB({ distance, duration });});
  };

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
      // console.log('latitude busca', data.results[0]);
      setLatitude(data.results[0]?.geometry.location.lat);
      setLongitude(data.results[0]?.geometry.location.lng);
    });
  };

  const buscarReferencias = () => {
    const url =
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=mercado&location=${latitude}%2C${longitude}&radius=500&key=${apiKey}`;

    fetch(url)
      .then(data => data.json())
      .then(data => {
        setPontosReferencia(data.results);
      });
    };

    useEffect(() => {
      buscarReferencias();

    },[chamadaApi, latitude, longitude]);

    const setLocation = (latitude: number, longitude: number) => {
      setLocalDirection({latitude, longitude});
      setDistance(latitude, longitude);
    };

    // console.log('location', localDirection);
    console.log('distance', distanceAB);
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
    >
      {
        pontosRefencia.map((maker) => (
          <MarkerImpl
            key={maker.place_id}
            mark={maker}
            onPress={() => setLocation(maker?.geometry?.location.lat, maker?.geometry?.location.lng)}
          />
        ))
      }

    <MapViewDirections
        strokeWidth={3}
        strokeColor="red"
        origin={coords}
        destination={localDirection}
        apikey={apiKey}
        mode="DRIVING"
      />
    </MapView>
    <Bootom distance={distanceAB} latitude={latitude} longitude={longitude} buscar={endereco ? buscarEndereco : () => {}}/>
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
