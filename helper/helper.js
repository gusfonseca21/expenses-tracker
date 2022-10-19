export function numberWithoutCommas(x) {
  return Number(x.replace(",", "."));
}

export function numberWithCommas(x) {
  return x.toString().replace(".", ",");
}
