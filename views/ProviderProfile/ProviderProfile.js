import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  View,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import styled from "styled-components";
import { ServerIP } from "../../assets/config";
import axios from "axios";
import { Card } from "react-native-elements";

export default function ProviderProfile({ navigation, route }) {
  const id = route?.params?.params?.params?.id;
  const [provider, setProvider] = useState();
  const getProvider = async () => {
    if (id) {
      let response = await axios.get(
        `${ServerIP}/api/v1/guest/lookup/providersinfo/${id}`
      );
      if (response.status === 200) {
        setProvider(response?.data);
      } else {
        Alert.alert(`this provider is على الحميد المجيد`);
      }
    } else {
      return false;
    }
  };

  useEffect(() => {
    getProvider();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <ScrollView style={{ marginTop: "15%", marginBottom: "13%" }}>
        <View style={styles.container}>
          <Card>
            <Text>provider profile</Text>
            <Text>{JSON.stringify(provider)}</Text>
          </Card>
          <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
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
  mobileView: {
    width: 340,
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
});

const Input = styled.TextInput`
  font-size: 20px;
  background-color: #fafafa;
  width: 300px;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
`;
