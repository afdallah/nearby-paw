import React from 'react';
import { GrFormClose } from 'react-icons/gr';
import classNames from 'classnames';

function Modal({ header, active, renderBody, onClose }) {
  const modalClass = classNames({
    modal: true,
    'modal--hidden': !active,
  });

  return (
    <div className={modalClass}>
      <div className="modal__overlay" onClick={onClose} />

      <div className="modal__inner">
        <div className="modal__header">
          <h2>{header}</h2>

          <div className="modal__close" onClick={onClose}>
            <GrFormClose />
          </div>
        </div>

        <div className="modal__body">{renderBody()}</div>
      </div>
    </div>
  );
}

export default Modal;
