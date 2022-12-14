import { Text } from "react-native";
import React from "react";

export function TextComponent(props) {
  return (
    <Text
      {...props}
      style={{ fontFamily: "open-sans", fontSize: 14, ...props.style }}
    >
      {props.children}
    </Text>
  );
}
