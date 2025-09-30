import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Button, Card, Dialog, FAB, IconButton, Portal, Text, useTheme } from "react-native-paper";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";

type Task = {
  id: string;
  taskName: string;
  importance: string;
  date: string;
  sendReminder: boolean;
};

export default function TaskList() {
  const router = useRouter();
  const { colors } = useTheme();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  // Reload tasks every time screen is focused
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
  };

  const confirmDelete = (id: string) => {
    setTaskToDelete(id);
    setConfirmVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (taskToDelete) {
      await handleDelete(taskToDelete);
      setTaskToDelete(null);
      setConfirmVisible(false);
    }
  };

  const handleCancelDelete = () => {
    setTaskToDelete(null);
    setConfirmVisible(false);
  };

  const renderItem = ({ item }: { item: Task }) => (
    <Animated.View
      entering={FadeInDown.springify()}
      exiting={FadeOutUp}
      style={{ marginBottom: 12 }}
    >
      <Card style={{ backgroundColor: colors.surface }}>
        <Card.Title
          title={item.taskName}
          subtitle={item.date || "No date"}
          right={(props) => (
            <IconButton
              {...props}
              icon="delete"
              onPress={() => confirmDelete(item.id)}
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
    </Animated.View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {tasks.length === 0 ? (
        <Text
          style={{
            textAlign: "center",
            fontWeight: "600",
            fontSize: 16,
            marginTop: 24,
            color: colors.onSurfaceDisabled,
          }}
        >
          No tasks yet. Tap + to add one.
        </Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push("/task-form?new=true")}
      />

      <Portal>
        <Dialog visible={confirmVisible} onDismiss={handleCancelDelete}>
          <Dialog.Title>Delete Task</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to delete this task?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleCancelDelete}>Cancel</Button>
            <Button onPress={handleConfirmDelete}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
