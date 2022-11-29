import { useEffect, useState } from "react";

import { StatusBar } from "expo-status-bar";

import { useFonts } from "expo-font";

import { ExpensesDataContext } from "./context/ExpensesDataContext";

import AppLoading from "expo-app-loading";

import { StackNavigator } from "./components/navigators/StackNavigator";
import { getExpenses } from "./helper/helper";

export default function App() {
  const [ALL_EXPENSES, setAllExpenses] = useState([]);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/Inter-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/Inter-Bold.ttf"),
    "open-sans-semi-bold": require("./assets/fonts/Inter-SemiBold.ttf"),
  });

  useEffect(() => {
    async function fetchExpenses() {
      setAllExpenses((await getExpenses()).reverse());
    }
    fetchExpenses();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style="light" />
      <ExpensesDataContext.Provider value={{ ALL_EXPENSES, setAllExpenses }}>
        <StackNavigator />
      </ExpensesDataContext.Provider>
    </>
  );
}
