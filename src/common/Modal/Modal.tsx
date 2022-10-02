import React, { useRef } from "react";
import useOutsideClick from "../../utils/hooks/useOutsideClick";
import './Modal.scss';

interface ModalProps {
  open?: boolean
  title?: string
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ open = false, title, onClose, children }) => {
  const modalRef = useRef(null);
  useOutsideClick(modalRef, () => onClose());

  if (!open) return null;

  return (
    <div className="overlay">
      <div ref={modalRef} className="modal-content">
        {title && (
          <div className="modal-header">
            <h2>{title}</h2>
          </div>
        )}
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
