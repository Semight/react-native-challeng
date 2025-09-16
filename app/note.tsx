import { useTheme } from "@/components/context/ThemeContext";
import { clearNotes, loadNotes, Note, saveNotes } from "@/utils/storage";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotesApp() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const { theme, toggleTheme } = useTheme();
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load notes on mount
  useEffect(() => {
    (async () => {
      setNotes(await loadNotes());
    })();
  }, []);

  // Debounced save
  useEffect(() => {
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      saveNotes(notes);
    }, 400);

    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, [notes]);

  const addOrUpdateNote = () => {
    if (!input.trim()) return;

    if (editingId) {
      // update
      setNotes((prev) =>
        prev.map((n) => (n.id === editingId ? { ...n, text: input.trim() } : n))
      );
      setEditingId(null);
    } else {
      // add
      const newNote: Note = {
        id: Date.now().toString(),
        text: input.trim(),
        favorite: false,
      };
      setNotes([newNote, ...notes]);
    }

    setInput("");
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const toggleFavorite = (id: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, favorite: !n.favorite } : n))
    );
  };

  const startEdit = (note: Note) => {
    setEditingId(note.id);
    setInput(note.text);
  };

  const clearAll = () => {
    Alert.alert("Clear All Notes", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        style: "destructive",
        onPress: async () => {
          setNotes([]);
          await clearNotes();
        },
      },
    ]);
  };

  return (
    <SafeAreaView
      className={`flex-1 p-4 ${
        theme === "dark" ? "bg-gray-900" : "bg-white"
      }`}
    >
      {/* Header with Theme Toggle */}
      <View className="flex-row justify-between items-center mb-4">
        <Text
          className={`text-2xl font-bold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Notes App
        </Text>
        <TouchableOpacity
          onPress={toggleTheme}
          className="px-3 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg"
        >
          <Text
            className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}
          >
            {theme === "light" ? "Dark" : "Light"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Input */}
      <View className="flex-row mb-4">
        <TextInput
          placeholder="Write a note..."
          value={input}
          onChangeText={setInput}
          className={`flex-1 p-3 rounded-lg ${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-gray-100 text-gray-900"
          }`}
        />
        <TouchableOpacity
          onPress={addOrUpdateNote}
          className="ml-2 bg-blue-500 px-4 rounded-lg justify-center"
        >
          <Text className="text-white font-semibold">
            {editingId ? "Update" : "Add"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notes List */}
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            className={`flex-row justify-between items-center p-3 rounded-lg mb-2 ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <Text
              className={`flex-1 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              } ${item.favorite ? "font-bold underline" : ""}`}
            >
              {item.text}
            </Text>

            <View className="flex-row gap-2">
              <TouchableOpacity
                onPress={() => toggleFavorite(item.id)}
                className="px-2 py-1 bg-yellow-400 rounded-lg"
              >
                <Text className="text-black">
                  {item.favorite ? "★" : "☆"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => startEdit(item)}
                className="px-2 py-1 bg-green-500 rounded-lg"
              >
                <Text className="text-white">Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => deleteNote(item.id)}
                className="px-2 py-1 bg-red-500 rounded-lg"
              >
                <Text className="text-white">Del</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Clear All Button */}
      {notes.length > 0 && (
        <TouchableOpacity
          onPress={clearAll}
          className="mt-4 bg-red-600 p-3 rounded-lg"
        >
          <Text className="text-white text-center font-semibold">
            Clear All Notes
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
