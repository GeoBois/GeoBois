/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import MapView from 'react-native-maps';
import useLocation from '../../hooks/useLocation';
import { Text } from 'react-native';

export default function HomeScreen() {
  const [latitude, setLatitude] = useState(-20.398259);
  const [longitude, setLongitude] = useState(-43.507726); //utilizaremos estas duas variáveis (latitude e longitude) como posições padrão caso não seja possível obter a posição do usuário.

  const {coords, errorMsg} = useLocation();
  console.log('coors', coords); //utilizando o hook que vai nos fornecer a posição do usuário.
  return (
    <MapView
      showsUserLocation={true} //destacando a localização do usuário no mapa
      showsMyLocationButton={true} //ocultando o botão que move o mapa para a localização do usuário
      toolbarEnabled={true} //ocultando opções do google maps ao clicar em objetos do mapa
      style={{
        height: '100%',
        width: '100%',
        position: 'absolute',
        flex: 1,
      }} // Fazendo com que o mapa ocupe a tela inteira
      initialRegion={{
        latitude, //posição inicial do mapa
        longitude, //posição inicial do mapa
        latitudeDelta: 0.195, //determina o zoom do mapa
        longitudeDelta: 0.1921, //determina o zoom do mapa
        ...coords, // Aqui sobrescrevemos as variáveis latitude e longitude com a posição do usuário obtida no hook que criamos para obter a localização.
      }}
      mar
    />
  );
}
