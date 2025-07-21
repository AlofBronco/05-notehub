import { createPortal } from 'react-dom';
import css from './Error.module.css';

interface ErrorProps {
  error: Error | string;
}

export default function Error({ error }: ErrorProps) {
  const message = typeof error === 'string' ? error : error.message;
  return createPortal(
    <div className={css.container}>
      <strong>Error:</strong> {message || 'Something went wrong'}
    </div>,
    document.getElementById('modal-root') as HTMLDivElement
  );
}
