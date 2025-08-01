import css from './SearchBox.module.css';
import { type DebouncedState } from 'use-debounce';

interface SearchBoxProps {
  onChange: DebouncedState<(newSearchQuery: string) => void>;
  value: string;
}

export default function SearchBox({ onChange, value }: SearchBoxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return <input className={css.input} type="text" placeholder="Search notes" defaultValue={value} onChange={handleChange} />;
}
