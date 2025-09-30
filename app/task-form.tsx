import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Checkbox,
  Menu,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import {
  DatePickerModal,
  enGB,
  registerTranslation,
} from "react-native-paper-dates";
import uuid from "react-native-uuid";
registerTranslation("en-GB", enGB);

type Task = {
  id: string;
  taskName: string;
  importance: string;
  date: string;
  sendReminder: boolean;
};

const importanceOptions = [
  { label: "High", value: "High" },
  { label: "Medium", value: "Medium" },
  { label: "Low", value: "Low" },
];

export default function TaskForm() {
  const router = useRouter();
  const { colors } = useTheme();
  const params = useLocalSearchParams<{ id?: string; new?: string }>();

  const [taskName, setTaskName] = useState("");
  const [importance, setImportance] = useState("Medium");
  const [date, setDate] = useState("");
  const [sendReminder, setSendReminder] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState("");

  // Dropdown state using react-native-paper Menu
  const [menuVisible, setMenuVisible] = useState(false);

  // Date picker state
  const [open, setOpen] = useState(false);

 useFocusEffect(
    React.useCallback(() => {
      const loadTask = async () => {
        if (params.id) {
          setIsEdit(true);
          const stored = await AsyncStorage.getItem("tasks");
          if (stored) {
            const tasks: Task[] = JSON.parse(stored);
            const task = tasks.find((t) => t.id === params.id);
            if (task) {
              setTaskName(task.taskName);
              setImportance(task.importance);
              setDate(task.date);
              setSendReminder(task.sendReminder);
            }
          }
        } else {
          // Always reset when not editing
          setIsEdit(false);
          setTaskName("");
          setImportance("Medium");
          setDate("");
          setSendReminder(false);
        }
      };
      loadTask();
    }, [params.id])
  );

  const handleSave = async () => {
    if (!taskName.trim()) {
      setError("Task name is required.");
      return;
    }
    setError("");

    const stored = await AsyncStorage.getItem("tasks");
    const tasks: Task[] = stored ? JSON.parse(stored) : [];

    if (isEdit && params.id) {
      // Update existing task
      const updated = tasks.map((t) =>
        t.id === params.id
          ? { ...t, taskName, importance, date, sendReminder }
          : t
      );
      await AsyncStorage.setItem("tasks", JSON.stringify(updated));
    } else {
      // Create new task
      const newTask: Task = {
        id: uuid.v4().toString(),
        taskName,
        importance,
        date,
        sendReminder,
      };
      tasks.push(newTask);
      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
    }

    router.replace("/task-list");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Task Name */}
      <TextInput
        label="Task Name"
        value={taskName}
        onChangeText={setTaskName}
        mode="outlined"
        style={styles.input}
      />

      {/* Importance Dropdown using react-native-paper Menu */}
      <View style={styles.input}>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <View>
              <Button
                mode="outlined"
                onPress={() => setMenuVisible(true)}
                contentStyle={{ justifyContent: "flex-start" }}
                style={{ width: "100%" }}
              >
                {importance || "Select Importance"}
              </Button>
            </View>
          }
        >
          {importanceOptions.map((option) => (
            <Menu.Item
              key={option.value}
              onPress={() => {
                setImportance(option.value);
                setMenuVisible(false);
              }}
              title={option.label}
            />
          ))}
        </Menu>
      </View>

      {/* Date Picker */}
      <TextInput
        label="Date"
        value={date}
        mode="outlined"
        editable={false}
        style={styles.input}
        right={<TextInput.Icon icon="calendar" onPress={() => setOpen(true)} />}
      />
      <DatePickerModal
        locale="en-GB"
        mode="single"
        visible={open}
        onDismiss={() => setOpen(false)}
        date={date ? new Date(date) : undefined}
        onConfirm={({ date }: { date: Date | undefined }) => {
          setOpen(false);
          if (date) {
            // Fix: Use local date parts to avoid timezone shift
            const yyyy = date.getFullYear();
            const mm = String(date.getMonth() + 1).padStart(2, "0");
            const dd = String(date.getDate()).padStart(2, "0");
            setDate(`${yyyy}-${mm}-${dd}`);
          }
        }}
      />

      {/* Reminder Checkbox */}
      <View style={styles.checkboxRow}>
        <Checkbox
          status={sendReminder ? "checked" : "unchecked"}
          onPress={() => setSendReminder(!sendReminder)}
        />
        <Text>Send Reminder</Text>
      </View>

      {/* Error Message */}
      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

      {/* Save Button */}
      <Button mode="contained" onPress={handleSave}>
        {isEdit ? "Update Task" : "Save Task"}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
});
