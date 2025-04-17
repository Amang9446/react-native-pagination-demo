import React, { useCallback } from "react";
import { FlatList, StyleSheet, RefreshControl } from "react-native";
import LoadingSpinner from "./LoadingSpinner";
import { normalize } from "../../utils/normalize";

const InfiniteList = ({
  data,
  renderItem,
  keyExtractor,
  onEndReached,
  isLoading,
  ListEmptyComponent,
  contentContainerStyle,
  onRefresh,
  refreshing = false,
  ...props
}) => {
  const ListFooterComponent = useCallback(() => {
    if (isLoading && data.length > 0) {
      return <LoadingSpinner style={styles.footerLoader} />;
    }
    return null;
  }, [isLoading, data.length]);

  const refreshControl = useCallback(
    () =>
      onRefresh ? (
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      ) : undefined,
    [onRefresh, refreshing]
  );
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={ListFooterComponent}
      refreshControl={refreshControl()}
      contentContainerStyle={[
        styles.listContainer,
        contentContainerStyle,
        data.length === 0 && styles.emptyListContainer,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: normalize(16),
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footerLoader: {
    marginVertical: normalize(20),
  },
});

export default InfiniteList;
