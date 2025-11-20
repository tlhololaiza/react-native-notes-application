export type Category = 'Work' | 'Study' | 'Personal';

export interface Note {
  id: string;
  title?: string;
  content: string;
  category: Category;
  dateAdded: string;
  dateEdited: string | null;
  userId: string;
}

export interface NotesContextType {
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'dateAdded' | 'dateEdited' | 'userId'>) => Promise<void>;
  updateNote: (id: string, updates: Partial<Note>) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  searchNotes: (query: string) => Note[];
  sortNotes: (order: 'asc' | 'desc') => Note[];
}