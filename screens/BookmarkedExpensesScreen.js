import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

import { ExpenseItem } from "../components/ExpenseItem";

import { useContext } from "react";
import { ExpenseDataContext } from "../context/ExpensesDataContext";

import { format } from "date-fns";

export function BookmarkedExpensesScreen({ navigation, route }) {
  const { ALL_EXPENSES } = useContext(ExpenseDataContext);

  const bookmarkedExpenses = ALL_EXPENSES.filter(
    (expense) => expense.isBookmarked === true
  );

  return (
    <View style={styles.rootContainer}>
      <View style={styles.items}>
        <FlatList
          data={bookmarkedExpenses}
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
