/* eslint-disable prettier/prettier */
import React from 'react';
import {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/EvilIcons';

export default function MarkerImpl({onPress, mark}) {
  const color = '#b11';
  return (
    <Marker
      onPress={onPress}
      tracksViewChanges={false} //propriedade que melhora muito a performance do nosso aplicativo, mantendo os marcadores fixados no mapa e eliminando a renderização continua.
      key={mark.place_id} //como temos vários marcadores, devemos adicionar um id para cada
      coordinate={{
        //aqui nós inserimos a localização do marcador no mapa
        latitude: mark?.geometry?.location.lat,
        longitude: mark?.geometry?.location.lng,
      }}
      title={mark.name} //título do marcador
    >
      <Icon name="location" size={70} color={color} />
    </Marker>
  );
}
