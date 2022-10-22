import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { ExpenseItem } from "../components/ExpenseItem";

import { useContext } from "react";
import { ExpenseDataContext } from "../context/ExpensesDataContext";

import { numberWithCommas, numberWithoutCommas } from "../helper/helper";
import ExpensesItemsHeader from "../components/ExpensesItemsHeader";

import { format } from "date-fns";

export function AllExpensesScreen({ navigation, route }) {
  const { ALL_EXPENSES } = useContext(ExpenseDataContext);

  const totalExpenses = numberWithCommas(
    ALL_EXPENSES.map((expense) => numberWithoutCommas(expense.price))
      .reduce((accumulator, curr) => accumulator + curr)
      .toFixed(2)
      .toString()
  );
  return (
    <View style={styles.rootContainer}>
      <ExpensesItemsHeader totalExpenses={totalExpenses}>
        Todos os gastos:
      </ExpensesItemsHeader>
      <View style={styles.items}>
        <FlatList
          data={ALL_EXPENSES}
          showsVerticalScrollIndicator={false}
          renderItem={(itemData) => {
            return (
              <ExpenseItem
                description={itemData.item.description}
                date={format(itemData.item.date, "dd/MM/yyyy")}
                price={itemData.item.price}
                navigation={navigation}
                route={route}
                id={itemData.item.id}
              />
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  items: {
    flexDirection: "column",
  },
});
