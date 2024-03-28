import { Text, TouchableOpacity } from "react-native";

interface Props {
  type: string;
  onPress: () => void;
  isSelected: boolean;
}

const Button: React.FC<Props> = ({ type, onPress, isSelected }) => {
  return (
    <TouchableOpacity
      className={`
    ${isSelected ? "bg-lighter_primary" : "bg-white"}
    w-1/2 rounded-3xl items-center justify-center
  `}
      onPress={() => onPress()}
    >
      <Text
        className={`
        ${isSelected ? "text-white" : "text-lighter_primary"}
        text-base font-medium
      `}
      >
        {type === "animal" ? "Động Vật" : "Thực Vật"}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
