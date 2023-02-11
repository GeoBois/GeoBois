/* eslint-disable prettier/prettier */
import React from 'react';
import {Marker} from 'react-native-maps';
import {Image} from 'react-native';
import marker from '../../assests/giphy.gif';

export default function MarkerImpl({onPress, mark}) {
  return (
    <Marker
      onPress={onPress}
      tracksViewChanges={false} //propriedade que melhora muito a performance do nosso aplicativo, mantendo os marcadores fixados no mapa e eliminando a renderização continua.
      key={mark._id} //como temos vários marcadores, devemos adicionar um id para cada
      coordinate={{
        //aqui nós inserimos a localização do marcador no mapa
        latitude: mark.latitude,
        longitude: mark.longitude,
      }}
      title={`Marker_${mark.title}`} //título do marcador
    >
      <Image source={marker} />
    </Marker>
  );
}
