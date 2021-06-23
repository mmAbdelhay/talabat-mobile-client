import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ExpoStripePurchase from 'expo-stripe-webview';
import { axiosPost } from '../../services/AxiosRequests';
import { clearCart } from "../../services/cartSlice";
import { ServerIP } from "../../assets/config";



export default function StripePayment(props) {

    const cartItems = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();
    const [total_price, setTotalPrice] = useState(props.route.params.total_price);
    const [payload, setPayload] = useState(props.route.params.payload);
  
    onClose = () => {
        props.navigation.navigate("Home");
    }
    
    onPaymentSuccess = async (token) => {
        console.log(payload);
        let response=await axiosPost(`/API/V1/orders/CreateOrder/create`,payload)
        if(response){
            console.log(response);
            dispatch(clearCart());
            props.navigation.navigate("Home")
        }else{
            console.log("error");
        }
        console.log(`checkout `);

    }



  return (
    <ExpoStripePurchase
                publicKey="pk_test_51IylsfFbv4bq3gHEGu377QH9EZEm3dJzg1KEtB1wxb1ifEECvujcbHtxMOvc74fO9lNAAIFOCqF1ySZXEfmAc09J00UtkrLyEI"
                amount={total_price}
                imageUrl="www.clever-image-url.com"
                storeName="Clever Store Name"
                description="Clever product description."
                currency="USD"
                allowRememberMe={true}
                prepopulatedEmail="clever_email@clever.com"
                onClose={onClose}
                onPaymentSuccess={(token) => onPaymentSuccess(token)}
                style={{width: 1000, alignSelf: 'center'}}
            />
          
  );
}
