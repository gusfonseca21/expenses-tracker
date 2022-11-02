import React from "react";
import { StyleSheet, View, Pressable } from "react-native";

import { TextComponent } from "../components/TextComponent";

export function ExpenseItem({ description, date, price, navigation, id }) {
  const pressHandler = () => {
    navigation.navigate("Details", {
      expenseId: id,
    });
  };

  return (
    <View style={styles.itemView}>
      <Pressable onPress={pressHandler} android_ripple={{ color: "#ccc" }}>
        <View style={styles.insidePressableView}>
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
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  itemView: {
    marginTop: 10,
    borderRadius: 4,
    backgroundColor: "#273c75",
    overflow: "hidden",
  },
  insidePressableView: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 6,
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
