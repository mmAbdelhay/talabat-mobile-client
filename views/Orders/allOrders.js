import React from 'react';
import { StyleSheet, Text, View, Image,  ScrollView, TouchableOpacity } from 'react-native';
import { axiosGet } from '../../services/AxiosRequests';
import { Card, ListItem, Button, Icon  } from 'react-native-elements'
import { ServerIP } from '../../assets/config';

export default class AllOrders extends React.Component {

    constructor(props){
        super(props);
        this.state={
          orders:[],
        };
    }
    
    async componentDidMount() {
        this.getOrders();
      }

    getOrders=async ()=>{
        const response = await axiosGet("/api/v1/client/info/allorders") ;
        this.setState({
            orders:response,
        })
      }
    
    render(){
      return (
        <ScrollView style={{ top: "5%", marginBottom: "30%" }}>
            {this.state.orders.length==0 ? <Text>no orders</Text>:this.state.orders.map((order)=>{
                return( <TouchableOpacity key={order.id} onPress={() =>
                                                                    order.order_status=="Delivered"?this.props.navigation.navigate('ReviewProvider', { provider_ID: order.provider_id,provider_name:order.Provider.name }):(order.order_status=="Delivering"?this.props.navigation.navigate("ClientMap",{order_ID:order.id}):this.props.navigation.navigate('OrderStatus', { order_ID: order.id }))
                                                                    
                                                                }>
                            <Card>
                                <Card.Title><Text>Order from {order.Provider.name}</Text></Card.Title>
                                <Card.Divider/>
                                {/* <Image
                                source={{ uri: `${ServerIP}${order.Provider.logo}` }}
                                style={{ width: 150, height: 150 }}
                            /> */}
                                <Card.Image source={{ uri: `${ServerIP}${order.Provider.logo}` }}>
                                </Card.Image>
                                <Text style={{marginBottom: 10, marginTop: 10}}>
                                Total Price : {order.total_price} LE
                                </Text>
                                <Text style={{marginBottom: 10}}>
                                Date : {order.createdAt.substr(0,10)} at {order.createdAt.substr(12,4)}
                                </Text>
                            </Card>
                        </TouchableOpacity>)
            })}
        </ScrollView>
        
      );
    }
  }
  