import { createPortal } from 'react-dom';
import css from './Error.module.css';
import { useEffect, useState } from 'react';

interface ErrorProps {
  error: Error | string;
}

export default function Error({ error }: ErrorProps) {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFade(true), 2500);
    return () => clearTimeout(fadeTimer);
  }, []);

  const message = typeof error === 'string' ? error : error.message;
  return createPortal(
    <div className={`${css.container} ${fade ? css.fadeOut : ''}`}>
      <strong>Error:</strong> {message || 'Something went wrong'}
    </div>,
    document.getElementById('modal-root') as HTMLDivElement
  );
}
