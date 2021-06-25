import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { axiosGet } from "../../services/AxiosRequests";
import { Image } from "react-native-elements";
import { ServerIP } from "../../assets/config";

export default class OrderStatus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentState: 0,
      currentGif: "",
      orderID: this.props.route.params.order_ID,
    };
  }

  async componentDidMount() {
    // this.getStatus();
    this.unsubscribe = this.props.navigation.addListener("focus", async () => {
      //Will execute when screen is focused
      let states = [
        "Pending",
        "Preparing",
        "Ready",
        "Delivering",
        "Delivered",
        "Canceled",
      ];
      this.setState({ orderID: this.props.route.params.order_ID }, async () => {
        console.log(
          "this is after setting orderid in unsub",
          this.state.orderID
        );
        let uri = `/api/v1/client/order/status/${this.state.orderID}`;
        const response = await axiosGet(uri);
        let current = states.indexOf(response.orderStatus.order_status);
        this.setState(
          {
            currentState: current,
            currentGif: response.orderStatus.order_status,
          },
          () => {
            console.log("after setting state", this.state.currentState);
          }
        );
      });
      // console.log(this.state.orderID);
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getStatus = async () => {
    let states = [
      "Pending",
      "Preparing",
      "Ready",
      "Delivering",
      "Delivered",
      "Canceled",
    ];
    let uri = `/api/v1/client/order/status/${this.state.orderID}`;
    const response = await axiosGet(uri);
    let current = states.indexOf(response.orderStatus.order_status);
    this.setState({
      currentState: current,
      currentGif: response.orderStatus.order_status,
    });
  };

  refresh = () => {
    this.getStatus();
  };

  render() {
    return (
      <>
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: "7%",
            justifyContent: "center",
            marginTop: "8%",
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
          <Text style={styles.bigtext}>
            {this.state.currentGif}
            {this.state.currentState != 4 ? "..." : ""}
          </Text>
          <Image
            source={{
              uri: `${ServerIP}/orderstatus/images/${this.state.currentGif}.gif`,
            }}
            style={{ width: 250, height: 250 }}
          />
          <Text style={styles.text}>
            {this.state.currentState == 0
              ? "Waiting for restaurant to approve order."
              : this.state.currentState == 1
              ? "Order is being prepared."
              : this.state.currentState == 2
              ? "Order is ready for delivering."
              : this.state.currentState == 3
              ? "Order is on its way."
              : this.state.currentState == 4
              ? "Order is deliverd."
              : ""}
          </Text>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 15,
    marginTop: 10,
  },
  bigtext: {
    fontSize: 40,
    marginBottom: 10,
  },
});
