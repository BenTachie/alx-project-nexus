import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const API_URL = "https://glowa-json-server.vercel.app";


interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
}

export default function HomeScreen() {
  // State variables
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const LIMIT = 10;

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:3000/categories");
      const data = await res.json();
      setCategories(["all", ...data]);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Fetch products (with optional category)
  const fetchProducts = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

   try {
      let url = "";
      if (selectedCategory === "all") {
        url = `${API_URL}/products?_limit=${LIMIT}&_page=${page + 1}`;
      } else {
        url = `${API_URL}/products?category=${selectedCategory}&_limit=${LIMIT}&_page=${
          page + 1
        }`;
      }

      const response = await fetch(url);
      const data: Product[] = await response.json();

      if (data.length > 0) {
        setProducts((prev) => (page === 0 ? data : [...prev, ...data]));
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  }, [page, selectedCategory, loading, hasMore]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setProducts([]);
    setPage(0);
    setHasMore(true);
  }, [selectedCategory]);

  useEffect(() => {
    fetchProducts();
  }, [page, selectedCategory]);

  // Product card 
  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      className="bg-white m-2 p-4 rounded-xl shadow-sm border border-gray-100"
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: item.thumbnail }}
        className="w-full h-44 rounded-lg"
        resizeMode="cover"
      />
      <Text className="text-lg font-semibold mt-2 text-gray-900">
        {item.title}
      </Text>
      <Text className="text-gray-500 text-sm mt-1" numberOfLines={2}>
        {item.description}
      </Text>
      <View className="flex-row items-center justify-between mt-2">
        <Text className="text-blue-600 font-bold text-base">
          R {item.price}
        </Text>
        <Text className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
          {item.category}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="p-3 bg-white shadow-sm"
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            className={`px-5 py-2 mr-3 rounded-full border ${
              selectedCategory === cat
                ? "bg-blue-600 border-blue-600"
                : "bg-gray-100 border-gray-200"
            }`}
            onPress={() => setSelectedCategory(cat)}
            activeOpacity={0.7}
          >
            <Text
              className={`capitalize ${
                selectedCategory === cat
                  ? "text-white font-medium"
                  : "text-gray-700 font-normal"
              }`}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Product List */}
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 8 }}
        onEndReached={() => setPage((prev) => prev + 1)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator size="large" color="#2563eb" className="my-6" />
          ) : null
        }
      />
    </View>
  );
}