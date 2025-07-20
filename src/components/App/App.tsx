import { keepPreviousData, useQuery } from '@tanstack/react-query';
import NoteList from '../NoteList/NoteList';
import css from './App.module.css';
import { fetchNotes } from '../../services/noteService';
import { useState } from 'react';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import SearchBox from '../SearchBox/SearchBox';
import { useDebouncedCallback } from 'use-debounce';
import Loader from '../Loader/Loader';
import Error from '../Error/Error';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', query, currentPage],
    queryFn: () => fetchNotes(query, currentPage),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes;
  const totalPages = data?.totalPages;

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = useDebouncedCallback(setQuery, 300);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={query} onChange={handleSearch} />
        {totalPages && totalPages > 1 && <Pagination totalPages={totalPages} page={currentPage} setCurrentPage={setCurrentPage} />}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {notes && !isLoading && <NoteList notes={notes} />}
      {isLoading && <Loader />}
      {isError && <Error />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
