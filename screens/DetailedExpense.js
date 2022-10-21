import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { useContext } from "react";
import { ExpenseDataContext } from "../context/ExpensesDataContext";
import TextComponent from "../components/TextComponent";

import { format } from "date-fns";

export default function DetailedExpense({ route }) {
  const { ALL_EXPENSES } = useContext(ExpenseDataContext);

  const id = route.params.expenseId;

  const [selectedExpense] = ALL_EXPENSES.filter((expense) => expense.id === id);

  return (
    <View style={styles.rootView}>
      <View style={styles.expenseView}>
        <TextComponent style={{ fontSize: 20, position: "absolute", top: 10 }}>
          ---------------------------------
        </TextComponent>
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
        <TextComponent
          style={{ fontSize: 20, position: "absolute", bottom: 10 }}
        >
          ---------------------------------
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
  expenseView: {
    marginHorizontal: 30,
    marginVertical: 70,
    backgroundColor: "#FDF5AB",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
