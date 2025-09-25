import { View, Text, TouchableOpacity } from "react-native";
import HomeIcon from "../assets/icons/Home.svg";
import ShopIcon from "../assets/icons/Shop.svg";
import FavIcon from "../assets/icons/Fav.svg";
import BagIcon from "../assets/icons/Bag.svg";
import ProfileIcon from "../assets/icons/Profile.svg";

export default function BottomNav() {
  return (
    <View className="flex-row justify-around items-center border-t border-gray-200 py-2">
      <TouchableOpacity className="items-center">
        <HomeIcon width={24} height={24} fill="#333" />
        <Text className="text-xs">Home</Text>
      </TouchableOpacity>

      <TouchableOpacity className="items-center">
        <ShopIcon width={24} height={24} fill="#333" />
        <Text className="text-xs">Shop</Text>
      </TouchableOpacity>

      <TouchableOpacity className="items-center">
        <FavIcon width={24} height={24} fill="#333" />
        <Text className="text-xs">Favorites</Text>
      </TouchableOpacity>

      <TouchableOpacity className="items-center">
        <BagIcon width={24} height={24} fill="#333" />
        <Text className="text-xs">Bag</Text>
      </TouchableOpacity>

      <TouchableOpacity className="items-center">
        <ProfileIcon width={24} height={24} fill="#333" />
        <Text className="text-xs">Profile</Text>
      </TouchableOpacity>
    </View>
  );
}
