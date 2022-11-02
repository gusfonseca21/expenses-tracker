import { useContext } from "react";

import { StyleSheet, View, FlatList } from "react-native";

import {
  ExpenseItem,
  ExpensesItemsHeader,
  NoExpensesTextComponent,
} from "../components";

import { ExpensesDataContext } from "../context/ExpensesDataContext";

import { sumOfExpenses } from "../helper/helper";

import { format } from "date-fns";

export function RecentExpensesScreen({ navigation, route }) {
  const { ALL_EXPENSES } = useContext(ExpensesDataContext);

  const currentDay = format(new Date(), "dd");
  const currentMonth = format(new Date(), "M");

  const filteredExpenses = ALL_EXPENSES.filter(
    (expense) =>
      currentDay - format(expense.date, "dd") <= 7 &&
      currentDay - format(expense.date, "dd") >= 0 &&
      format(expense.date, "M") === currentMonth
  );

  const totalExpenses = sumOfExpenses(filteredExpenses);
  return (
    <View style={styles.rootContainer}>
      {filteredExpenses.length > 0 && (
        <FlatList
          ListHeaderComponent={
            <ExpensesItemsHeader totalExpenses={`R$ ${totalExpenses}`}>
              Gastos desta semana:
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
      )}
      {filteredExpenses.length === 0 && (
        <NoExpensesTextComponent>
          Você ainda não possui gastos esta semana
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
  itemsHeader: {
    flexDirection: "row",
    backgroundColor: "#ecf0f1",
    justifyContent: "space-between",
    marginVertical: 10,
    padding: 10,
    borderRadius: 4,
  },
});
