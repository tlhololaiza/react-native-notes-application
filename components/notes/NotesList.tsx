import { Feather } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";
import { Note } from "../../types/note.types";
import { NoteCard } from "./NoteCard";

interface NotesListProps {
  notes: Note[];
  onNotePress: (note: Note) => void;
  onNoteDelete: (noteId: string) => void;
}

export const NotesList = ({
  notes,
  onNotePress,
  onNoteDelete,
}: NotesListProps) => {
  if (notes.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Feather
          name="file-text"
          size={64}
          color={Colors.textLight}
          style={styles.emptyIcon}
        />
        <Text style={styles.emptyTitle}>No notes yet</Text>
        <Text style={styles.emptySubtitle}>
          Create your first note to get started
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onPress={() => onNotePress(note)}
          onDelete={() => onNoteDelete(note.id)}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
  },
});
