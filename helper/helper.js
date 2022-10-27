import { ToastAndroid } from "react-native";

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
