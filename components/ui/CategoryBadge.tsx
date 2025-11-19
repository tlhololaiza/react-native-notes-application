import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CATEGORY_COLORS } from '../../constants/Categories';
import { Category } from '../../types/note.types';

interface CategoryBadgeProps {
  category: Category;
}

export const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const backgroundColor = CATEGORY_COLORS[category];

  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={styles.text}>{category}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  text: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});