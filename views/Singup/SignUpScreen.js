import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  Picker,
  ScrollView,
  Button,
} from "react-native";
import IntlPhoneInput from "react-native-intl-phone-input";
import countryList from "react-select-country-list";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { signUp } from "../../services/AxiosRequests";
import DateTimePicker from "@react-native-community/datetimepicker";

const SignInScreen = ({ navigation }) => {
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Male");
  const options = useMemo(() => countryList().getData(), []);
  const [mobile, setMobile] = useState("");
  const [date, setDate] = useState(new Date(1598051730000));
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    let dateStr = currentDate.toISOString();
    setDate(currentDate);
    setDateOfBirth(dateStr.substr(0, dateStr.indexOf("T")));
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const onSignUp = async () => {
    const payload = {
      name: name,
      email: data.email,
      password: data.password,
      gender: gender,
      country: country,
      mobile: mobile,
      date_of_birth: dateOfBirth,
    };
    console.log(payload);
    if (await signUp(payload)) {
      Alert.alert("Register successfully", `you will redirect to login page`, [
        {
          text: "ok",
          onPress: () => navigation.navigate("Login"),
        },
      ]);
    } else {
      Alert.alert(`invalid form check your fields`);
    }
  };

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#007cff" barStyle="light-content" />
      <ScrollView style={{ marginTop: 100 }}>
        <View style={styles.header}>
          <Text style={styles.text_header}>Signup</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={[styles.footer]}>
          <Text style={[styles.text_footer]}>Username</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="grey" size={20} />
            <TextInput
              placeholder="Your Name"
              placeholderTextColor="#666666"
              style={[styles.textInput]}
              autoCapitalize="none"
              onChangeText={(val) => setName(val)}
            />
          </View>
          <Text style={[styles.text_footer]}>Email</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="grey" size={20} />
            <TextInput
              placeholder="Your Email"
              placeholderTextColor="#666666"
              style={[styles.textInput]}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val)}
              onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          {data.isValidUser ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Username must be 4 characters long.
              </Text>
            </Animatable.View>
          )}

          <Text style={[styles.text_footer]}>Password</Text>
          <View style={styles.action}>
            <Feather name="lock" color="grey" size={20} />
            <TextInput
              placeholder="Your Password"
              placeholderTextColor="#666666"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={[styles.textInput]}
              autoCapitalize="none"
              onChangeText={(val) => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          {data.isValidPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Password must be 6 characters long.
              </Text>
            </Animatable.View>
          )}

          <Text style={[styles.text_footer]}>Mobile</Text>
          <IntlPhoneInput
            onChangeText={(value) => {
              let phone = value.unmaskedPhoneNumber;
              if (phone.charAt(0) === "0")
                phone = phone.substring(1, phone.length);
              setMobile(value.selectedCountry.dialCode + phone);
            }}
            defaultCountry="EG"
          />
          <Text style={[styles.text_footer]}>Date of birth</Text>
          <View>
            <View>
              <Button
                onPress={() => showMode("date")}
                title="enter your date of birth"
              />
            </View>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                style={{ left: "43.9%" }}
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
          </View>

          <Text style={[styles.text_footer]}>Gender</Text>
          <Picker
            selectedValue={gender}
            placeholderTextColor="#666666"
            style={[styles.textInput]}
            autoCapitalize="none"
            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
          >
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>

          <Text style={[styles.text_footer]}>Country</Text>
          <View style={styles.action}>
            <Picker
              selectedValue={country}
              placeholderTextColor="#666666"
              style={[styles.textInput]}
              autoCapitalize="none"
              onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}
            >
              {options?.map((item, index) => {
                return (
                  <Picker.Item
                    key={index}
                    label={item.label}
                    value={item.label}
                  />
                );
              })}
            </Picker>
          </View>

          <View style={styles.button}>
            <TouchableOpacity style={styles.signIn} onPress={onSignUp}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#fff",
                  },
                ]}
              >
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </ScrollView>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#007cff",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    marginTop: 5,
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
    borderRadius: 25,
    height: 50,
    backgroundColor: "#007cff",
    position: "relative",
  },
  signIn: {
    width: "40%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
