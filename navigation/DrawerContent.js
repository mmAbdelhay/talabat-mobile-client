import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Title, Caption, Drawer } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SignOut } from "../services/SignOut";
import { Restart } from "fiction-expo-restart";

export default function DrawerContent(props) {
  const [client, setClient] = useState();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <Drawer.Section>
            <View style={styles.userInfoSection}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  right: 20,
                }}
              >
                <Image
                  source={require("../assets/icons/login.png")}
                  style={{
                    width: 100,
                    height: 100,
                    tintColor: "#777777",
                  }}
                />
                <View
                  style={{
                    margin: 10,
                    flexDirection: "column",
                  }}
                >
                  <Title style={styles.title}>
                    Name : {props?.client?.name}
                  </Title>
                  <Text style={{ color: "#777777" }}>
                    Email : {props?.client?.email}
                  </Text>
                  <Text style={{ color: "#777777" }}>
                    Mobile : {props?.client?.mobile}
                  </Text>
                  <Text style={{ color: "#777777" }}>
                    Date of birth : {props?.client?.date_of_birth}
                  </Text>
                  <Text style={{ color: "#777777" }}>
                    Country : {props?.client?.country}
                  </Text>
                  <Text style={{ color: "#777777" }}>
                    Gender : {props?.client?.gender}
                  </Text>
                </View>
              </View>
            </View>
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Edit account"
              onPress={() => {
                props.navigation.navigate("Account");
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-check-outline" color={color} size={size} />
              )}
              label="Contact us"
              onPress={() => {
                props.navigation.navigate("ContactUs");
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={async () => {
            if (await SignOut()) Restart();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
    color: "#777777",
  },
  caption: {
    fontSize: 12,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
