import axios from 'axios';
import type { NewNote, Note } from '../types/note';
axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`;

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (query: string, page: number): Promise<FetchNotesResponse> => {
  const res = await axios.get<FetchNotesResponse>('/notes', {
    params: {
      ...(query !== '' && { search: query }),
      page,
      perPage: 10,
    },
  });
  return res.data;
};

export const createNote = async (noteData: NewNote): Promise<Note> => {
  const res = await axios.post<Note>('/notes', noteData);
  return res.data;
};

export const deleteNote = async (noteId: number): Promise<Note> => {
  const res = await axios.delete<Note>(`/notes/${noteId}`);
  return res.data;
};
