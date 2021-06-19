import React from 'react';
import { StyleSheet, Text, View,  ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { axiosGet } from '../../services/AxiosRequests';
import {  Image  } from 'react-native-elements'
import { ServerIP } from '../../assets/config';
import { axiosPost } from '../../services/AxiosRequests';


export default class ReviewProvider extends React.Component {

    constructor(props){
        super(props);
        this.state={
            providerID:this.props.route.params.provider_ID,
            providerName:this.props.route.params.provider_name,
            reviewStr:""
        };
    }

    async componentDidMount() {
        // this.getStatus();
        this.unsubscribe= this.props.navigation.addListener('focus', async () => {
            this.setState({providerID:this.props.route.params.provider_ID,providerName:this.props.route.params.provider_name});
          })
    }

    componentWillUnmount () {
        this.unsubscribe()
      }

    AddReview=async ()=>{
        if(this.state.reviewStr){
        let response = await axiosPost(`/api/v1/client/order/review/add/${this.state.providerID}`,{content:this.state.reviewStr})
        console.log(response);
        }else{
            Alert.alert("Empty content","Please fill review content before submitting")
        }
    }
     
    render(){
      return (
        <>
        <TouchableOpacity
        style={{
            width: 50,
            paddingLeft: "7%",
            justifyContent: "center",
        }}
        onPress={() => this.props.navigation.navigate("AllOrders")}
        >
        <Image
            source={require("../../assets/imgs/back.png")}
            resizeMode="contain"
            style={{
            width: 23,
            height: 23,
            }}
        />
        </TouchableOpacity>
        <View style={styles.container}>
            <Text style={styles.bigtext}>Review {this.state.providerName}</Text>
            <TextInput
                style={styles.input}
                onChangeText={(val) => this.setState({reviewStr:val},()=>console.log(this.state.reviewStr))}
                value={this.state.reviewStr}
                multiline
                numberOfLines={5}
                placeholder="Your Review"
                placeholderTextColor="#666666"
                autoCapitalize="none"

            />
            <TouchableOpacity onPress={this.AddReview}>
            <Button 
                onPress={this.AddReview}
                title="Add Review"
                />
            </TouchableOpacity>
        </View>
        </>
        
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text:{
        fontSize:15,
        marginTop:10
    },
    bigtext:{
        fontSize:30,
        marginBottom:10,
        textDecorationLine:'underline'
    },
    input: {
        height: "25%",
        margin: 12,
        borderWidth: 1,
        width:"75%",
        paddingLeft:10
    }
  });
  