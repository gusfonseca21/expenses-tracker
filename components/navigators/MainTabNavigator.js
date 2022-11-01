import { Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import {
  RecentExpensesScreen,
  MonthExpensesScreen,
  AllExpensesScreen,
} from "../../screens";
import React from "react";

export function MainTabNavigator({ navigation }) {
  const Tab = createBottomTabNavigator();

  const screenOptions = (icon, title) => {
    return {
      title: title,
      headerTintColor: "#e1b12c",
      headerTitleAlign: "center",
      tabBarIcon: ({ size, color }) => (
        <Ionicons name={icon} size={size} color={color} />
      ),
    };
  };
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#273c75",
          borderTopWidth: 1,
          borderTopColor: "#ccc",
        },
        tabBarActiveTintColor: "#e1b12c",
        tabBarInactiveTintColor: "#ccc",
        headerStyle: {
          backgroundColor: "#273c75",
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
        },
        headerTitleStyle: {
          fontFamily: "open-sans-bold",
        },

        headerRight: () => (
          <Pressable onPress={() => navigation.navigate("NewExpense")}>
            <Ionicons
              name="add-outline"
              size={30}
              color="white"
              style={{ right: 15 }}
            />
          </Pressable>
        ),
        headerLeft: () => (
          <Pressable onPress={() => navigation.navigate("Bookmarked")}>
            <Ionicons
              name="bookmark-outline"
              size={25}
              color="white"
              style={{ left: 15 }}
            />
          </Pressable>
        ),
      }}
      sceneContainerStyle={{
        backgroundColor: "#192a56",
        flex: 1,
        marginBottom: 6,
      }}
    >
      <Tab.Screen
        name="RecentExpenses"
        component={RecentExpensesScreen}
        options={screenOptions("alarm-outline", "Despesas Recentes")}
      />
      <Tab.Screen
        name="MonthExpenses"
        component={MonthExpensesScreen}
        options={screenOptions("calendar-outline", "Despesas Mensais")}
      />
      <Tab.Screen
        name="AllExpenses"
        component={AllExpensesScreen}
        options={screenOptions("calculator-outline", "Todas as Despesas")}
      />
    </Tab.Navigator>
  );
}
