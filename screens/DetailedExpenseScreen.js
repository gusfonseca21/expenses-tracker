import { useContext, useState } from "react";

import { Pressable, StyleSheet, View } from "react-native";

import { ExpensesDataContext } from "../context/ExpensesDataContext";

import { TextComponent, ConfirmDeleteExpenseModal } from "../components";

import { format } from "date-fns";

import { deleteExpense, toastMessage } from "../helper/helper";

import { Ionicons } from "@expo/vector-icons";

import { BlurView } from "expo-blur";

export function DetailedExpenseScreen({ route, navigation }) {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const { ALL_EXPENSES, setAllExpenses } = useContext(ExpensesDataContext);

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
    deleteExpense(selectedExpense);
    navigation.navigate("Home");
    setTimeout(() => {
      toastMessage("Produto deletado com sucesso");
    }, 700);
  }

  return (
    <View style={styles.rootView}>
      <ConfirmDeleteExpenseModal
        modalVisible={deleteModalVisible}
        setModalVisible={setDeleteModalVisible}
        deleteExpense={deleteExpenseHandler}
      />
      {deleteModalVisible && (
        <BlurView intensity={100} style={styles.blurContainer} tint="dark" />
      )}
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
        <Pressable
          onPress={() => setDeleteModalVisible(true)}
          android_ripple={{ color: "#ccc" }}
        >
          <View style={styles.singleIconView}>
            <Ionicons name="trash-outline" size={30} color={"#ccc"} />
          </View>
        </Pressable>

        <Pressable
          android_ripple={{ color: "#ccc" }}
          onPress={() =>
            navigation.navigate("EditExpense", {
              expenseId: id,
            })
          }
        >
          <View style={styles.singleIconView}>
            <Ionicons name="pencil" size={30} color={"#ccc"} />
          </View>
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

  blurContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1000,
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
    bottom: 0,
    alignSelf: "center",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  singleIconView: {
    width: 80,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
});
