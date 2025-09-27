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

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

export default function HomeScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); 
  const [hasMore, setHasMore] = useState(true);

  const LIMIT = 10;
  const API_URL = "http://localhost:5000"; // Fetch from local JSON server

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Fetch products (with optional category)
  const fetchProducts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      let url = `${API_URL}/products?_page=${page}&_limit=${LIMIT}`;
      if (selectedCategory !== "all") {
        url += `&category=${selectedCategory}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.length > 0) {
        setProducts((prev) =>
          page === 1 ? data : [...prev, ...data]
        );
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

  // Reset when category changes
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [selectedCategory]);

  // Fetch products on page/category change
  useEffect(() => {
    fetchProducts();
  }, [page, selectedCategory]);

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity className="bg-white m-2 p-4 rounded-lg shadow">
      <Image
        source={{ uri: item.thumbnail }}
        className="w-full h-40 rounded-md"
        resizeMode="cover"
      />
      <Text className="text-lg font-bold mt-2">{item.title}</Text>
      <Text className="text-gray-600" numberOfLines={2}>
        {item.description}
      </Text>
      <Text className="text-blue-600 font-semibold mt-1">R {item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-100">
      {/* Category Filter Bar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="p-2 bg-white"
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            className={`px-4 py-2 mr-2 rounded-full ${
              selectedCategory === cat ? "bg-blue-600" : "bg-gray-200"
            }`}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              className={`${
                selectedCategory === cat
                  ? "text-white font-semibold"
                  : "text-gray-700"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Product List with Infinite Scroll */}
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 10 }}
        onEndReached={() => setPage((prev) => prev + 1)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator size="large" color="#2563eb" className="my-4" />
          ) : null
        }
      />
    </View>
  );
}
