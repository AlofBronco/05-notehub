import { keepPreviousData, useQuery } from '@tanstack/react-query';
import NoteList from '../NoteList/NoteList';
import css from './App.module.css';
import { fetchNotes } from '../../services/noteService';
import { useEffect, useState } from 'react';
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
  const [mutationError, setMutationError] = useState('');

  const { data, isLoading, isError, error } = useQuery({
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

  const handleSearch = useDebouncedCallback((value: string) => {
    setQuery(value);
    setCurrentPage(1);
  }, 300);

  const handleError = (error: string) => {
    setMutationError(error);
  };

  useEffect(() => {
    if (mutationError) {
      const timer = setTimeout(() => setMutationError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [mutationError]);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={query} onChange={handleSearch} />
        {totalPages && totalPages > 1 && <Pagination totalPages={totalPages} page={currentPage} onPageChange={setCurrentPage} />}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {notes && !isLoading && <NoteList notes={notes} onError={handleError} />}
      {isLoading && <Loader />}
      {isError && <Error error={error} />}
      {mutationError && <Error error={mutationError} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} onError={handleError} />
        </Modal>
      )}
    </div>
  );
}
