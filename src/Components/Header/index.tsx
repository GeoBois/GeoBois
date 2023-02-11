/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, TextInput, Image} from 'react-native';
import Logo from '../../assests/GeoBois.png';

interface IHeaderProps {
  endereco: string;
  setEndereco: (text: string) => void
}

const Header = ({ endereco, setEndereco }: IHeaderProps) => {
  return (
  <View style={Styles.container}>
    <Image source={Logo} style={Styles.logo}/>
    <TextInput style={Styles.input} placeholder="Endereço" value={endereco} onChangeText={text => setEndereco(text)}  placeholderTextColor="#ffff"  />
  </View>
  );
};


export default Header;

const Styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    backgroundColor: '#455A64',
  },

  input: {
    width: 280,
    height: 30,
    borderColor: '#ffff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 20,
    paddingVertical: 5,
    color: '#ffffff',
  },
  logo: {
    width: 221,
    height: 69,
    marginBottom: 47,
  },
});
