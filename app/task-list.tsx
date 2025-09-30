import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, View } from "react-native";
import { Card, FAB, IconButton, Text } from "react-native-paper";

type Task = {
  id: string;
  taskName: string;
  importance: string;
  date: string;
  sendReminder: boolean;
};

export default function TaskList() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);

  useFocusEffect(
  useCallback(() => {
    const loadTasks = async () => {
      try {
        const stored = await AsyncStorage.getItem("tasks");
        if (stored) {
          setTasks(JSON.parse(stored));
        }
      } catch (err) {
        console.log("Error loading tasks", err);
      }
    };
    loadTasks();
  }, [])
);

const handleDelete = async (id: string) => {
  const filtered = tasks.filter((t) => t.id !== id);
  setTasks(filtered);
  await AsyncStorage.setItem("tasks", JSON.stringify(filtered));
}

const renderItem = ({ item }: { item: Task }) => (
    <Card className="mb-3">
      <Card.Title
        title={item.taskName}
        subtitle={item.date || "No date"}
        right={(props) => (
          <IconButton
            {...props}
            icon="delete"
            onPress={() => handleDelete(item.id)}
          />
        )}
      />
      <Card.Content>
        <Text>Importance: {item.importance}</Text>
        <Text>Reminder: {item.sendReminder ? "Yes" : "No"}</Text>
      </Card.Content>
      <Card.Actions>
        <IconButton
          icon="pencil"
          onPress={() =>
            router.push({
              pathname: "/task-form",
              params: { id: item.id },
            })
          }
        />
      </Card.Actions>
    </Card>
  );

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {tasks.length === 0 ? (
        <Text className="text-center font-semibold text-lg m-auto text-gray-500 mt-2">
          No tasks yet. Tap + to add one.
        </Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}

      <FAB
        icon="plus"
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
        }}
        onPress={() => router.push("/task-form")}
      />
    </View>
  );
}