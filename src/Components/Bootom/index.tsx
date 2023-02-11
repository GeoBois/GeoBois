/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text} from 'react-native';

interface IBootomProps {
  buscar(): void;
    latitude: number;
    longitude: number;
}


const Bootom = ({ buscar, latitude, longitude }: IBootomProps) => {
  console.log('bootom', {latitude, longitude});
  return (
  <View style={styles.container}>
    <TouchableOpacity style={styles.botao} onPress={buscar}>
      <Text>
        Buscar
      </Text>
    </TouchableOpacity>
    <View style={styles.coordenadas}>
      <Text>Latitude: {latitude}</Text>
      <Text>Longitude: {longitude}</Text>
    </View>
    <View style={styles.menu}>
      <Text>Home</Text>
      <Text>Minha Localização</Text>
      <Text>Pontos de referencias</Text>
    </View>
  </View>
  );
}

export default Bootom;

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: '100%',
    backgroundColor: '#E5F5EA',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  botao: {
    width: 139,
    height: 41,
    backgroundColor: '#E5F5E',
    borderColor: '#455A64',
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,

  },
  menu: {
    width: '100%',
    height: 85,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    backgroundColor: '#36E0A2',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  coordenadas: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 7,
  },
});
