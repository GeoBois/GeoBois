import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import GeoBoisLight from "../../assests/GeoBoisLight.png";
import GoogleIcone from "../../assests/GoogleIcon.png";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from "@react-native-firebase/auth";

async function signinWithGoogle() {
  const { idToken } = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  return auth().signInWithCredential(googleCredential);
}

export const LoginGoogleBotao: React.FC = () => {
  
  function login() {
    console.log("App faz login com Google");

    (async () => {
      await signinWithGoogle();
    })();
  }
  
  return (
    <TouchableOpacity onPress={login} style={Styles.googleContainer}>
      <View style={Styles.googleBotaoContainer}>
        <View style={Styles.googleImage}>
          <Image source={GoogleIcone} />
        </View>
        <View style={Styles.googleContainerContinuar}>
          <Text style={Styles.googleContinuar}>Continuar</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export const BemVindo: React.FC = () => {
  return (
    <View style={Styles.container}>
      <Image source={GeoBoisLight}/>
      <View style={Styles.center}>
        <Text style={Styles.bemVindoTitulo}>Bem-vindo</Text>
        <Text style={Styles.bemVindoTitulo}>de volta !</Text>
        <Text style={[Styles.descricao, Styles.espacamento]}>Acesse sua conta agora</Text>
        <Text style={Styles.descricao}>mesmo</Text>
      </View>
      <LoginGoogleBotao />
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: 30,
    backgroundColor: "#ffffff"
  },
  bemVindoTitulo: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 36,
    lineHeight: 41,
    color: "#455A64",
    textAlign: "left",
    minWidth: "70%"
  },
  descricao: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 20,
    lineHeight: 23,
    color: "#455A64",
    textAlign: "left"
  },
  center: {
    justifyContent: 'center',
    flex: 0.75
  },
  espacamento: {
    marginTop: 25
  },
  googleContainer: {
    width: "50%",
    height: 50
  },
  googleBotaoContainer: {
    justifyContent: "space-between",
    flex: 1,
    flexDirection: 'row',
  },
  googleImage: {
    backgroundColor: "white",
    justifyContent: "center",
    borderColor: "#455A64",
    borderWidth: 1,
    padding: 4,
    borderRadius: 4,
  },
  googleContainerContinuar: {
    backgroundColor: "#36E0A2",
    flex: 1,
    marginVertical: 4,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#455A64",
    borderWidth: 1,
    borderTopEndRadius: 4,
    borderBottomEndRadius: 4
  },
  googleContinuar: {
    color: "#455A64",
    fontSize: 16,
    lineHeight: 18,
    justifyContent: "center"
  }
});