import AddTodoInput from "@/components/ToDo/AddTodoInput";
import TodoItem from "@/components/ToDo/TodoItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // 🔹 Load todos on mount
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const saved = await AsyncStorage.getItem("todos");
        if (saved) {
          setTodos(JSON.parse(saved));
        }
      } catch (error) {
        console.error("Error loading todos:", error);
      }
    };
    loadTodos();
  }, []);

  useEffect(() => {
    const saveTodos = async () => {
      try {
        await AsyncStorage.setItem("todos", JSON.stringify(todos));
      } catch (error) {
        console.error("Error saving todos:", error);
      }
    };
    saveTodos();
  }, [todos]);

  const addTodo = (text: string) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <View className="flex-1 bg-sky-100 p-5">
      <Text className="text-2xl font-bold text-sky-800 mb-4">My Todo List</Text>

      <AddTodoInput onAdd={addTodo} />

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem
            id={item.id}
            text={item.text}
            completed={item.completed}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        )}
      />
    </View>
  );
}
