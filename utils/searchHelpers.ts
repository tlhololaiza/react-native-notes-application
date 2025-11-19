import { Note } from '../types/note.types';

export const searchNotes = (notes: Note[], query: string): Note[] => {
  if (!query.trim()) {
    return notes;
  }
  
  const lowercaseQuery = query.toLowerCase();
  
  return notes.filter(note => {
    const titleMatch = note.title?.toLowerCase().includes(lowercaseQuery);
    const contentMatch = note.content.toLowerCase().includes(lowercaseQuery);
    const categoryMatch = note.category.toLowerCase().includes(lowercaseQuery);
    
    return titleMatch || contentMatch || categoryMatch;
  });
};

export const filterNotesByCategory = (notes: Note[], category: string): Note[] => {
  if (category === 'All') {
    return notes;
  }
  
  return notes.filter(note => note.category === category);
};