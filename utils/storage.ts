import AsyncStorage from "@react-native-async-storage/async-storage";

const NOTES_KEY = "notes";

export type Note = {
  id: string;
  text: string;
  favorite?: boolean;
};

export async function loadNotes(): Promise<Note[]> {
  try {
    const storedNotes = await AsyncStorage.getItem(NOTES_KEY);
    return storedNotes ? JSON.parse(storedNotes) : [];
  } catch (error) {
    console.error("Error loading notes:", error);
    return [];
  }
}

export async function saveNotes(notes: Note[]): Promise<void> {
  try {
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error("Error saving notes:", error);
  }
}

export async function clearNotes(): Promise<void> {
  try {
    await AsyncStorage.removeItem(NOTES_KEY);
  } catch (error) {
    console.error("Error clearing notes:", error);
  }
}
