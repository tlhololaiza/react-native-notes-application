import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { notesService } from '../services/notesService';
import { Note, NotesContextType } from '../types/note.types';
import { sortNotesByDate } from '../utils/dateHelpers';
import { searchNotes as searchNotesHelper } from '../utils/searchHelpers';

export const NotesContext = createContext<NotesContextType | undefined>(undefined);

interface NotesProviderProps {
  children: ReactNode;
}

export const NotesProvider = ({ children }: NotesProviderProps) => {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    if (user) {
      loadNotes();
    } else {
      setNotes([]);
    }
  }, [user]);

  const loadNotes = async () => {
    if (!user) return;
    
    try {
      const userNotes = await notesService.getAllNotes(user.id);
      setNotes(userNotes);
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const addNote = async (noteData: Omit<Note, 'id' | 'dateAdded' | 'dateEdited' | 'userId'>) => {
    if (!user) {
      throw new Error('No user logged in');
    }

    try {
      const newNote = await notesService.addNote(user.id, noteData);
      setNotes(prev => [...prev, newNote]);
    } catch (error) {
      throw error;
    }
  };

  const updateNote = async (noteId: string, updates: Partial<Note>) => {
    if (!user) {
      throw new Error('No user logged in');
    }

    try {
      const updatedNote = await notesService.updateNote(user.id, noteId, updates);
      setNotes(prev => prev.map(n => n.id === noteId ? updatedNote : n));
    } catch (error) {
      throw error;
    }
  };

  const deleteNote = async (noteId: string) => {
    if (!user) {
      throw new Error('No user logged in');
    }

    try {
      await notesService.deleteNote(user.id, noteId);
      setNotes(prev => prev.filter(n => n.id !== noteId));
    } catch (error) {
      throw error;
    }
  };

  const searchNotes = (query: string): Note[] => {
    return searchNotesHelper(notes, query);
  };

  const sortNotes = (order: 'asc' | 'desc'): Note[] => {
    return sortNotesByDate(notes, order);
  };

  return (
    <NotesContext.Provider 
      value={{ 
        notes, 
        addNote, 
        updateNote, 
        deleteNote, 
        searchNotes, 
        sortNotes 
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};