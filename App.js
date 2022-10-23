import { useLayoutEffect, useState } from "react";

import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RecentExpensesScreen } from "./screens/RecentExpensesScreen";
import { MonthExpensesScreen } from "./screens/MonthExpensesScreen";
import { DetailedExpenseScreen } from "./screens/DetailedExpenseScreen";
import { AllExpensesScreen } from "./screens/AllExpensesScreen";
import { NewExpenseScreen } from "./screens/NewExpenseScreen";
import { BookmarkedExpensesScreen } from "./screens/BookmarkedExpensesScreen";

import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

import { ExpenseDataContext } from "./context/ExpensesDataContext";

import AppLoading from "expo-app-loading";
import { Pressable } from "react-native";

export default function App() {
  const [ALL_EXPENSES, setAllExpenses] = useState([
    {
      id: 1,
      description: "Livro",
      price: "12,99",
      date: 1663027200000,
      obs: "",
      isBookmarked: false,
    },
    {
      id: 2,
      description: "Pastel",
      price: "4,99",
      date: 1663286400000,
      obs: "",
      isBookmarked: false,
    },
    {
      id: 3,
      description: "Chinelo",
      price: "49,99",
      date: 1663372800000,
      obs: "",
      isBookmarked: false,
    },
    {
      id: 4,
      description: "Remédio",
      price: "99,99",
      date: 1663632000000,
      obs: "",
      isBookmarked: false,
    },
    {
      id: 5,
      description: "Cigarro",
      price: "5,00",
      date: 1664236800000,
      obs: "",
      isBookmarked: false,
    },
    {
      id: 6,
      description: "Consulta",
      price: "200,00",
      date: 1664323200000,
      obs: "",
      isBookmarked: false,
    },
    { id: 7, description: "Bar", price: "45,30", date: 1665446400000, obs: "" },
    {
      id: 8,
      description: "Uber",
      price: "25,25",
      date: 1665532800000,
      obs: "",
      isBookmarked: false,
    },
    {
      id: 9,
      description: "Espanador",
      price: "20,99",
      date: 1665964800000,
      obs: "O corre corre da cidade grande",
      isBookmarked: true,
    },
    {
      id: 10,
      description: "Lápis",
      price: "2,00",
      date: 1666051200000,
      obs: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
      isBookmarked: true,
    },
    {
      id: 11,
      description: "Pão",
      price: "6,00",
      date: 1666541684000,
      obs: "5 pães",
      isBookmarked: true,
    },
    {
      id: 12,
      description: "Bomba de chocolate",
      price: "3,50",
      date: 1666541684000,
      obs: "",
      isBookmarked: false,
    },
    {
      id: 14,
      description: "Carregador",
      price: "30,00",
      date: 1666541684000,
      obs: "",
      isBookmarked: false,
    },
  ]);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/Inter-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/Inter-Bold.ttf"),
    "open-sans-semi-bold": require("./assets/fonts/Inter-SemiBold.ttf"),
  });

  useLayoutEffect(() => {
    setAllExpenses(ALL_EXPENSES.reverse());
  }, []);

  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

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

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  function MainTabNavigator({ navigation }) {
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

  return (
    <>
      <StatusBar style="light" />
      <ExpenseDataContext.Provider value={{ ALL_EXPENSES, setAllExpenses }}>
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
      </ExpenseDataContext.Provider>
    </>
  );
}
