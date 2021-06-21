import React from 'react';
import {  View } from 'react-native';
import { axiosGet } from '../../services/AxiosRequests';
import { ServerIP } from '../../assets/config';
import MapView, { Marker }  from "react-native-maps";
// import { io } from "socket.io-client";

export default class ClientMap extends React.Component {

    constructor(props){
        super(props);
        this.state={
          orders:[],
          orderID:this.props.route.params.order_ID,
        };
    }
    
    async componentDidMount() {
        // io.emit("room",this.state.orderID );

        // io.on("location", (args) => {
        //     console.log("Emitted from server");
        //     console.log("this is incoming location",args);
        // });
    }

    render(){
      return (
        <MapView
            style={{ flex: 1 }}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05
            }}
        >
            <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} />
        </MapView>
      );
    }
  }
  