import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { MainTabNavigator } from "./MainTabNavigator";

import {
  DetailedExpenseScreen,
  NewExpenseScreen,
  BookmarkedExpensesScreen,
} from "../../screens";

export function StackNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#273c75",
          },
          contentStyle: {
            backgroundColor: "#192a56",
          },
          headerTintColor: "#ecf0f1",
          headerTitleStyle: {
            color: "#e1b12c",
            fontFamily: "open-sans-bold",
          },
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={MainTabNavigator}
        />
        <Stack.Screen
          name="Details"
          component={DetailedExpenseScreen}
          options={{ headerTitle: "Detalhes" }}
        />
        <Stack.Screen
          name="NewExpense"
          component={NewExpenseScreen}
          options={{ headerTitle: "Nova Despesa" }}
        />
        <Stack.Screen
          name="Bookmarked"
          component={BookmarkedExpensesScreen}
          options={{ headerTitle: "Despesas Favoritadas" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
