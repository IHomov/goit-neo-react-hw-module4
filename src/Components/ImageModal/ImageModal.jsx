
import ReactModal from 'react-modal';
import styles from './ImageModal.module.css';

ReactModal.setAppElement('#root');

const ImageModal = ({ isOpen, onRequestClose, image }) => {
  if (!image) return null;

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modalContent}
      overlayClassName={styles.modalOverlay}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
    >
      <img
        src={image.urls.regular}
        alt={image.alt_description || 'Image'}
        className={styles.modalImage}
      />
      <button className={styles.closeButton} onClick={onRequestClose}>×</button>
      <div className={styles.imageInfo}>
        <p>Автор: {image.user.name}</p>
        {image.description && <p>Опис: {image.description}</p>}
        <p>Лайків: {image.likes}</p>
      </div>
    </ReactModal>
  );
};

export default ImageModal;