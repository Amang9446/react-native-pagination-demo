import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { normalize } from "../../utils/normalize";

const ErrorView = ({
  error,
  onRetry,
  retryText = "Retry",
  containerStyle,
  minimal = false,
}) => (
  <View
    style={[
      styles.container,
      minimal && styles.minimalContainer,
      containerStyle,
    ]}
  >
    <Text style={[styles.errorText, minimal && styles.minimalErrorText]}>
      {error}
    </Text>
    {onRetry && (
      <TouchableOpacity
        style={[styles.retryButton, minimal && styles.minimalRetryButton]}
        onPress={onRetry}
      >
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
  minimalContainer: {
    flex: 0,
    padding: normalize(16),
    backgroundColor: "#FFF3F3",
    marginHorizontal: normalize(16),
    marginVertical: normalize(8),
    borderRadius: 8,
  },
  errorText: {
    color: "red",
    marginBottom: normalize(16),
    textAlign: "center",
  },
  minimalErrorText: {
    marginBottom: normalize(8),
    fontSize: normalize(14),
  },
  retryButton: {
    backgroundColor: "#007AFF",
    padding: normalize(12),
    borderRadius: 8,
  },
  minimalRetryButton: {
    padding: normalize(8),
  },
  retryButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ErrorView;
