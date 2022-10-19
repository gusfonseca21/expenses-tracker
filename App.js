import { useEffect, useState } from "react";

import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import AllExpensesScreen from "./screens/AllExpensesScreen";
import RecentExpensesScreen from "./screens/RecentExpensesScreen";

import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

import AppLoading from "expo-app-loading";
import { ExpenseDataContext } from "./context/ExpensesDataContext";
import { MonthExpensesScreen } from "./screens/MonthExpensesScreen";

export default function App() {
  const [ALL_EXPENSES, setAllExpenses] = useState([
    { id: 1, description: "Livro", price: "12,99", date: 1663027200000 },
    { id: 2, description: "Pastel", price: "4,99", date: 1663286400000 },
    { id: 3, description: "Chinelo", price: "49,99", date: 1663372800000 },
    { id: 4, description: "Remédio", price: "99,99", date: 1663632000000 },
    { id: 5, description: "Cigarro", price: "5,00", date: 1664236800000 },
    { id: 6, description: "Consulta", price: "200,00", date: 1664323200000 },
    { id: 7, description: "Bar", price: "45,30", date: 1665446400000 },
    { id: 8, description: "Uber", price: "25,25", date: 1665532800000 },
    { id: 9, description: "Espanador", price: "20,99", date: 1665964800000 },
    { id: 10, description: "Lápis", price: "2,00", date: 1666051200000 },
  ]);

  useEffect(() => {
    setAllExpenses(ALL_EXPENSES.reverse());
  }, [ALL_EXPENSES]);

  const Tab = createBottomTabNavigator();

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/Inter-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/Inter-Bold.ttf"),
    "open-sans-semi-bold": require("./assets/fonts/Inter-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

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
    <>
      <StatusBar style="light" />
      <ExpenseDataContext.Provider value={{ ALL_EXPENSES, setAllExpenses }}>
        <NavigationContainer>
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
                <Ionicons name="add-outline" size={30} color="white" />
              ),
            }}
            sceneContainerStyle={{
              backgroundColor: "#192a56",
              paddingBottom: 70,
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
        </NavigationContainer>
      </ExpenseDataContext.Provider>
    </>
  );
}
