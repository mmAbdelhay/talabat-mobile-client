import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  Modal,
  Alert,
  Pressable,
  TextInput
} from "react-native";
import { Card } from "react-native-elements";
import { removeFomCart } from "../../services/cartSlice";
import { clearCart } from "../../services/cartSlice";
import Icon from "react-native-vector-icons/FontAwesome";
import { ServerIP } from "../../assets/config";
import { axiosPost } from '../../services/AxiosRequests';
import * as Location from "expo-location";
import axios from "axios";


export default function Cart({navigation}) {
  const cartItems = useSelector((state) => state.cart.cart);
  const providerID = useSelector((state) => state.cart.providerID);
  const dispatch = useDispatch();
  const [totals, setTotalPrice] = useState(0);
  const [location, setLocation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [text, onChangeText] = useState("");
  const [Note, onChangeNote] = useState("");
  const [couponValue, setCouponValue] = useState(0);


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log("latitude is",location.coords.latitude)
      console.log("longitude is",location.coords.longitude)})();
    let total = 0;
    cartItems?.map((item) => {
       total += +item.price;
    });
    setTotalPrice(total);
  }, [cartItems]);

  console.log("cart items are",cartItems);
  console.log("provider id is : ",providerID);
  console.log("total price is ",totals);
  

  const checkOut = async () => {
    let payload={
        cart:cartItems,
        provider_id : providerID,
        total_price: totals,
        lat: location.coords.latitude,
        lng: location.coords.longitude, 
        paymentMethod: "cash",
        notes: Note,
        coupon: couponValue
    };
    let response=await axiosPost(`/API/V1/orders/CreateOrder/create`,payload)
    if(response){
      console.log(response);
      dispatch(clearCart());
      console.log("these are cart items nowwwwwwwwwwwwwwwwwwwww",cartItems);
      navigation.navigate("Home")
    }else{
      console.log("error");
    }
    console.log(`checkout `);
  };

  const addCoupon = () => {
    axios.post(`${ServerIP}/API/V1/orders/CreateOrder/checkCoupon`,{
      coupon: text
    },).then((res) => {
      console.log("this is coupon",res.data.checkCoupon.discount_percentage);
      console.log("this is coupon",typeof res.data.checkCoupon.discount_percentage);
      if(res.data.checkCoupon.discount_percentage){
      setCouponValue(res.data.checkCoupon.discount_percentage);
      let new_total_price = totals-res.data.checkCoupon.discount_percentage;
      setTotalPrice(new_total_price);
      onChangeText("");
      }
   }).catch((err) => {
     alert("code not valid"+err);
   })
   setModalVisible(!modalVisible)
  };

  return (
    <ScrollView style={{marginBottom:"25%"}}>
      {cartItems.length > 0 ? (
        cartItems.map((item) => {
          return (
            <>
              <Card
                key={item?.id}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={{ uri: `${ServerIP}${item?.logo}` }}
                    style={{ height: 50, width: 50 }}
                  />
                  <View>
                    <Text>Name : {item?.name}</Text>
                    <Text>Price : {item?.price}</Text>
                    <Text>Quantity : {item?.quantity}</Text>
                  </View>
                </View>
                {item?.price > 0 && (
                  <TouchableOpacity
                    style={{ alignSelf: "flex-end" }}
                    onPress={() => dispatch(removeFomCart(item))}
                  >
                    <Icon name="minus" size={20} color="red" />
                  </TouchableOpacity>
                )}
              </Card>
            </>
          );
        })
      ) : (
        <View
          style={{ justifyContent: "center", alignItems: "center", top: 100 }}
        >
          <Image
            source={require("../../assets/imgs/empty_cart.png")}
            style={{
              width: 200,
              height: 200,
              borderRadius: 5,
            }}
          />
          <Text style={{ fontSize: 20, color: "red", fontWeight: "bold" }}>
            Your cart is empty
          </Text>
        </View>
      )}
      {cartItems.length > 0 && (
        <View>
        <View style={styles.centeredView}><Text>Total Price : {totals}</Text></View>
        <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible1}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible1(!modalVisible1);
              }}
            >
              <View style={styles.centeredView}>
                
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>ADD Note</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChangeNote}
                    value={Note}
                    placeholder="Write Note"
                  />
                  <Pressable
                    style={[styles.buttonModal, styles.buttonClose]}
                    onPress={()=>{setModalVisible1(!modalVisible1)}}
                  >
                    <Text style={styles.textStyle}>ADD</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.buttonModal, styles.buttonClose]}
                    onPress={()=>{setModalVisible1(!modalVisible1)}}
                  >
                    <Text style={styles.textStyle}>Cancel</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            <Pressable
              style={[styles.buttonModal, styles.buttonOpen]}
              onPress={() => setModalVisible1(true)}
            >
              <Text style={styles.textStyle}>Add Note</Text>
            </Pressable>
          </View>
        <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>ADD Coupon</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Write coupon code"
                  />
                  <Pressable
                    style={[styles.buttonModal, styles.buttonClose]}
                    onPress={addCoupon}
                  >
                    <Text style={styles.textStyle}>ADD</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.buttonModal, styles.buttonClose]}
                    onPress={()=>{setModalVisible(!modalVisible)}}
                  >
                    <Text style={styles.textStyle}>Cancel</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            <Pressable
              style={[styles.buttonModal, styles.buttonOpen]}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.textStyle}>Add Coupon</Text>
            </Pressable>
          </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.checkOut} onPress={checkOut}>
            <Text
              style={[
                styles.textCheckOut,
                {
                  color: "#fff",
                },
              ]}
            >
              Pay Cash
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.checkOut} onPress={()=>{navigation.navigate("StripePayment",{total_price:totals,payload:{
                                                                                                                                    cart:cartItems,
                                                                                                                                    provider_id : providerID,
                                                                                                                                    total_price: totals,
                                                                                                                                    lat: location.coords.latitude,
                                                                                                                                    lng: location.coords.longitude, 
                                                                                                                                    paymentMethod: "visa",
                                                                                                                                    notes: Note,
                                                                                                                                    coupon: couponValue
                                                                                                                                  }})}}>
            <Text
              style={[
                styles.textCheckOut,
                {
                  color: "#fff",
                },
              ]}
            >
              Pay VISA
            </Text>
          </TouchableOpacity>
        </View>
        </View>
        
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    alignSelf: "center",
    width: "70%",
    marginTop: 10,
    borderRadius: 25,
    height: 50,
    backgroundColor: "#007cff",
    position: "relative",
  },
  checkOut: {
    width: "40%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textCheckOut: {
    fontSize: 18,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonModal: {
    borderRadius: 25,
    padding: 10,
    elevation: 2,
    width:"50%",
    height:50,
  },
  buttonOpen: {
    backgroundColor: "#007cff",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    width:"70%"
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  }
});
