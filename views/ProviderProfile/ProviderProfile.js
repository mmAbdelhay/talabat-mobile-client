import React, { useState, useEffect } from "react";
import {
   StyleSheet,
   Text,
   ScrollView,
   SafeAreaView,
   View,
   TouchableOpacity,
   Alert,
   Image,
   StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styled from "styled-components";
import { ServerIP } from "../../assets/config";
import axios from "axios";
import { Card } from "react-native-elements";
import Header from "./HeaderSection";
import {
   Collapse,
   CollapseHeader,
   CollapseBody,
   AccordionList,
} from "accordion-collapse-react-native";
import OptionsModal from "./options_modal";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, defineProviderID } from "../../services/cartSlice";
export default function ProviderProfile({ navigation, route }) {
   const dispatch = useDispatch();
   let id = route?.params?.params?.id;
   const [provider, setProvider] = useState();

   const getProvider = async (id) => {
      if (id) {
         let response = await axios.get(`${ServerIP}/api/v1/guest/lookup/providersinfo/${id}`);
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
      console.log();
      //  setItemOptions(props?.item?.Item_Options);
   }, []);

   useEffect(() => {
      getProvider(id);
   }, [id]);

   const addItemToCart = (itemToAdd) => {
      const itemToBeSaved = {
         name: itemToAdd.name,
         id: itemToAdd.id,
         quantity: 1,
         price: itemToAdd.price,
      };
      dispatch(defineProviderID(id));
      dispatch(addToCart(itemToBeSaved));
   };

   return (
      <SafeAreaView style={{ backgroundColor: "white" }}>
         <StatusBar barStyle="dark-content" />
         <Header name={provider?.Provider?.name} />
         <ScrollView style={{ paddingTop: "5%", paddingBottom: "5%" }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
               <Text
                  style={{
                     textAlign: "center",
                     fontSize: 20,
                     marginBottom: 10,
                  }}>
                  {provider?.Provider?.name}
               </Text>
               <View style={{ flexDirection: "row" }}>
                  <Image
                     source={{ uri: `${ServerIP}${provider?.Provider?.logo}` }}
                     style={{
                        width: 100,
                        height: 100,
                        borderRadius: 5,
                        marginLeft: "2%",
                     }}
                  />
                  <View style={{ marginLeft: "10%", paddingTop: "1%" }}>
                     <Text>provider_type : {provider?.Provider?.provider_type}</Text>
                     <Text>delivery_fee : {provider?.Provider?.delivery_fee}</Text>
                     <Text>minimum_order : {provider?.Provider?.minimum_order}</Text>
                     <Text>opening_hour : {provider?.Provider?.opening_hour}</Text>
                     <Text>closing_hour : {provider?.Provider?.closing_hour}</Text>
                     <Text>delivery_time : {provider?.Provider?.delivery_time}</Text>
                  </View>
               </View>
            </View>
            <View>
               {provider?.Provider?.Categories.length > 0 ? (
                  <Text style={{ marginLeft: "5%", marginTop: "3%", fontSize: 20 }}>
                     Categories :
                  </Text>
               ) : null}
               {provider?.Provider?.Categories?.map((cat) => {
                  return (
                     <Card key={cat.id} style={{ marginLeft: "10%" }}>
                        <Text>Name : {cat.name}</Text>
                        {cat.Items && (
                           <Text
                              style={{
                                 marginLeft: "3%",
                                 marginTop: "3%",
                                 fontSize: 17,
                              }}>
                              Items :
                           </Text>
                        )}

                        {cat.Items?.map((item) => {
                           return (
                              <Card key={item.id}>
                                 <View style={{ flexDirection: "row" }}>
                                    <Image
                                       source={{ uri: `${ServerIP}${item.logo}` }}
                                       style={{ height: 50, width: 50 }}
                                    />
                                    <View style={{ marginLeft: "3%" }}>
                                       <Text>
                                          Name: {item.name} Price: {item.price}
                                       </Text>
                                       {/* <Text></Text> */}
                                       <Text>{item.summary}</Text>
                                       {item.availability ? (
                                          <View style={{ flexDirection: "row" }}>
                                             <Text>Available</Text>
                                             <TouchableOpacity
                                                onPress={() => addItemToCart(item)}
                                                style={{ marginLeft: "10%" }}>
                                                <Icon name="plus" size={20} color="#007cff" />
                                             </TouchableOpacity>
                                          </View>
                                       ) : (
                                          <Text>Not Available</Text>
                                       )}
                                    </View>
                                 </View>
                              </Card>
                           );
                        })}
                     </Card>
                  );
               })}
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
   centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
   },
   modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      width: "80%",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
   },
   button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
   },
   buttonOpen: {
      backgroundColor: "#F194FF",
   },
   buttonClose: {
      backgroundColor: "#2196F3",
   },
   textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
   },
   modalText: {
      marginBottom: 15,
      textAlign: "center",
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
