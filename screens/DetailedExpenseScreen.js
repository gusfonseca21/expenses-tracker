import {
  Pressable,
  StyleSheet,
  View,
  Modal,
  Alert,
  Button,
} from "react-native";
import { useState } from "react";

import { useContext } from "react";
import { ExpenseDataContext } from "../context/ExpensesDataContext";
import TextComponent from "../components/TextComponent";

import { format } from "date-fns";

import { Ionicons } from "@expo/vector-icons";

export function DetailedExpenseScreen({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const { ALL_EXPENSES, setAllExpenses } = useContext(ExpenseDataContext);

  const id = route.params.expenseId;

  const [selectedExpense] = ALL_EXPENSES.filter((expense) => expense.id === id);

  function bookmarkPressHandler() {
    const modifiedExpenses = ALL_EXPENSES.map((expense) => {
      if (expense.id === selectedExpense.id) {
        expense.isBookmarked = !selectedExpense.isBookmarked;
        return expense;
      }
      return expense;
    });
    setAllExpenses(modifiedExpenses);
  }

  function deleteExpenseHandler() {
    setAllExpenses(ALL_EXPENSES.filter((expense) => expense.id !== id));
    navigation.navigate("Home");
  }

  return (
    <View style={styles.rootView}>
      <Modal
        animationType="fade"
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
        visible={modalVisible}
        transparent={true}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextComponent
              style={{ color: "#ecf0f1", fontFamily: "open-sans-semi-bold" }}
            >
              Deseja deletar esta despesa?
            </TextComponent>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 10,
              }}
            >
              <Pressable>
                <View style={styles.modalButtonsView}>
                  <TextComponent>Sim</TextComponent>
                </View>
              </Pressable>
              <Pressable>
                <View style={styles.modalButtonsView}>
                  <TextComponent>Não</TextComponent>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.expenseView}>
        <View style={styles.iconView}>
          <Pressable onPress={bookmarkPressHandler}>
            <Ionicons
              name={
                selectedExpense.isBookmarked ? "bookmark" : "bookmark-outline"
              }
              size={30}
              color={"#000"}
            />
          </Pressable>
        </View>
        <TextComponent
          style={{
            fontFamily: "open-sans-semi-bold",
            textAlign: "center",
            fontSize: 26,
          }}
        >
          {selectedExpense.description}
        </TextComponent>
        <TextComponent
          style={{ fontSize: 16, textAlign: "center", marginTop: 30 }}
        >
          {format(selectedExpense.date, "dd/MM/yyyy")}
        </TextComponent>
        <TextComponent
          style={{
            fontSize: 24,
            fontFamily: "open-sans-bold",
            marginTop: 30,
            textAlign: "center",
          }}
        >{`R$ ${selectedExpense.price}`}</TextComponent>
        <TextComponent
          style={{ fontFamily: "open-sans-semi-bold", marginTop: 30 }}
        >
          Observações:
        </TextComponent>
        <TextComponent style={{ textAlign: "justify", marginHorizontal: 15 }}>
          {selectedExpense.obs === ""
            ? "Não há observações para este gasto"
            : selectedExpense.obs}
        </TextComponent>
      </View>
      <View style={styles.iconsView}>
        <Pressable onPress={() => setModalVisible(true)}>
          <Ionicons name="trash-outline" size={30} color={"#ccc"} />
        </Pressable>
        <Pressable>
          <Ionicons name="pencil" size={30} color={"#ccc"} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootView: {
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    flex: 1,
    position: "relative",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  modalView: {
    margin: 20,
    backgroundColor: "#273c75",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButtonsView: {
    backgroundColor: "white",
    padding: 5,
  },

  iconView: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  expenseView: {
    marginHorizontal: 30,
    marginVertical: 70,
    backgroundColor: "#FDF5AB",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconsView: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
});
