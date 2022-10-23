import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { ExpenseItem } from "../components/ExpenseItem";

import { useContext } from "react";
import { ExpenseDataContext } from "../context/ExpensesDataContext";

import { sumOfExpenses } from "../helper/helper";
import ExpensesItemsHeader from "../components/ExpensesItemsHeader";

import { format } from "date-fns";

export function MonthExpensesScreen({ navigation, route }) {
  const { ALL_EXPENSES } = useContext(ExpenseDataContext);

  const currentMonth = format(new Date(), "M");

  const filteredExpenses = ALL_EXPENSES.filter(
    (expense) => format(expense.date, "M") === currentMonth
  );

  const totalExpenses = sumOfExpenses(filteredExpenses);

  return (
    <View style={styles.rootContainer}>
      <FlatList
        ListHeaderComponent={
          <ExpensesItemsHeader totalExpenses={`R$ ${totalExpenses}`}>
            Gastos deste mês:
          </ExpensesItemsHeader>
        }
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
});
