import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import ExpenseItem from "../components/ExpenseItem";

import { useContext } from "react";
import { ExpenseDataContext } from "../context/ExpensesDataContext";

import { numberWithCommas, numberWithoutCommas } from "../helper/helper";
import ExpensesItemsHeader from "../components/ExpensesItemsHeader";

import { format } from "date-fns";

export default function RecentExpensesScreen({ navigation, route }) {
  const { ALL_EXPENSES } = useContext(ExpenseDataContext);

  const currentDay = format(new Date(), "dd");
  const currentMonth = format(new Date(), "M");

  const filteredExpenses = ALL_EXPENSES.filter(
    (expense) =>
      currentDay - format(expense.date, "dd") <= 7 &&
      currentDay - format(expense.date, "dd") >= 0 &&
      format(expense.date, "M") === currentMonth
  );

  const totalExpenses = numberWithCommas(
    filteredExpenses
      .map((expense) => numberWithoutCommas(expense.price))
      .reduce((accumulator, curr) => accumulator + curr)
      .toFixed(2)
  );
  return (
    <View style={styles.rootContainer}>
      <ExpensesItemsHeader totalExpenses={totalExpenses}>
        Gastos desta semana:
      </ExpensesItemsHeader>
      <View style={styles.items}>
        <FlatList
          data={filteredExpenses}
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
  itemsHeader: {
    flexDirection: "row",
    backgroundColor: "#ecf0f1",
    justifyContent: "space-between",
    marginVertical: 10,
    padding: 10,
    borderRadius: 4,
  },
  items: {
    flexDirection: "column",
  },
});
