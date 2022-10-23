import React from "react";
import { StyleSheet, View } from "react-native";

import TextComponent from "./TextComponent";

export default function ExpensesItemsHeader({
  children,
  totalExpenses,
  style,
  textStyle,
}) {
  return (
    <View style={[styles.itemsHeader, style]}>
      <View>
        <TextComponent
          style={
            ({
              textAlign: "center",
              fontFamily: "open-sans",
            },
            textStyle)
          }
        >
          {children}
        </TextComponent>
      </View>
      <View>
        <TextComponent style={{ fontFamily: "open-sans-bold" }}>
          {totalExpenses}
        </TextComponent>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemsHeader: {
    flexDirection: "row",
    backgroundColor: "#ecf0f1",
    justifyContent: "space-between",
    marginTop: 20,
    padding: 10,
    borderRadius: 4,
  },
});
