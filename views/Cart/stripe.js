import ExpoStripePurchase from 'expo-stripe-webview';
import React from 'react';
import { axiosPost } from '../../services/AxiosRequests';

class StripePayment extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            total_price:this.props.route.params.total_price,
            payload:this.props.route.params.payload
         }
    }
    onClose = () => {
        this.props.navigation.navigate("Home");
    }
    
    onPaymentSuccess = async (token) => {
        console.log(this.state.payload);
        let response=await axiosPost(`/API/V1/orders/CreateOrder/create`,this.state.payload)
        if(response){
            console.log(response);
            this.props.navigation.navigate("Home")
        }else{
            console.log("error");
        }
        console.log(`checkout `);

    }
    
    render () {
        return (
            <ExpoStripePurchase
                publicKey="pk_test_51IylsfFbv4bq3gHEGu377QH9EZEm3dJzg1KEtB1wxb1ifEECvujcbHtxMOvc74fO9lNAAIFOCqF1ySZXEfmAc09J00UtkrLyEI"
                amount={this.state.total_price}
                imageUrl="www.clever-image-url.com"
                storeName="Clever Store Name"
                description="Clever product description."
                currency="USD"
                allowRememberMe={true}
                prepopulatedEmail="clever_email@clever.com"
                onClose={this.onClose}
                onPaymentSuccess={(token) => this.onPaymentSuccess(token)}
                style={{width: 1000, alignSelf: 'center'}}
            />
        )
    }
}
 
export default StripePayment;