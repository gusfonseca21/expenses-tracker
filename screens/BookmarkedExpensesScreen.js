import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

import { ExpenseItem } from "../components/ExpenseItem";

import { useContext } from "react";
import { ExpensesDataContext } from "../context/ExpensesDataContext";

import { format } from "date-fns";
import { NoExpensesTextComponent } from "../components/NoExpensesTextComponent";

export function BookmarkedExpensesScreen({ navigation, route }) {
  const { ALL_EXPENSES } = useContext(ExpensesDataContext);

  const bookmarkedExpenses = ALL_EXPENSES.filter(
    (expense) => expense.isBookmarked === true
  );

  return (
    <View style={styles.rootContainer}>
      {bookmarkedExpenses.length > 0 && (
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
      )}
      {bookmarkedExpenses.length === 0 && (
        <NoExpensesTextComponent>
          Você ainda não possui nenhuma despesa favoritada
        </NoExpensesTextComponent>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
});
