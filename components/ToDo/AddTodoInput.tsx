import { useState } from "react";
import { TextInput, View } from "react-native";
import CustomButton from "./CustomButton";

type Props = {
  onAdd: (text: string) => void;
};

export default function AddTodoInput({ onAdd }: Props) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  return (
    <View className="flex-row items-center mb-4">
      <TextInput
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 bg-white"
        placeholder="Add a todo..."
        value={text}
        onChangeText={setText}
      />
      <CustomButton title="+" onPress={handleAdd} className="ml-2 px-4 py-2" />
    </View>
  );
}
