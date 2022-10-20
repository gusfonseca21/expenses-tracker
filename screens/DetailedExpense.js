import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { useContext } from "react";
import { ExpenseDataContext } from "../context/ExpensesDataContext";

export default function DetailedExpense({ route }) {
  const { ALL_EXPENSES } = useContext(ExpenseDataContext);

  const id = route.params.expenseId;

  const [selectedExpense] = ALL_EXPENSES.filter((expense) => expense.id === id);

  return (
    <View style={styles.rootView}>
      <Text>{selectedExpense.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rootView: {
    borderTopColor: "#ccc",
    borderTopWidth: 1,
  },
});
