import * as React from "react";
import BouncingPreloader from "react-native-bouncing-preloaders";

export default function Loading() {
  return (
    <BouncingPreloader
      icons={[
        require("./scooter.png"),
        null,
        require("./rider2.png"),
        null,
        require("./rider-png.png"),
        null,
      ]}
      leftRotation="-680deg"
      rightRotation="360deg"
      leftDistance={-180}
      rightDistance={-250}
      speed={1500}
    />
  );
}
