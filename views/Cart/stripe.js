// import ExpoStripePurchase from 'expo-stripe-webview';
// import React from 'react';
// class StripePayment extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {  }
//     }
//     onClose = () => {
//         // handle close (i.e. navigate back)
//     }
    
//     onPaymentSuccess = (token) => {
//         // handle saving token on backend
//         // will automatically call 'onClose'
//     }
    
//     render () {
//         return (
//             <ExpoStripePurchase
//                 publicKey="pk_test_51IylsfFbv4bq3gHEGu377QH9EZEm3dJzg1KEtB1wxb1ifEECvujcbHtxMOvc74fO9lNAAIFOCqF1ySZXEfmAc09J00UtkrLyEI"
//                 amount={100000}
//                 imageUrl="www.clever-image-url.com"
//                 storeName="Clever Store Name"
//                 description="Clever product description."
//                 currency="USD"
//                 allowRememberMe={true}
//                 prepopulatedEmail="clever_email@clever.com"
//                 onClose={this.onClose}
//                 onPaymentSuccess={(token) => this.onPaymentSuccess(token)}
//                 style={{width: 1000, alignSelf: 'center'}}
//             />
//         )
//     }
// }
 
// export default StripePayment;