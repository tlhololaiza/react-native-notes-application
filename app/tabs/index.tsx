import { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NoteForm } from '../../components/notes/NoteForm';
import { NotesList } from '../../components/notes/NotesList';
import { SearchBar } from '../../components/notes/SearchBar';
import { Colors } from '../../constants/Colors';
import { useNotes } from '../../hooks/useNotes';
import { Note } from '../../types/note.types';
import { sortNotesByDate } from '../../utils/dateHelpers';
import { searchNotes } from '../../utils/searchHelpers';

export default function AllNotesScreen() {
  const { notes, addNote, updateNote, deleteNote } = useNotes();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const filteredNotes = useMemo(() => {
    let result = notes;
    result = searchNotes(result, searchQuery);
    result = sortNotesByDate(result, sortOrder);
    return result;
  }, [notes, searchQuery, sortOrder]);

  const handleSaveNote = async (noteData: any) => {
    try {
      if (editingNote) {
        await updateNote(editingNote.id, noteData);
      } else {
        await addNote(noteData);
      }
      setModalVisible(false);
      setEditingNote(null);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setModalVisible(true);
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await deleteNote(noteId);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        sortOrder={sortOrder}
        onToggleSort={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
      />

      <NotesList
        notes={filteredNotes}
        onNotePress={handleEditNote}
        onNoteDelete={handleDeleteNote}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          setEditingNote(null);
          setModalVisible(true);
        }}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <NoteForm
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setEditingNote(null);
        }}
        onSave={handleSaveNote}
        editingNote={editingNote}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '300',
  },
});