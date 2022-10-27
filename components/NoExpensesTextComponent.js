import { View, StyleSheet } from "react-native";
import React from "react";
import TextComponent from "./TextComponent";

export function NoExpensesTextComponent({ children }) {
  return (
    <View style={styles.noExpensesText}>
      <TextComponent style={{ textAlign: "center", color: "#ecf0f1" }}>
        {children}
      </TextComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  noExpensesText: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});
