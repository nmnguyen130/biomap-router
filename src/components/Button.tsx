import { Text, TouchableOpacity } from "react-native";

interface Props {
  onPress: () => void;
  isSelected?: boolean;
  width?: "half" | "full";
  value: string;
}

const Button: React.FC<Props> = ({
  width = "full",
  onPress,
  isSelected = true,
  value,
}) => {
  const buttonWidth = width === "full" ? "w-full p-4 mt-4" : "w-1/2";

  return (
    <TouchableOpacity
      className={`
    ${isSelected ? "bg-lighter_primary" : "bg-white"}
    ${buttonWidth} rounded-3xl items-center justify-center
  `}
      onPress={() => onPress()}
    >
      <Text
        className={`
        ${isSelected ? "text-white" : "text-lighter_primary"}
        text-base font-medium
      `}
      >
        {value}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
