import React from "react";
import { StyleSheet, View } from "react-native";

import TextComponent from "./TextComponent";

export default function ExpensesItemsHeader({ children, totalExpenses }) {
  return (
    <View style={styles.itemsHeader}>
      <View>
        <TextComponent
          style={{
            textAlign: "center",
            fontFamily: "open-sans",
          }}
        >
          {children}
        </TextComponent>
      </View>
      <View>
        <TextComponent style={{ fontFamily: "open-sans-bold" }}>
          {`R$ ${totalExpenses}`}
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
    marginVertical: 10,
    padding: 10,
    borderRadius: 4,
  },
});
