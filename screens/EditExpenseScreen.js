import { useState } from "react";

import { Pressable, StyleSheet, TextInput, View } from "react-native";

import CurrencyInput from "react-native-currency-input";
import MaskInput, { Masks } from "react-native-mask-input";
import { TextComponent } from "../components";

import { useContext } from "react";
import { ExpensesDataContext } from "../context/ExpensesDataContext";

import { toastMessage } from "../helper/helper";

import { format } from "date-fns";

export function EditExpenseScreen({ route, navigation }) {
  const { ALL_EXPENSES, setAllExpenses } = useContext(ExpensesDataContext);

  const id = route.params.expenseId;

  const [selectedExpense] = ALL_EXPENSES.filter((expense) => expense.id === id);

  const [expenseDescription, setExpenseDescription] = useState({
    value: selectedExpense.description,
    error: "",
  });
  const [expenseCost, setExpenseCost] = useState({
    value: parseInt(selectedExpense.price),
    error: "",
  });
  const [expenseDate, setExpenseDate] = useState({
    value: format(selectedExpense.date, "dd/MM/yyyy"),
    error: "",
  });
  const [expenseObservation, setExpenseObservation] = useState(
    selectedExpense.obs
  );

  function addExpenseHandler() {
    if (expenseDescription.value.trim() === "") {
      setExpenseDescription({
        value: "",
        error: "É preciso conter uma descrição!",
      });
      return;
    }
    if (expenseCost.value === "" || expenseCost.value <= 0) {
      setExpenseCost({
        value: "",
        error: "É preciso conter um valor!",
      });
      return;
    }
    if (expenseDate.value === "" || expenseDate.value.length !== 10) {
      setExpenseDate({ value: "", error: "É preciso conter uma data válida!" });
      return;
    }

    const transformedDate = `${
      expenseDate.value[3] +
      expenseDate.value[4] +
      "/" +
      expenseDate.value[0] +
      expenseDate.value[1] +
      "/" +
      expenseDate.value[6] +
      expenseDate.value[7] +
      expenseDate.value[8] +
      expenseDate.value[9]
    }`;

    const editedExpense = {
      id: selectedExpense.id,
      description: expenseDescription.value,
      price: expenseCost.value.toFixed(2).toString().replace(".", ","),
      date: new Date(transformedDate).valueOf(),
      obs: expenseObservation,
      isBookmarked: selectedExpense.isBookmarked,
    };

    // setAllExpenses((prevExpenses) => [newExpense, ...prevExpenses]);

    const newExpensesArray = ALL_EXPENSES.map((expense) => {
      if (expense.id === selectedExpense.id) {
        return editedExpense;
      }
      return expense;
    });

    setAllExpenses(newExpensesArray);

    setExpenseDescription({ value: "", error: "" });
    setExpenseCost({ value: "", error: "" });
    setExpenseDate({ value: "", error: "" });
    setExpenseObservation("");

    navigation.goBack();

    setTimeout(() => {
      toastMessage("Produto editado com sucesso");
    }, 700);
  }

  return (
    <View style={styles.rootContainer}>
      <TextInput
        placeholder={`${
          expenseDescription.error === ""
            ? "Descrição *"
            : expenseDescription.error
        }`}
        placeholderTextColor={`${
          expenseDescription.error !== "" ? "#e82525" : "#888"
        }`}
        onFocus={() =>
          setExpenseDescription({ value: expenseDescription.value, error: "" })
        }
        style={styles.inputView}
        value={expenseDescription.value}
        onChangeText={(text) =>
          setExpenseDescription({ value: text, error: "" })
        }
        cursorColor="#192a56"
      />
      <CurrencyInput
        placeholder={`${
          expenseCost.error === "" ? "Custo *" : expenseCost.error
        }`}
        placeholderTextColor={`${
          expenseCost.error !== "" ? "#e82525" : "#888"
        }`}
        onFocus={() => setExpenseCost({ value: expenseCost.value, error: "" })}
        style={styles.inputView}
        keyboardType="numeric"
        prefix="R$ "
        delimiter="."
        separator=","
        precision={2}
        value={expenseCost.value}
        onChangeValue={(cost) => setExpenseCost({ value: cost, error: "" })}
        cursorColor="#192a56"
      />
      <MaskInput
        placeholder={`${
          expenseDate.error === "" ? "Data *" : expenseDate.error
        }`}
        placeholderTextColor={`${
          expenseDate.error !== "" ? "#e82525" : "#888"
        }`}
        onFocus={() => setExpenseDate({ value: expenseDate.value, error: "" })}
        style={styles.inputView}
        value={expenseDate.value}
        mask={Masks.DATE_DDMMYYYY}
        keyboardType="numeric"
        onChangeText={(maskedText) =>
          setExpenseDate({ value: maskedText, error: "" })
        }
        cursorColor="#192a56"
      />
      <TextInput
        placeholder="Observações"
        style={styles.inputView}
        value={expenseObservation}
        multiline
        onChangeText={(text) => setExpenseObservation(text)}
        cursorColor="#192a56"
      />
      <TextComponent style={{ color: "#ccc", textAlign: "center" }}>
        * Obrigatório
      </TextComponent>
      <Pressable
        style={styles.buttonView}
        android_ripple={{ color: "#ccc" }}
        onPress={addExpenseHandler}
      >
        <View style={styles.textComponentView}>
          <TextComponent
            style={{
              fontFamily: "open-sans-semi-bold",
              color: "#ccc",
              fontSize: 20,
            }}
          >
            Editar
          </TextComponent>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
    justifyContent: "space-around",
  },
  inputTitle: {
    fontSize: 20,
    color: "#ecf0f1",
  },
  inputView: {
    padding: 6,
    width: "100%",
    backgroundColor: "#ecf0f1",
    fontSize: 18,
    borderRadius: 4,
  },
  buttonView: {
    height: 60,
    width: "100%",
    backgroundColor: "#273c75",
    borderRadius: 4,
    marginTop: 30,
  },
  textComponentView: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  errorText: {
    position: "absolute",
    top: 45,
    color: "red",
  },
});
