import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";
import { useUser } from "../context/UserContext";

const SignUpScreen = ({ navigation }) => {
  const { handleRegister } = useUser();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onPressRegister = () => {
    setError("");
    setLoading(true);
    if (
      username === "" &&
      email === "" &&
      password === "" &&
      confirm_password === ""
    ) {
      setError("Todos o campos são obrigatórios");
      return;
    }
    if (password != confirm_password) {
      setError("Senhas não coencidem");
      return;
    }
    const response = handleRegister(username, email, password);
    setLoading(false);
  };

  const onPressAlreadyHave = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar uma conta</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Nome de usuário"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          secureTextEntry
          placeholder="Senha"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          secureTextEntry
          placeholder="Confirme sua senha"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setConfirm_password(text)}
        />
      </View>
      {error && (
        <View>
          <Text>{error}</Text>
        </View>
      )}
      <TouchableOpacity onPress={onPressRegister} style={styles.registerBtn}>
        <Text style={styles.registerTxt}>Registrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressAlreadyHave}>
        <Text style={styles.alreadyHaveText}>Já tem uma conta?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#ffffff",
    borderRadius: 5,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "#0a0a0a",
  },
  alreadyHaveText: {
    color: "#0a0a0a",
    fontSize: 15,
  },
  registerBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  registerTxt: {
    color: "white",
  },
});

export default SignUpScreen;
