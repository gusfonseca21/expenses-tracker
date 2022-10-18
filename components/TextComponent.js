import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function TextComponent(props) {
  return (
    <Text
      {...props}
      style={{ fontFamily: "open-sans", fontSize: 14, ...props.style }}
    >
      {props.children}
    </Text>
  );
}
