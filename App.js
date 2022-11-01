import { useLayoutEffect, useState } from "react";

import { StatusBar } from "expo-status-bar";

import { useFonts } from "expo-font";

import { ExpenseDataContext } from "./context/ExpensesDataContext";

import AppLoading from "expo-app-loading";

import { StackNavigator } from "./components/navigators/StackNavigator";

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

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style="light" />
      <ExpenseDataContext.Provider value={{ ALL_EXPENSES, setAllExpenses }}>
        <StackNavigator />
      </ExpenseDataContext.Provider>
    </>
  );
}
