import React, { useState,useRef,useMemo,useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView,
  Button,
  Image
} from "react-native";
import {Picker} from '@react-native-picker/picker';
import * as Animatable from "react-native-animatable";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { updateClientData,axiosGet } from "../../services/AxiosRequests";
import IntlPhoneInput from "react-native-intl-phone-input";
import countryList from "react-select-country-list";
import DateTimePicker from "@react-native-community/datetimepicker";



export default function Account({ navigation }) {
  const ref_input1 = useRef();
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const [phone, setphone] = useState("");

  const clientInfo = async () => {
    let client = await axiosGet("/api/v1/client/info");
    if (client)  await setClient(client?.client);
  };

  const [date, setDate] = useState(new Date(1598051730000));
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [counter, setCounter] = useState(0);

  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(true);
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Male");
  const options = useMemo(() => countryList().getData(), []);
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [client, setClient] = useState(()=>{
    clientInfo();
    
  });

  const [data, setData] = useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });
  useEffect(() => {
   if (counter == 0){
     console.log("------- "+client)
     if (client) setCounter(1)
    setphone('0'+client?.mobile.substring(3, client?.mobile.length))
    setCountry(client?.country)
    // setData(client.data)
    setDateOfBirth(client?.dateOfBirth)
    setMobile(phone)
    setName(client?.name)
    setEmail(client?.email)
    setGender(client?.gender)
   }
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


  const updateAccountData = async () => {
    const payload = {
      name: name,
      email: data.email,
      password: data.password,
      gender: gender,
      country: country,
      mobile: mobile,
      date_of_birth: dateOfBirth,
    };
    if (await updateClientData(payload)) {
      Alert.alert("Updated successfully", `you will redirect to home page`, [
        {
          text: "ok",
          onPress: () => navigation.navigate("Home"),
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
    <SafeAreaView>
        <ScrollView style={[styles.container]}>
        <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  right: 20,
                }}
              >
        <Image
                  source={require("../../assets/icons/login.png")}
                  style={{
                  
                    width: 100,
                    height: 100,
                    tintColor: "#777777",
                  }}
                />
              
          {/* <FontAwesome name="user-o" color="grey" size={20} /> */}
          <Text style={[styles.text_footer]}>Username</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="grey" size={20} />
            <TextInput
                    returnKeyType="next"
                    onSubmitEditing={() => ref_input2.current.focus()}
                    ref={ref_input1}
                    value={name}

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
                    returnKeyType="next"
                    onSubmitEditing={() => ref_input3.current.focus()}
                    ref={ref_input2}
                    value={email}

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
                    returnKeyType="next"
                    // onSubmitEditing={() => ref_input4.current.focus()}
                    ref={ref_input3}
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
                 phoneNumber={mobile?mobile:""}
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
                style={{ left: "9.%" }}
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                
              />
            )}
          </View>

          <Text style={[styles.text_footer]}>Gender</Text>
          <View style={styles.action}>
          <Picker
          mode='dialog'
            selectedValue={gender}
            placeholderTextColor="#666666"
            style={[styles.textInput]}
            autoCapitalize="none"
            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
          >
            <Picker.Item label="Male" value="Male"  key='1'/>
            <Picker.Item label="Female" value="Female"  key='2' />
          </Picker>
          </View>

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
            <TouchableOpacity style={styles.signIn} onPress={updateAccountData}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#fff",
                  },
                ]}
              >
                Update
              </Text>
            </TouchableOpacity>
          </View>
          </View>
        </ScrollView>
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    paddingVertical:0,
    


  },

  action: {
    flexDirection: "row",
    marginTop: 8,
    // borderBottomWidth: 1,
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
    flex: .8,
    // marginTop: Platform.OS === "ios" ? 0 : -12,
    // paddingLeft: 10,
    color: "#05375a",
    textAlign:"center"
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    paddingHorizontal: 100,
    marginBottom:50,
    borderRadius: 25,
    height: 50,
    backgroundColor: "#007cff",
    position: "relative",
  },
  text_footer: {
    marginTop: 5,
    color: "#05375a",
    fontSize: 18,
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
  signIn: {
    width: "70%",
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
