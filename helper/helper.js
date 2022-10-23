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
  return numberWithCommas(
    expensesArr
      .map((expense) => numberWithoutCommas(expense.price))
      .reduce((accumulator, curr) => accumulator + curr)
      .toFixed(2)
  );
}
