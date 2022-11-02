import { useContext } from "react";

import { StyleSheet, View, SectionList } from "react-native";

import {
  ExpenseItem,
  ExpensesItemsHeader,
  NoExpensesTextComponent,
} from "../components";

import { ExpensesDataContext } from "../context/ExpensesDataContext";

import { capitalizeFirstLetter, sumOfExpenses } from "../helper/helper";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function AllExpensesScreen({ navigation, route }) {
  const { ALL_EXPENSES } = useContext(ExpensesDataContext);

  const expensesPerMonth = [
    { month: "janeiro", expenses: [], totalExpenses: 0 },
    { month: "fevereiro", expenses: [], totalExpenses: 0 },
    { month: "março", expenses: [], totalExpenses: 0 },
    { month: "abril", expenses: [], totalExpenses: 0 },
    { month: "maio", expenses: [], totalExpenses: 0 },
    { month: "junho", expenses: [], totalExpenses: 0 },
    { month: "julho", expenses: [], totalExpenses: 0 },
    { month: "agosto", expenses: [], totalExpenses: 0 },
    { month: "setembro", expenses: [], totalExpenses: 0 },
    { month: "outubro", expenses: [], totalExpenses: 0 },
    { month: "novembro", expenses: [], totalExpenses: 0 },
    { month: "dezembro", expenses: [], totalExpenses: 0 },
  ];

  ALL_EXPENSES.forEach((expense) => {
    expensesPerMonth.forEach((month) => {
      if (format(expense.date, "MMMM", { locale: ptBR }) === month.month) {
        month.expenses.push(expense);
      }
    });
  });

  const monthsWithExpenses = expensesPerMonth
    .filter((month) => month.expenses.length > 0)
    .reverse();

  const totalExpenses = sumOfExpenses(ALL_EXPENSES);

  return (
    <View style={styles.rootContainer}>
      {monthsWithExpenses.length > 0 && (
        <SectionList
          ListHeaderComponent={
            <ExpensesItemsHeader
              totalExpenses={`R$ ${totalExpenses}`}
              style={{ marginBottom: 2 }}
            >
              Total de gastos:
            </ExpensesItemsHeader>
          }
          showsVerticalScrollIndicator={false}
          sections={monthsWithExpenses.map((month) => {
            return { title: month.month, data: month.expenses };
          })}
          renderItem={({ item }) => (
            <ExpenseItem
              description={item.description}
              date={format(item.date, "dd/MM/yyyy", { locale: ptBR })}
              price={item.price}
              navigation={navigation}
              route={route}
              id={item.id}
            />
          )}
          renderSectionHeader={({ section }) => {
            return (
              <ExpensesItemsHeader
                textStyle={{
                  fontFamily: "open-sans-semi-bold",
                }}
                totalExpenses={sumOfExpenses(section.data)}
              >
                {`${capitalizeFirstLetter(section.title)}:`}
              </ExpensesItemsHeader>
            );
          }}
        />
      )}
      {monthsWithExpenses.length === 0 && (
        <NoExpensesTextComponent>
          Você ainda não possui gastos
        </NoExpensesTextComponent>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    height: "100%",
    marginHorizontal: 20,
  },
});
