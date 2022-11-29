import { ToastAndroid } from "react-native";
import axios from "axios";

const BACKEND_URL = "https://expense-tracker-9c984-default-rtdb.firebaseio.com";

export function numberWithoutCommas(x) {
  return Number(x.replace(",", "."));
}

export function numberWithCommas(x) {
  return x.toString().replace(".", ",");
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function sumOfExpenses(expensesArr) {
  if (expensesArr.length < 1) {
    return null;
  } else {
    return numberWithCommas(
      expensesArr
        .map((expense) => numberWithoutCommas(expense.price))
        .reduce((accumulator, curr) => accumulator + curr)
        .toFixed(2)
    );
  }
}

export function toastMessage(message) {
  ToastAndroid.showWithGravity(
    message,
    ToastAndroid.SHORT,
    ToastAndroid.CENTER
  );
}

export function storeExpense(expenseData) {
  axios.post(BACKEND_URL + "/expenses.json", expenseData);
}

export async function getExpenses() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      date: response.data[key].date,
      description: response.data[key].description,
      isBookmarked: response.data[key].isBookmarked,
      obs: response.data[key].obs,
      price: response.data[key].price,
    };

    expenses.push(expenseObj);
  }
  return expenses;
}

export function editExpense(expenseData) {
  axios.put(BACKEND_URL + `/expenses/${expenseData.id}.json`, expenseData);
}

export function deleteExpense(expenseData) {
  axios.delete(BACKEND_URL + `/expenses/${expenseData.id}.json`);
}
