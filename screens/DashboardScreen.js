import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native";
import Add from "react-native-vector-icons/Ionicons";

export default function DashboardScreen() {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    setTasks([
      ...tasks,
      { name: "Fazer tal coisa", date: "15/07/2002", done: true },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>To Do</Text>
      <View style={styles.tasksContainer}>
        {tasks.map((task, index) => (
          <View key={index}>
            <Task task={task} />
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Add name="add" size={30} color={"white"}></Add>
      </TouchableOpacity>
    </View>
  );
}

const Task = ({ task }) => {
  const toggleDone = (task) => {};

  return (
    <View style={styles.task}>
      <TouchableOpacity
        onPress={() => {
          toggleDone(task);
        }}
        style={[
          styles.checkbox,
          task.done ? { backgroundColor: "blue" } : { backgroundColor: "gray" },
        ]}></TouchableOpacity>
      <Text>{task.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  tasksContainer: {
    flex: 1,
  },
  dateSection: {
    marginBottom: 20,
  },
  date: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  task: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  addButton: {
    display: "flex",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#0000ff",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    marginRight: 15, // Adicionado para espaçamento
  },
});
