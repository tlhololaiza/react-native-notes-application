import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CATEGORIES } from '../../constants/Categories';
import { Colors } from '../../constants/Colors';
import { Category, Note } from '../../types/note.types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface NoteFormProps {
  visible: boolean;
  onClose: () => void;
  onSave: (note: { title?: string; content: string; category: Category }) => void;
  editingNote?: Note | null;
  defaultCategory?: Category;
}

export const NoteForm = ({ visible, onClose, onSave, editingNote, defaultCategory = 'Personal' }: NoteFormProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<Category>(defaultCategory);
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title || '');
      setContent(editingNote.content);
      setCategory(editingNote.category);
    } else {
      setTitle('');
      setContent('');
      setCategory(defaultCategory);
    }
    setErrors({});
  }, [editingNote, visible, defaultCategory]);

  const validate = () => {
    const newErrors: { title?: string; content?: string } = {};

    if (!content.trim()) {
      newErrors.content = 'Note content is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    onSave({
      title: title.trim() || undefined,
      content: content.trim(),
      category,
    });

    handleClose();
  };

  const handleClose = () => {
    setTitle('');
    setContent('');
    setCategory(defaultCategory);
    setErrors({});
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalOverlay}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingNote ? 'Edit Note' : 'New Note'}
            </Text>

            <Input
              label="Title (Optional)"
              value={title}
              onChangeText={setTitle}
              placeholder="Enter note title"
              error={errors.title}
            />

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Category</Text>
              <View style={styles.categoryPicker}>
                {CATEGORIES.map(cat => (
                  <CategoryButton
                    key={cat}
                    category={cat}
                    selected={category === cat}
                    onPress={() => setCategory(cat)}
                  />
                ))}
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Note Content *</Text>
              <TextInput
                style={[styles.textArea, errors.content && styles.textAreaError]}
                value={content}
                onChangeText={setContent}
                placeholder="Write your note here..."
                multiline
                numberOfLines={8}
                textAlignVertical="top"
                placeholderTextColor={Colors.textLight}
              />
              {errors.content && (
                <Text style={styles.errorText}>{errors.content}</Text>
              )}
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="Cancel"
                onPress={handleClose}
                variant="secondary"
                style={styles.button}
              />
              <Button
                title="Save"
                onPress={handleSave}
                style={styles.button}
              />
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

interface CategoryButtonProps {
  category: Category;
  selected: boolean;
  onPress: () => void;
}

const CategoryButton = ({ category, selected, onPress }: CategoryButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.categoryButton,
      selected && styles.categoryButtonSelected,
    ]}
  >
    <Text style={[
      styles.categoryButtonText,
      selected && styles.categoryButtonTextSelected,
    ]}>
      {category}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: Colors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
  },
  modalContent: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: Colors.text,
  },
  textArea: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: Colors.inputBackground,
    color: Colors.text,
    minHeight: 120,
  },
  textAreaError: {
    borderColor: Colors.danger,
  },
  errorText: {
    color: Colors.danger,
    fontSize: 12,
    marginTop: 4,
  },
  categoryPicker: {
    flexDirection: 'row',
    gap: 8,
  },
  categoryButton: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: Colors.background,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  categoryButtonSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  categoryButtonTextSelected: {
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  button: {
    flex: 1,
  },
});