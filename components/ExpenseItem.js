import React from "react";
import { StyleSheet, View } from "react-native";

import TextComponent from "../components/TextComponent";

export default function ExpenseItem({ description, date, price }) {
  return (
    <View style={styles.itemView}>
      <View style={styles.leftItemView}>
        <TextComponent style={styles.itemDescriptionText}>
          {description}
        </TextComponent>
        <TextComponent style={styles.itemViewText}>{date}</TextComponent>
      </View>
      <View style={styles.rightItemView}>
        <TextComponent
          style={styles.rightItemViewText}
        >{`R$ ${price}`}</TextComponent>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    padding: 6,
    backgroundColor: "#273c75",
    borderRadius: 4,
  },
  leftItemView: {
    justifyContent: "center",
  },
  rightItemView: {
    backgroundColor: "white",
    width: 70,
    justifyContent: "center",
    borderRadius: 4,
  },
  itemViewText: {
    color: "#ecf0f1",
  },
  itemDescriptionText: {
    fontFamily: "open-sans-bold",
    color: "#ecf0f1",
    marginBottom: 3,
  },
  rightItemViewText: {
    textAlign: "center",
    color: "#192a56",
    fontFamily: "open-sans-bold",
  },
});
