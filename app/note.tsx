import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Note = {
  id: string;
  text: string;
};

export default function NotesApp() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem("notes");
        if (storedNotes) {
          setNotes(JSON.parse(storedNotes));
        }
      } catch (error) {
        console.log("Error loading notes:", error);
      }
    };
    loadNotes();
  }, []);

  useEffect(() => {
    const saveNotes = async () => {
      try {
        await AsyncStorage.setItem("notes", JSON.stringify(notes));
      } catch (error) {
        console.log("Error saving notes:", error);
      }
    };
    saveNotes();
  }, [notes]);

  const addNote = () => {
    if (input.trim().length === 0) return;
    const newNote: Note = {
      id: Date.now().toString(),
      text: input.trim(),
    };
    setNotes([newNote, ...notes]);
    setInput("");
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900 p-4">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Notes App
      </Text>

      <View className="flex-row mb-4">
        <TextInput
          placeholder="Write a note..."
          value={input}
          onChangeText={setInput}
          className="flex-1 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-900 dark:text-white"
        />
        <TouchableOpacity
          onPress={addNote}
          className="ml-2 bg-blue-500 px-4 rounded-lg justify-center"
        >
          <Text className="text-white font-semibold">Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row justify-between items-center bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mb-2">
            <Text className="text-gray-900 dark:text-white">{item.text}</Text>
            <TouchableOpacity
              onPress={() => deleteNote(item.id)}
              className="ml-2 bg-red-500 px-3 py-1 rounded-lg"
            >
              <Text className="text-white font-semibold">Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
