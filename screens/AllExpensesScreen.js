import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  SectionList,
  Text,
} from "react-native";
import { ExpenseItem } from "../components/ExpenseItem";

import { useContext } from "react";
import { ExpenseDataContext } from "../context/ExpensesDataContext";

import { numberWithCommas, numberWithoutCommas } from "../helper/helper";
import ExpensesItemsHeader from "../components/ExpensesItemsHeader";

import { format } from "date-fns";

export function AllExpensesScreen({ navigation, route }) {
  const { ALL_EXPENSES } = useContext(ExpenseDataContext);

  const expensesPerMonth = [
    { month: "January", expenses: [] },
    { month: "February", expenses: [] },
    { month: "March", expenses: [] },
    { month: "April", expenses: [] },
    { month: "May", expenses: [] },
    { month: "June", expenses: [] },
    { month: "July", expenses: [] },
    { month: "August", expenses: [] },
    { month: "September", expenses: [] },
    { month: "October", expenses: [] },
    { month: "November", expenses: [] },
    { month: "December", expenses: [] },
  ];

  ALL_EXPENSES.forEach((expense) => {
    expensesPerMonth.forEach((month) => {
      if (format(expense.date, "MMMM") === month.month) {
        month.expenses.push(expense);
      }
    });
  });

  const monthsWithExpenses = expensesPerMonth.filter(
    (month) => month.expenses.length > 0
  );

  console.log(monthsWithExpenses);

  const totalExpenses = numberWithCommas(
    ALL_EXPENSES.map((expense) => numberWithoutCommas(expense.price))
      .reduce((accumulator, curr) => accumulator + curr)
      .toFixed(2)
      .toString()
  );

  return (
    <View style={styles.rootContainer}>
      {/* <ExpensesItemsHeader totalExpenses={totalExpenses}>
        Todos os gastos:
      </ExpensesItemsHeader> */}
      <SectionList
        // sections={[
        //   {  title: "Janeiro", data: expensesPerMonth[0].expenses },
        //   { title: "Fevereiro", data: expensesPerMonth[1].expenses },
        //   { title: "Março", data: expensesPerMonth[2].expenses },
        //   { title: "Abril", data: expensesPerMonth[3].expenses },
        //   { title: "Maio", data: expensesPerMonth[4].expenses },
        //   { title: "Junho", data: expensesPerMonth[5].expenses },
        //   { title: "Julho", data: expensesPerMonth[6].expenses },
        //   { title: "Agosto", data: expensesPerMonth[7].expenses },
        //   { title: "Setembro", data: expensesPerMonth[8].expenses },
        //   { title: "Outubro", data: expensesPerMonth[9].expenses },
        //   { title: "Novembro", data: expensesPerMonth[10].expenses },
        //   { title: "Dezembro", data: expensesPerMonth[11].expenses },
        // ]}
        sections={monthsWithExpenses.map((month) => {
          return { title: month.month, data: month.expenses };
        })}
        renderItem={({ item }) => (
          <ExpenseItem
            description={item.description}
            date={format(item.date, "dd/MM/yyyy")}
            price={item.price}
            navigation={navigation}
            route={route}
            id={item.id}
          />
        )}
        renderSectionHeader={({ section }) => {
          return (
            <View>
              <Text>{section.title}</Text>
            </View>
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
});
