import { View, Modal, Pressable, StyleSheet } from "react-native";
import TextComponent from "../TextComponent";
import React from "react";

export function ConfirmDeleteExpenseModal({
  modalVisible,
  setModalVisible,
  deleteExpense,
}) {
  return (
    <Modal
      animationType="fade"
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
      visible={modalVisible}
      transparent={true}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextComponent
            style={{
              color: "#ecf0f1",
              fontFamily: "open-sans-semi-bold",
              marginBottom: 15,
            }}
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
            <Pressable onPress={deleteExpense}>
              <View style={[styles.modalButtonsView, { marginRight: 35 }]}>
                <TextComponent style={{ textAlign: "center" }}>
                  Sim
                </TextComponent>
              </View>
            </Pressable>
            <Pressable>
              <View style={styles.modalButtonsView}>
                <TextComponent style={{ textAlign: "center" }}>
                  Não
                </TextComponent>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  modalView: {
    backgroundColor: "#273c75",
    padding: 25,
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
    padding: 8,
    width: 50,
  },
});
