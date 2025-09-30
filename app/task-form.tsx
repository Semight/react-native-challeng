import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Checkbox, Text, TextInput } from "react-native-paper";
import uuid from "react-native-uuid";

type Task = {
  id: string;
  taskName: string;
  importance: string;
  date: string;
  sendReminder: boolean;
};

export default function TaskForm() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();

  const [taskName, setTaskName] = useState("");
  const [importance, setImportance] = useState("Medium");
  const [date, setDate] = useState("");
  const [sendReminder, setSendReminder] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
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
        // ✅ reset state when no id (new task)
        setIsEdit(false);
        setTaskName("");
        setImportance("Medium");
        setDate("");
        setSendReminder(false);
      }
    };

    loadTask();
  }, [params.id]);

  const handleSave = async () => {
    if (!taskName.trim()) return;

    const stored = await AsyncStorage.getItem("tasks");
    const tasks: Task[] = stored ? JSON.parse(stored) : [];

    if (isEdit && params.id) {
      const updated = tasks.map((t) =>
        t.id === params.id
          ? { ...t, taskName, importance, date, sendReminder }
          : t
      );
      await AsyncStorage.setItem("tasks", JSON.stringify(updated));
    } else {
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
    <View className="flex-1 p-4 bg-white">
      <TextInput
        label="Task Name"
        value={taskName}
        onChangeText={setTaskName}
        mode="outlined"
        className="mb-4"
      />

      <Text className="mb-2">Importance (High | Medium | Low)</Text>
      <TextInput
        label="Importance"
        value={importance}
        onChangeText={setImportance}
        mode="outlined"
        className="mb-4"
      />

      <TextInput
        label="Date"
        value={date}
        onChangeText={setDate}
        mode="outlined"
        className="mb-4"
      />

      <View className="flex-row items-center mb-4">
        <Checkbox
          status={sendReminder ? "checked" : "unchecked"}
          onPress={() => setSendReminder(!sendReminder)}
        />
        <Text>Send Reminder</Text>
      </View>

      <Button mode="contained" onPress={handleSave}>
        {isEdit ? "Update Task" : "Save Task"}
      </Button>
    </View>
  );
}
