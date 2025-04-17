import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { normalize } from "../../utils/normalize";

const ProductCard = ({ item, onPress }) => {
  const { title, price, thumbnail, rating, discountPercentage } = item;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.95}
    >
      {discountPercentage > 0 && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>
            {discountPercentage.toFixed(2)}% OFF
          </Text>
        </View>
      )}

      <Image
        source={{ uri: thumbnail }}
        style={styles.image}
        contentFit="contain"
      />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.price}>${price}</Text>
          <View
            style={[
              styles.ratingContainer,
              { backgroundColor: rating > 3.5 ? "green" : "red" }, // rating color based on rating
            ]}
          >
            <Text style={styles.ratingText}>{rating.toFixed(1)} ★</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: normalize(20),
    paddingHorizontal: normalize(16),
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  discountBadge: {
    position: "absolute",
    top: 10,
    left: normalize(16),
    backgroundColor: "#FF4B4B",
    paddingHorizontal: normalize(12),
    paddingVertical: 6,
    borderRadius: 6,
    zIndex: 1,
  },
  discountText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: normalize(14),
  },
  image: {
    width: "100%",
    height: normalize(200),
    backgroundColor: "#fff",
  },
  content: {
    padding: normalize(12),
  },
  title: {
    fontSize: normalize(16),
    fontWeight: "500",
    color: "#000",
    marginBottom: 8,
    lineHeight: normalize(22),
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    fontSize: normalize(20),
    fontWeight: "600",
    color: "#00C853",
  },
  ratingContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ratingText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: normalize(14),
  },
});

export default ProductCard;
