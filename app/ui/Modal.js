import styles from './Modal.module.css';

export default function Modal({children, onClose}) {
  return (
    <div
      className={styles.modalBackground}
      onClick={e => {e.stopPropagation(); onClose();}}
    >
      <div
        className={styles.modalBody}
        onClick={e => e.stopPropagation()}
      >
        <button
          className={styles.closeButton}
          onClick={e => {e.stopPropagation(); onClose();}}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        { children }
      </div>
    </div>
  );
};