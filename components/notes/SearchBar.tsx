import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  sortOrder: 'asc' | 'desc';
  onToggleSort: () => void;
}

export const SearchBar = ({ value, onChangeText, sortOrder, onToggleSort }: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search notes..."
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={Colors.textLight}
      />
      <TouchableOpacity onPress={onToggleSort} style={styles.sortButton}>
        <Text style={styles.sortIcon}>{sortOrder === 'asc' ? '↑' : '↓'}</Text>
        <Text style={styles.sortText}>Date</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    gap: 8,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    backgroundColor: Colors.background,
    color: Colors.text,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    backgroundColor: Colors.background,
    borderRadius: 12,
  },
  sortIcon: {
    fontSize: 18,
    color: Colors.primary,
  },
  sortText: {
    fontSize: 12,
    color: Colors.text,
  },
});