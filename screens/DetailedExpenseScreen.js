import { Pressable, StyleSheet, View } from "react-native";
import React from "react";

import { useContext } from "react";
import { ExpenseDataContext } from "../context/ExpensesDataContext";
import TextComponent from "../components/TextComponent";

import { format } from "date-fns";

import { Ionicons } from "@expo/vector-icons";

export function DetailedExpenseScreen({ route }) {
  const { ALL_EXPENSES, setAllExpenses } = useContext(ExpenseDataContext);

  const id = route.params.expenseId;

  const [selectedExpense] = ALL_EXPENSES.filter((expense) => expense.id === id);

  function bookmarkPressHandler() {
    const modifiedExpenses = ALL_EXPENSES.map((expense) => {
      if (expense.id === selectedExpense.id) {
        expense.isBookmarked = !selectedExpense.isBookmarked;
        return expense;
      }
      return expense;
    });
    setAllExpenses(modifiedExpenses);
  }

  return (
    <View style={styles.rootView}>
      <View style={styles.expenseView}>
        <View style={styles.iconView}>
          <Pressable onPress={bookmarkPressHandler}>
            <Ionicons
              name={
                selectedExpense.isBookmarked ? "bookmark" : "bookmark-outline"
              }
              size={30}
              color={"#000"}
            />
          </Pressable>
        </View>
        <TextComponent
          style={{
            fontFamily: "open-sans-semi-bold",
            textAlign: "center",
            fontSize: 26,
          }}
        >
          {selectedExpense.description}
        </TextComponent>
        <TextComponent
          style={{ fontSize: 16, textAlign: "center", marginTop: 30 }}
        >
          {format(selectedExpense.date, "dd/MM/yyyy")}
        </TextComponent>
        <TextComponent
          style={{
            fontSize: 24,
            fontFamily: "open-sans-bold",
            marginTop: 30,
            textAlign: "center",
          }}
        >{`R$ ${selectedExpense.price}`}</TextComponent>
        <TextComponent
          style={{ fontFamily: "open-sans-semi-bold", marginTop: 30 }}
        >
          Observações:
        </TextComponent>
        <TextComponent style={{ textAlign: "justify", marginHorizontal: 15 }}>
          {selectedExpense.obs === ""
            ? "Não há observações para este gasto"
            : selectedExpense.obs}
        </TextComponent>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootView: {
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    flex: 1,
    position: "relative",
  },
  iconView: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  expenseView: {
    marginHorizontal: 30,
    marginVertical: 70,
    backgroundColor: "#FDF5AB",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});