import { View, TextInput } from "react-native";

export default function SearchBar() {
  return (
    <View className="flex-row items-center bg-gray-100 rounded-xl px-3 py-2 mx-5">
      <TextInput
        placeholder="Search for products..."
        className="flex-1 text-sm"
      />
    </View>
  );
}
