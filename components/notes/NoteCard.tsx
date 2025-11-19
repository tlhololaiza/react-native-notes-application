import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Note } from '../../types/note.types';
import { formatDateShort } from '../../utils/dateHelpers';
import { Card } from '../ui/Card';
import { CategoryBadge } from '../ui/CategoryBadge';

interface NoteCardProps {
  note: Note;
  onPress: () => void;
  onDelete: () => void;
}

export const NoteCard = ({ note, onPress, onDelete }: NoteCardProps) => {
  const handleDelete = () => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          onPress: onDelete,
          style: 'destructive' 
        }
      ]
    );
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card>
        <View style={styles.header}>
          <CategoryBadge category={note.category} />
          <TouchableOpacity onPress={handleDelete} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Text style={styles.deleteButton}>✕</Text>
          </TouchableOpacity>
        </View>

        {note.title && <Text style={styles.title}>{note.title}</Text>}
        
        <Text style={styles.content} numberOfLines={3}>
          {note.content}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.date}>
            {formatDateShort(note.dateAdded)}
          </Text>
          {note.dateEdited && (
            <Text style={styles.edited}>Edited</Text>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  deleteButton: {
    fontSize: 20,
    color: Colors.danger,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    color: Colors.textLight,
  },
  edited: {
    fontSize: 12,
    color: Colors.textLight,
    fontStyle: 'italic',
  },
});