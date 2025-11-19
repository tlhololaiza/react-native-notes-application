import { STORAGE_KEYS } from '../constants/Config';
import { Note } from '../types/note.types';
import { storageService } from './storageService';

export const notesService = {
  getStorageKey(userId: string): string {
    return `${STORAGE_KEYS.NOTES_PREFIX}${userId}`;
  },

  async getAllNotes(userId: string): Promise<Note[]> {
    const notes = await storageService.getItem<Note[]>(this.getStorageKey(userId));
    return notes || [];
  },

  async addNote(userId: string, noteData: Omit<Note, 'id' | 'dateAdded' | 'dateEdited' | 'userId'>): Promise<Note> {
    if (!noteData.content.trim()) {
      throw new Error('Note content is required');
    }

    const notes = await this.getAllNotes(userId);
    
    const newNote: Note = {
      id: Date.now().toString(),
      ...noteData,
      userId,
      dateAdded: new Date().toISOString(),
      dateEdited: null,
    };

    await storageService.setItem(this.getStorageKey(userId), [...notes, newNote]);
    return newNote;
  },

  async updateNote(userId: string, noteId: string, updates: Partial<Note>): Promise<Note> {
    const notes = await this.getAllNotes(userId);
    const noteIndex = notes.findIndex(n => n.id === noteId);

    if (noteIndex === -1) {
      throw new Error('Note not found');
    }

    if (updates.content !== undefined && !updates.content.trim()) {
      throw new Error('Note content cannot be empty');
    }

    const updatedNote = {
      ...notes[noteIndex],
      ...updates,
      dateEdited: new Date().toISOString(),
    };

    notes[noteIndex] = updatedNote;
    await storageService.setItem(this.getStorageKey(userId), notes);

    return updatedNote;
  },

  async deleteNote(userId: string, noteId: string): Promise<void> {
    const notes = await this.getAllNotes(userId);
    const filteredNotes = notes.filter(n => n.id !== noteId);
    
    if (filteredNotes.length === notes.length) {
      throw new Error('Note not found');
    }

    await storageService.setItem(this.getStorageKey(userId), filteredNotes);
  },

  async deleteAllNotes(userId: string): Promise<void> {
    await storageService.setItem(this.getStorageKey(userId), []);
  }
};