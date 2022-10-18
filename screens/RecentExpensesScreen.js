import { StyleSheet, View, FlatList } from "react-native";
import React from "react";
import TextComponent from "../components/TextComponent";
import ExpenseItem from "../components/ExpenseItem";

export default function RecentExpensesScreen() {
  const DUMMY_EXPENSES = [
    { id: 1, description: "Livro", price: 12.99, date: "13-10-2022" },
    { id: 2, description: "Pastel", price: 4.99, date: "15-10-2022" },
    { id: 3, description: "Pastel", price: 4.99, date: "16-10-2022" },
    { id: 4, description: "Chinelo", price: 49.99, date: "17-10-2022" },
  ];

  const totalExpenses = DUMMY_EXPENSES.map((expense) => expense.price)
    .reduce((accumulator, curr) => accumulator + curr)
    .toFixed(2);

  return (
    <View style={styles.rootContainer}>
      <View style={styles.itemsHeader}>
        <View>
          <TextComponent
            style={{
              textAlign: "center",
              fontFamily: "open-sans",
            }}
          >
            Gastos dos últimos 7 dias
          </TextComponent>
        </View>
        <View>
          <TextComponent style={{ fontFamily: "open-sans-bold" }}>
            {totalExpenses}
          </TextComponent>
        </View>
      </View>
      <View style={styles.items}>
        <FlatList
          data={DUMMY_EXPENSES}
          showsVerticalScrollIndicator={false}
          renderItem={(itemData) => {
            return (
              <ExpenseItem
                description={itemData.item.description}
                date={itemData.item.date}
                price={itemData.item.price}
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
    marginHorizontal: 25,
    padding: 10,
    borderRadius: 4,
  },
  items: {
    flexDirection: "column",
  },
});
