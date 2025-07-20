import { createPortal } from 'react-dom';
import css from './Loader.module.css';

export default function Loader() {
  return createPortal(<div className={css.container}>Loading...</div>, document.getElementById('modal-root') as HTMLDivElement);
}
