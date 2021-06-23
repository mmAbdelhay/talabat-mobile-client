import React from 'react';
import {  View } from 'react-native';
import { axiosGet } from '../../services/AxiosRequests';
import { ServerIP } from '../../assets/config';
import MapView, { Marker }  from "react-native-maps";

import { io } from "socket.io-client";
export default class ClientMap extends React.Component {
  socket = io(`${ServerIP}`); //Cert was not trusted

    constructor(props){
        super(props);
this.socket.emit("room", this.props.route.params.order_ID);

        this.state={
          driverLat:0,
          driverLong:0,
          orders:[],
          orderID:this.props.route.params.order_ID,
        };
    }

    async componentDidMount() {
          this.socket.on("location", (args) => {
   console.log("Emitted from server");
   console.log(args);
   this.setState({driverLat: +args.lat,driverLong:+args.long})
  //  console.log(args.lat)
});
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
                latitude: this.state.driverLat,
                longitude: this.state.driverLong,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05
            }}
        >
            <Marker coordinate={{ latitude: this.state.driverLat, longitude: this.state.driverLong }} />
        </MapView>
      );
    }
  }
  