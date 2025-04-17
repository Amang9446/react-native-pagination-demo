import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { normalize } from "../../utils/normalize";

const ErrorView = ({ error, onRetry, retryText = "Retry" }) => (
  <View style={styles.container}>
    <Text style={styles.errorText}>Error: {error}</Text>
    {onRetry && (
      <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
        <Text style={styles.retryButtonText}>{retryText}</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    marginBottom: normalize(16),
  },
  retryButton: {
    backgroundColor: "#007AFF",
    padding: normalize(12),
    borderRadius: 8,
  },
  retryButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ErrorView;
