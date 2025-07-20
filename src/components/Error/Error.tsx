import { createPortal } from 'react-dom';
import css from './Error.module.css';

export default function Error() {
  return createPortal(<div className={css.container}>There was an Error, try again</div>, document.getElementById('modal-root') as HTMLDivElement);
}
