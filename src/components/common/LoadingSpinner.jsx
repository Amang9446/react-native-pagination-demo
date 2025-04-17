import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const LoadingSpinner = ({ size = "large", style }) => (
  <View style={[styles.container, style]}>
    <ActivityIndicator size={size} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingSpinner;
