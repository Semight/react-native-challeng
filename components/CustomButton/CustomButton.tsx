import { Text, TouchableOpacity } from "react-native";

type ButtonProps = {
  title: string;
  onPress: () => void;
  bgColor?: string;
  textColor?: string;
};

export default function CustomButton({
  title,
  onPress,
  bgColor = "#0369A1",
  textColor = "#fff",
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="py-3 px-6 rounded-lg items-center"
      style={{ backgroundColor: bgColor }}
    >
      <Text className="text-base font-bold" style={{ color: textColor }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
