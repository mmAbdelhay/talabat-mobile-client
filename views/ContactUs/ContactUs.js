import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import styled from "styled-components";
import IntlPhoneInput from "react-native-intl-phone-input";
import { contactus } from "../../services/AxiosRequests";

export default function ContactUs({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [msg, setMsg] = useState("");

  const sendMsg = async () => {
    const payload = {
      name: name,
      email: email,
      mobile: mobile,
      message: msg,
    };
    console.log(payload);
    if (name && email && mobile && msg) {
      let response = await contactus(payload);
      if (response) {
        Alert.alert("Message sent successfully", `${response?.Message}`, [
          {
            text: "ok",
            onPress: () => navigation.navigate("Home"),
          },
        ]);
      } else {
        Alert.alert(`form is invalid`);
      }
    } else {
      Alert.alert(`cant send with empty fields`);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <ScrollView style={{ marginTop: "15%", marginBottom: "13%" }}>
        <View style={styles.container}>
          <Input
            placeholder="Name"
            placeholderTextColor="#003f5c"
            onChangeText={(name) => setName(name)}
          />
          <Input
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setEmail(email)}
          />
          <View style={styles.mobileView}>
            <IntlPhoneInput
              placeholder="Mobile"
              onChangeText={(value) => {
                let phone = value.unmaskedPhoneNumber;
                if (phone.charAt(0) === "0")
                  phone = phone.substring(1, phone.length);
                setMobile(value.selectedCountry.dialCode + phone);
              }}
              defaultCountry="EG"
            />
          </View>
          <Input
            placeholder="message"
            multiline={true}
            placeholderTextColor="#003f5c"
            style={{ height: 200 }}
            onChangeText={(msg) => setMsg(msg)}
          />
          <TouchableOpacity style={styles.loginBtn} onPress={sendMsg}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Send</Text>
          </TouchableOpacity>
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
