import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import styled from "styled-components";
import { login } from "../../services/AxiosRequests";

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignUp = async () => {
    const payload = {
      email: email,
      password: password,
    };
    if (await login(payload)) {
      Alert.alert("Login successfully", `you will redirect to home page`, [
        {
          text: "cancel",
          onPress: () => console.info("canceled"),
        },
        {
          text: "ok",
          onPress: () => navigation.navigate("Home"),
        },
      ]);
    } else {
      Alert.alert(`login failed`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <HeaderText style={{ fontSize: 30 }}>Singup</HeaderText>
      <Input
        placeholder="Email."
        placeholderTextColor="#003f5c"
        onChangeText={(email) => setEmail(email)}
      />
      <Input
        placeholder="Password."
        placeholderTextColor="#003f5c"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <TouchableOpacity style={styles.loginBtn} onPress={onSignUp}>
        <Text style={styles.loginText}>Singup</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#007cff",
  },
  loginText: {
    color: "#fff",
    fontSize: 20,
  },
});

const Input = styled.TextInput`
  font-size: 20px;
  background-color: #d8e4eb;
  width: 300px;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
`;

const HeaderText = styled.Text`
  color: black;
  font-size: 20px;
  margin-bottom: 50px;
`;
